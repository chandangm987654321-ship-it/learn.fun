import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 1. Multi-turn Chat Endpoint
// Models: 'gemini-3.1-pro-preview' for complex / high thinking tasks,
// 'gemini-3.5-flash' for general tasks,
// 'gemini-3.1-flash-lite' for fast tasks
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemInstruction, modelTier = 'general', enableHighThinking = false } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    let selectedModel = 'gemini-3.5-flash';
    if (enableHighThinking || modelTier === 'pro') {
      selectedModel = 'gemini-3.1-pro-preview';
    } else if (modelTier === 'fast') {
      selectedModel = 'gemini-3.1-flash-lite';
    }

    const schoolContext = `
Campus & School Context for Apex Academy:
- Student: Alex Explorer (Class 9-A STEM Honors, Roll #14, House: Newton Phoenix, Attendance: 96.8%).
- Upcoming Exams:
  * Physics Midterm: October 12, 2026 (09:00 AM, Exam Hall 302, Kinematics & Simple Harmonic Motion).
  * Maths Midterm: October 15, 2026 (09:00 AM, Main Auditorium, Quadratics & Trigonometry).
  * Chemistry Midterm: October 18, 2026 (09:00 AM, Science Lab 2, Chemical Bonding & Octet Rules).
- Pending Homework:
  * Physics: Pendulum Oscillation Harmonic Lab Report (Due Tomorrow, 5:00 PM, Dr. Reed).
  * Maths: Quadratic Formula & Parabolic Tangents (Due Oct 5, 2026, Prof. Hayes).
- Live School Events:
  * Annual STEM & Robotics Exhibition 2026: October 30, 2026 (Campus STEM Pavilion).
  * Inter-House Sports Day Championship: November 6, 2026 (Olympic Athletic Track).
  * Annual Arts & Cultural Gala "Aurora 2026": November 20, 2026.
  * Parent-Teacher Conference (PTM): October 24, 2026 (01:00 PM - 05:00 PM).
- Latest Announcement: National Autonomous Rover Championship 1st Place Gold won by the Apex Robotics Team!
`;

    const config: any = {
      systemInstruction:
        (systemInstruction ? `${systemInstruction}\n\n${schoolContext}` : null) ||
        `You are OmniTutor & Apex AI School Assistant. You are an elite, inspiring STEM educator and the official smart campus assistant for Apex Academy of STEM.
You can answer both academic STEM lessons (explaining physics, chemistry, biology, math step-by-step with vivid analogies) AND smart campus queries (exam schedules, pending homework, Sports Day, Annual Day, PTM, and announcements).
${schoolContext}
Format your responses with clean Markdown, bullet points, and encouraging warmth.`,
    };

    if (enableHighThinking && selectedModel === 'gemini-3.1-pro-preview') {
      config.thinkingConfig = {
        thinkingLevel: ThinkingLevel.HIGH,
      };
      // Note: Do not set maxOutputTokens when using ThinkingLevel.HIGH
    }

    // Format contents for Gemini API: [{ role: 'user'|'model', parts: [{ text: '...' }] }]
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config,
    });

    const replyText = response.text || '';
    res.json({
      reply: replyText,
      modelUsed: selectedModel,
      thinkingEnabled: !!enableHighThinking,
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      error: error?.message || 'Failed to process chat request',
    });
  }
});

// 2. Photo / Diagram Analysis Endpoint (Question Solver)
// Requirement: "Allow app users to upload a photo and then analyze it using Gemini. You MUST add image understanding to the app using model gemini-3.1-pro-preview"
// Requirement: "Student takes a picture of a question -> platform explains the solution step-by-step."
// High thinking option supported.
app.post('/api/analyze-image', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', userPrompt = '', enableHighThinking = true } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 is required' });
    }

    // Strip data URL prefix if present
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');

    const selectedModel = 'gemini-3.1-pro-preview';
    const config: any = {
      systemInstruction: `You are an expert STEM professor and master problem solver. 
Analyze the image uploaded by the student (which could be a handwritten math problem, physics diagram, chemistry formula, textbook excerpt, biology diagram, or homework prompt).
You MUST provide a structured, ultra-clear explanation that breaks down:
1. "Transcribed Problem / Diagram Identified": Exactly what question or diagram is shown.
2. "Core Concepts & Laws": The foundational scientific or mathematical principles at work.
3. "Step-by-Step Solution": Detailed, numbered calculation or logical derivation with rationale for every single step.
4. "Key Takeaway & Common Pitfalls": What students often get wrong and how to avoid traps.
5. "Pro Practice Challenge": A similar conceptual question to test if they truly understood.`,
    };

    if (enableHighThinking) {
      config.thinkingConfig = {
        thinkingLevel: ThinkingLevel.HIGH,
      };
      // Do not set maxOutputTokens
    }

    const promptText = userPrompt.trim()
      ? `Student's specific question/context: "${userPrompt.trim()}". Please solve and explain the image step-by-step thoroughly.`
      : 'Please analyze this question or diagram and provide a complete, step-by-step solution and explanation.';

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          {
            text: promptText,
          },
        ],
      },
      config,
    });

    res.json({
      explanation: response.text || '',
      modelUsed: selectedModel,
      thinkingEnabled: !!enableHighThinking,
    });
  } catch (error: any) {
    console.error('Error in /api/analyze-image:', error);
    res.status(500).json({
      error: error?.message || 'Failed to analyze image',
    });
  }
});

