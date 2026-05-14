const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Analysis = require('../models/Analysis');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, { apiVersion: 'v1' });

const executeWithRetry = async (task, maxRetries = 3, initialDelay = 1500) => {
  let lastError;
  let delay = initialDelay;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      const is503 = error.status === 503 || (error.message && error.message.includes('Unavailable'));
      
      if (is503 && i < maxRetries - 1) {
        const jitter = Math.random() * 200;
        await new Promise(resolve => setTimeout(resolve, delay + jitter));
        delay *= 2;
        continue;
      }
      throw error;
    }
  }
  throw lastError;
};

router.post('/process', upload.fields([
  { name: 'sow', maxCount: 1 },
  { name: 'vendors', maxCount: 3 }
]), async (req, res) => {
  try {
    const { projectName } = req.body;

    if (!req.files || !req.files['sow'] || !req.files['vendors']) {
      return res.status(400).json({ error: 'Please upload both SOW and Vendor files.' });
    }

    const sowFile = req.files['sow'][0];
    const vendorFiles = req.files['vendors'];

    const sowData = await pdf(sowFile.buffer);
    const sowText = sowData.text;

    const vendorResults = [];

    for (const file of vendorFiles) {
      const vendorData = await pdf(file.buffer);
      const vendorText = vendorData.text;
      const vendorLabel = req.body[`vendorName_${file.originalname}`] || file.originalname;

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });

      const prompt = `
        You are a Vendor Compliance Specialist. Compare the following Vendor Completion Report against the Master Scope of Work (SOW).
        
        MASTER SOW TEXT:
        ${sowText}
        
        VENDOR REPORT TEXT:
        ${vendorText}
        
        Analyze the vendor's compliance. Provide:
        1. A completion score out of 100.
        2. A score reasoning summary.
        3. A list of positives (points where they met or exceeded requirements).
        4. A list of negatives (missing requirements or gaps).
        
        Return the result in this JSON format:
        {
          "completionScore": number,
          "scoreReasoning": "string",
          "positives": [{"point": "string", "reason": "string"}],
          "negatives": [{"point": "string", "reason": "string"}]
        }
      `;

      const result = await executeWithRetry(() => model.generateContent(prompt));
      const response = await result.response;
      const analysisData = JSON.parse(response.text());

      vendorResults.push({
        vendorName: vendorLabel,
        ...analysisData
      });
    }

    const newAnalysis = new Analysis({
      projectName,
      sowFileName: sowFile.originalname,
      vendorAnalyses: vendorResults
    });

    await newAnalysis.save();
    res.json(newAnalysis);

  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to process documents' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const history = await Analysis.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