// 3. Step-by-Step Lesson Explainer Endpoint
app.post('/api/explain-lesson', async (req, res) => {
  try {
    const { topic, subject, difficulty = 'High School', customFocus = '', enableHighThinking = true } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const selectedModel = enableHighThinking ? 'gemini-3.1-pro-preview' : 'gemini-3.5-flash';
    const config: any = {
      systemInstruction: `You are an award-winning STEM educator known for turning complex, intimidating ideas into vivid, intuitive, and unforgettable insights.
Create a rich, structured, highly educational interactive lesson on the given topic.`,
    };

    if (enableHighThinking && selectedModel === 'gemini-3.1-pro-preview') {
      config.thinkingConfig = {
        thinkingLevel: ThinkingLevel.HIGH,
      };
    }

    const prompt = `Create a complete interactive lesson explanation for:
Subject: ${subject || 'Science'}
Topic: ${topic}
Target Audience / Level: ${difficulty}
${customFocus ? `Special Focus: ${customFocus}` : ''}

Include the following sections with markdown formatting:
# 🎯 Lesson Title & Essential Question
## 💡 The Real-World Intuition (Analogy that makes it click immediately)
## 🔬 Deep Dive: Core Mechanics & Mathematical/Scientific Laws
Break this into digestible subsections with formulas, diagrams described in ASCII or clear visual layouts.
## 🧪 Virtual Experiment Idea
A thought experiment or simulation parameter student can test.
## ⚠️ The #1 Misconception
What 90% of students misunderstand and the truth.
## 🚀 Quick Knowledge Check
3 interactive question prompts for self-testing.`;

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: prompt,
      config,
    });

    res.json({
      lessonContent: response.text || '',
      modelUsed: selectedModel,
    });
  } catch (error: any) {
    console.error('Error in /api/explain-lesson:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate lesson explanation',
    });
  }
});

// 4. Progressive Hint System Endpoint
// Requirement:
// "💡 Hint System: Instead of immediately showing the answer:
// Need help?
// -> Hint 1
// -> Hint 2
// -> Explanation
// -> Answer"
app.post('/api/get-hint', async (req, res) => {
  try {
    const { question, step, previousHints = [] } = req.body;
    // step: 1 = "Hint 1 (Nudge)", 2 = "Hint 2 (Formula/Strategy)", 3 = "Explanation (Guided Walkthrough)", 4 = "Answer (Full Final Solution)"

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const stepNames = {
      1: 'Hint 1 (Gentle Nudge - point the student in the right direction without giving away formulas or solutions)',
      2: 'Hint 2 (Formula & Strategy - identify key equations, variables, or conceptual steps needed)',
      3: 'Detailed Guided Explanation (Walk through intermediate steps of the problem without writing the final numerical answer)',
      4: 'Final Answer & Complete Verification (Show the exact final answer and a concise summary to check work)',
    };

    const targetStep = Number(step) || 1;
    const targetDescription = stepNames[targetStep as keyof typeof stepNames] || stepNames[1];

    const prompt = `Problem / Question:
"${question}"

The student is currently at step: ${targetStep} of 4: "${targetDescription}".
Previous hints received so far:
${previousHints.map((h: string, i: number) => `Step ${i + 1}: ${h}`).join('\n') || 'None'}

Generate ONLY the content for ${targetDescription}. Keep it focused, encouraging, and pedagogically precise. Do NOT reveal subsequent steps early.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an encouraging Socratic tutor. You reveal hints progressively to foster authentic learning without spoiling answers too soon.',
      },
    });

    res.json({
      hint: response.text || '',
      step: targetStep,
    });
  } catch (error: any) {
    console.error('Error in /api/get-hint:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate progressive hint',
    });
  }
});

// 5. Quiz Generator with Hint Data Endpoint
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { subject, topic, count = 3 } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Generate ${count} engaging multiple-choice STEM quiz questions on the subject "${subject}" and topic "${topic}".
Each question must include 4 options, the correct answer index (0-3), a progressive 4-tier hint progression (Hint 1 nudge, Hint 2 formula/strategy, Guided Explanation, and Full Final Answer), and an explanation.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  hint1: { type: Type.STRING, description: 'Gentle conceptual nudge' },
                  hint2: { type: Type.STRING, description: 'Key formula or strategy' },
                  hint3: { type: Type.STRING, description: 'Guided walkthrough explanation' },
                  hint4: { type: Type.STRING, description: 'Full answer and why it is correct' },
                },
                required: ['id', 'question', 'options', 'correctIndex', 'explanation', 'hint1', 'hint2', 'hint3', 'hint4'],
              },
            },
          },
          required: ['questions'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{"questions": []}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/generate-quiz:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate quiz',
    });
  }
});

// 6. Virtual Lab Simulation AI Assistant
app.post('/api/lab-explain', async (req, res) => {
  try {
    const { labType, parameters, stateDescription } = req.body;

    const prompt = `Lab simulation type: ${labType}
Current user parameters: ${JSON.stringify(parameters, null, 2)}
Simulation state: ${stateDescription}

Explain to the student:
1. Exactly what physical/chemical/biological/mathematical phenomenon is happening at these settings.
2. The relevant governing equation or principle (e.g. T = 2π√(L/g) for pendulum, covalent bonding rules for chemistry, inflection points/derivatives for math, gas exchange in alveoli for biology).
3. A fascinating real-world example where this exact condition occurs.
Keep it snappy, intuitive, and vivid!`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are the Virtual Lab Director. You make interactive science experiments come alive with clear physical intuition.',
      },
    });

    res.json({ explanation: response.text || '' });
  } catch (error: any) {
    console.error('Error in /api/lab-explain:', error);
    res.status(500).json({ error: error?.message || 'Failed to explain lab experiment' });
  }
});

// Production / Dev Vite integration
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
