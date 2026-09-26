import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize Google Gen AI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Centralized Language Metadata for Server
interface LanguageMeta {
  name: string;
  nativeName: string;
  aiLanguage: string;
  speechLanguage: string;
  geminiVoice: string;
}

const languageRegistry: Record<string, LanguageMeta> = {
  hi: {
    name: 'Hindi',
    nativeName: 'हिंदी',
    aiLanguage: 'Hindi (हिंदी)',
    speechLanguage: 'hi-IN',
    geminiVoice: 'Kore',
  },
  en: {
    name: 'English',
    nativeName: 'English',
    aiLanguage: 'English',
    speechLanguage: 'en-IN',
    geminiVoice: 'Puck',
  },
  gu: {
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    aiLanguage: 'Gujarati (ગુજરાતી)',
    speechLanguage: 'gu-IN',
    geminiVoice: 'Kore',
  },
  bn: {
    name: 'Bengali',
    nativeName: 'বাংলা',
    aiLanguage: 'Bengali (বাংলা)',
    speechLanguage: 'bn-IN',
    geminiVoice: 'Kore',
  },
  mr: {
    name: 'Marathi',
    nativeName: 'मराठी',
    aiLanguage: 'Marathi (मराठी)',
    speechLanguage: 'mr-IN',
    geminiVoice: 'Kore',
  },
  ta: {
    name: 'Tamil',
    nativeName: 'தமிழ்',
    aiLanguage: 'Tamil (தமிழ்)',
    speechLanguage: 'ta-IN',
    geminiVoice: 'Kore',
  },
  te: {
    name: 'Telugu',
    nativeName: 'తెలుగు',
    aiLanguage: 'Telugu (తెలుగు)',
    speechLanguage: 'te-IN',
    geminiVoice: 'Kore',
  },
  kn: {
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    aiLanguage: 'Kannada (ಕನ್ನಡ)',
    speechLanguage: 'kn-IN',
    geminiVoice: 'Kore',
  },
  ml: {
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    aiLanguage: 'Malayalam (മലയാളം)',
    speechLanguage: 'ml-IN',
    geminiVoice: 'Kore',
  },
  pa: {
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    aiLanguage: 'Punjabi (ਪੰਜਾਬੀ)',
    speechLanguage: 'pa-IN',
    geminiVoice: 'Kore',
  },
  or: {
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    aiLanguage: 'Odia (ଓଡ଼ିଆ)',
    speechLanguage: 'or-IN',
    geminiVoice: 'Kore',
  },
};

// API: Document Analysis using Gemini
app.post('/api/analyze-document', async (req, res) => {
  try {
    const { text, imageBase64, mimeType, language = 'hi', sampleType } = req.body;
    const langMeta = languageRegistry[language] || languageRegistry.hi;
    const targetLang = langMeta.aiLanguage;

    const systemPrompt = `You are NyayaSaathi, an empathetic, accessible AI companion for Indian citizens with limited digital and legal literacy.
Core Philosophy: "Start with the person's life, not the law."

The user needs to understand a legal or government document.
CRITICAL LANGUAGE RULE: Respond entirely in ${targetLang}. Do NOT mix English, Hindi, Gujarati, or any other languages unless a proper noun/title must remain.
Explain in very simple, warm, everyday ${targetLang}. Avoid legal jargon.
IMPORTANT: You are NOT an AI lawyer and must never give definitive legal advice or guarantee document authenticity.

Analyze the provided document and respond with STRICT JSON ONLY conforming to this schema:
{
  "whatIsThis": "Short, crystal clear explanation of what this document is in simple ${targetLang}",
  "issuingAuthority": "Name of the claimed issuing office/authority (e.g. Talati / Mamlatdar / Court) in ${targetLang}",
  "meaningSimple": "2-3 sentences explaining what this means for the citizen's life in very reassuring, simple ${targetLang}",
  "actionableSteps": ["Step 1 in ${targetLang}", "Step 2 in ${targetLang}"],
  "importantDates": [
    { "label": "Description of date in ${targetLang}", "date": "e.g. 15 October 2026", "isUrgent": true }
  ],
  "importantNumbers": [
    { "label": "e.g. Case / Notice Number in ${targetLang}", "value": "REV/2026/8492" }
  ],
  "whatToKeep": ["List of receipts, slips, or original papers the citizen must preserve carefully in ${targetLang}"],
  "safetyScreening": {
    "category": "consistent" | "unverified" | "inconsistent" | "warning_signs",
    "statusLabel": "Simple status badge label in ${targetLang}",
    "explanation": "Clear explanation in ${targetLang} why this rating was given. Never say 'This is guaranteed real' or 'This is fake'. Always suggest verifying at the official office.",
    "warningSignals": ["Specific observation 1 in ${targetLang}"],
    "officialVerificationChannel": "Name of local government office or helpline in ${targetLang}"
  }
}
Safety category guidelines:
- "consistent": Document follows typical official structure, normal deadlines, official office contact.
- "unverified": Missing official seal or incomplete header, but no urgent threats.
- "warning_signs": Demands immediate money/UPI payment, threatens immediate arrest/auction within 24h, unofficial Gmail/phone, requests OTP or private password.`;

    let contentParts: any[] = [];

    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');
      contentParts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: cleanBase64,
        },
      });
    }

    const promptText = text
      ? `Here is the text/description of the document:\n"""\n${text}\n"""\n\nAnalyze this document in simple ${targetLang}.`
      : `Analyze this uploaded document image in simple ${targetLang}.`;

    contentParts.push(promptText);

    if (apiKey) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contentParts,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const responseText = response.text || '{}';
      const parsed = JSON.parse(responseText);
      return res.json({ success: true, data: parsed });
    } else {
      return res.json({
        success: true,
        data: getFallbackAnalysis(language, sampleType),
      });
    }
  } catch (error: any) {
    console.error('Error analyzing document:', error);
    const lang = req.body.language || 'hi';
    return res.json({
      success: true,
      data: getFallbackAnalysis(lang, req.body.sampleType),
      fallbackUsed: true,
    });
  }
});

// API: Ask NyayaSaathi (Conversational Q&A / Voice assistant)
app.post('/api/ask-assistant', async (req, res) => {
  try {
    const { question, context, language = 'hi' } = req.body;
    const langMeta = languageRegistry[language] || languageRegistry.hi;
    const targetLang = langMeta.aiLanguage;

    const systemPrompt = `You are NyayaSaathi, a compassionate, gentle, and accessible voice assistant for rural and everyday Indian citizens.
The user is asking a question about their government document or legal situation.
CRITICAL LANGUAGE RULE: Language to answer: ${targetLang} ONLY. Do NOT mix English, Hindi, or any other language unless specifically asked.
Rules:
1. Speak in a respectful, calm, encouraging tone like a trusted village friend.
2. Keep the answer SHORT (2 to 4 simple sentences or clear bullet points), easy to listen to.
3. If the user asks what to do now, give 2 clear practical steps (e.g. check the date, take your ID, get a stamped receipt).
4. Always remind them: Keep original receipt safely, and NyayaSaathi is a guide, not a lawyer.`;

    if (apiKey) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          `Document Context:\n${JSON.stringify(context || {})}\n\nUser Question:\n"${question}"\n\nAnswer warmly and clearly in ${targetLang}:`,
        ],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.3,
        },
      });

      return res.json({ success: true, answer: response.text || '' });
    } else {
      return res.json({
        success: true,
        answer: getFallbackAnswer(question, language),
      });
    }
  } catch (error: any) {
    console.error('Error answering question:', error);
    const lang = req.body.language || 'hi';
    return res.json({
      success: true,
      answer: getFallbackAnswer(req.body.question, lang),
    });
  }
});

// API: Voice Status and Quality Information for All Languages
app.get('/api/voice-status', (req, res) => {
  const statusList = Object.entries(languageRegistry).map(([code, meta]) => {
    const isSupported = code !== 'or'; // Odia voice is in development
    const provider = isSupported
      ? `Native ${meta.name} Speech Engine (${meta.speechLanguage})`
      : `Text Fully Supported • Native Voice In Development`;

    const testSentences: Record<string, string> = {
      gu: 'નમસ્તે, હું ન્યાયસાથી છું. હું તમને તમારા સરકારી અને કાનૂની કામને સરળતાથી સમજવામાં મદદ કરીશ.',
      hi: 'नमस्ते, मैं न्यायसाथी हूँ। मैं आपके सरकारी और कानूनी कार्यों को आसानी से समझने में आपकी सहायता करूँगा।',
      en: 'Hello, I am NyayaSaathi. I will help you understand your government notices and legal procedures simply.',
      bn: 'নমস্কার, আমি ন্যায়সাথী। আমি আপনাকে আপনার সরকারি ও আইনি নথিপত্র সহজ বাংলায় বুঝতে সাহায্য করব।',
      mr: 'नमस्कार, मी न्यायसाथी आहे. मी आपल्या सरकारी आणि कायदेशीर कामांची माहिती सोप्या मराठीत समजावून सांगण्यास मदत करेन.',
      ta: 'வணக்கம், நான் நியாயசாதி. உங்கள் அரசு ஆவணங்கள் மற்றும் சட்ட நடைமுறைகளை எளிய தமிழில் புரிந்து கொள்ள நான் உதவுவேன்.',
      te: 'నమస్కారం, నేను న్యాయసాథిని. మీ ప్రభుత్వ పత్రాలు మరియు చట్టపరమైన పనులను సులభంగా అర్థం చేసుకోవడంలో నేను మీకు సహాయం చేస్తాను.',
      kn: 'ನಮಸ್ಕಾರ, ನಾನು ನ್ಯಾಯಸಾಥಿ. ನಿಮ್ಮ ಸರ್ಕಾರಿ ಮತ್ತು ಕಾನೂನು ದಾಖಲೆಗಳನ್ನು ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.',
      ml: 'നമസ്കാരം, ഞാൻ ന്യായസാഥിയാണ്. നിങ്ങളുടെ സർക്കാർ രേഖകളും നിയമപരമായ കാര്യങ്ങളും ലളിതമായ മലയാളത്തിൽ മനസ്സിലാക്കാൻ ഞാൻ സഹായിക്കും.',
      pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ ਨਿਆਇਸਾਥੀ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੇ ਸਰਕਾਰੀ ਅਤੇ ਕਾਨੂੰਨੀ ਕੰਮਾਂ ਨੂੰ ਸਰਲ ਪੰਜਾਬੀ ਵਿੱਚ ਸਮਝਣ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰਾਂਗਾ।',
      or: 'ନମସ୍କାର, ମୁଁ ନ୍ୟାୟସାଥୀ। ଆପଣଙ୍କ ସରକାରୀ ଏବଂ ଆଇନଗତ କାର୍ଯ୍ୟକୁ ସରଳ ଭାଷାରେ ବୁଝିବାରେ ମୁଁ ସାହାଯ୍ୟ କରିବି।',
    };

    return {
      code,
      name: meta.name,
      nativeName: meta.nativeName,
      speechLanguage: meta.speechLanguage,
      provider,
      isNativeVoiceSupported: isSupported,
      statusLabel: isSupported ? 'Fully Supported (Native Voice)' : 'Partially Supported (Text Only)',
      testSentence: testSentences[code] || 'નમસ્તે',
    };
  });

  res.json({ success: true, voices: statusList });
});

// API: Authentic Native-Speaker Speech Synthesis
app.post('/api/tts', async (req, res) => {
  try {
    const { text, language = 'hi', speed = 0.9 } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ success: false, error: 'Text is required for TTS' });
    }

    const cleanText = text
      .replace(/[*#_~`]/g, '')
      .replace(/[🟢🟡🟠🔴✓✗➕🚀🌱⚠️📁🔒👉📍📱👑•🔊💬🏛️📋👥🔔▶️]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      return res.status(400).json({ success: false, error: 'Empty text' });
    }

    const langMeta = languageRegistry[language] || languageRegistry.hi;

    // Supported languages with native Indian speech models
    const supportedNativeLangs = ['gu', 'hi', 'en', 'bn', 'mr', 'ta', 'te', 'kn', 'ml', 'pa'];

    // 1. Primary: High-fidelity Native Indian Speech Engine (Native Pronunciation)
    if (supportedNativeLangs.includes(language)) {
      try {
        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText.slice(0, 350))}&tl=${language}&client=tw-ob`;
        const ttsResponse = await fetch(ttsUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        });

        if (ttsResponse.ok) {
          const arrayBuffer = await ttsResponse.arrayBuffer();
          const base64Audio = Buffer.from(arrayBuffer).toString('base64');
          return res.json({
            success: true,
            base64Audio,
            mimeType: 'audio/mpeg',
            provider: `Native ${langMeta.name} Voice Engine`,
            language,
          });
        }
      } catch (err: any) {
        console.warn('Native TTS fetch failed, checking Gemini Voice Design:', err?.message);
      }
    }

    // 2. Secondary: Gemini 3.8 Flash TTS with Voice Design
    if (apiKey) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash-tts',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: cleanText.slice(0, 500),
                  speechMetadata: {
                    speaker: langMeta.nativeName,
                    style: `Authentic native ${langMeta.name} speaker from India, speaking warm natural conversational ${langMeta.name} with natural cadence and rhythm`,
                  },
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: langMeta.geminiVoice || 'Kore' },
              },
            },
          },
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];
        const base64Audio = part?.inlineData?.data;
        const mimeType = part?.inlineData?.mimeType || 'audio/wav';

        if (base64Audio) {
          return res.json({
            success: true,
            base64Audio,
            mimeType,
            provider: `Gemini Voice Design (${langMeta.name})`,
            language,
          });
        }
      } catch (geminiErr: any) {
        console.warn('Gemini TTS warning:', geminiErr?.message || geminiErr);
      }
    }

    // 3. Explicit Detection: DO NOT FALL BACK TO ENGLISH OR HINDI
    return res.json({
      success: false,
      voiceUnavailable: true,
      language,
      provider: 'None (Voice in Development)',
      message: `Native-speaker voice synthesis is currently in active development for ${langMeta.name}. Text explanation is fully available.`,
    });
  } catch (err: any) {
    console.error('Server TTS error:', err);
    return res.status(500).json({ success: false, error: err?.message });
  }
});

// Comprehensive Fallback Analysis for All 11 Supported Languages
function getFallbackAnalysis(language: string, sampleType?: string) {
  const isSuspicious = sampleType === 'suspicious';

  if (language === 'en') {
    if (isSuspicious) {
      return {
        whatIsThis: 'Suspicious Payment Demand Notice',
        issuingAuthority: 'Unverified Private UPI / Mobile Number',
        meaningSimple: 'This letter demands an urgent payment of ₹12,500 within 24 hours to a private UPI account. Government departments never ask for personal UPI transfers.',
        actionableSteps: [
          'Do NOT transfer any money to the personal UPI or bank account.',
          'Visit your local Tehsil or Panchayat office to verify this document.',
          'Report this to the national cyber helpline (1930) or local police.',
        ],
        importantDates: [{ label: 'Urgent payment demand', date: 'Within 24 Hours', isUrgent: true }],
        importantNumbers: [{ label: 'Suspicious UPI handle', value: 'revenue-dept-pay@okaxis' }],
        whatToKeep: ['Keep the original paper safely as physical evidence.'],
        safetyScreening: {
          category: 'warning_signs',
          statusLabel: 'Strong warning signs — verify with official authority',
          explanation: 'Contains urgent threats of auction and demands direct payment to a private UPI handle, which violates standard government procedure.',
          warningSignals: [
            'Immediate 24-hour threat of property auction',
            'Private mobile number instead of official office telephone',
            'Non-government UPI handle for revenue collection',
          ],
          officialVerificationChannel: 'Sub-Divisional Magistrate / Tehsil Revenue Office',
        },
      };
    }
    return {
      whatIsThis: 'Notice for Land Mutation / Inheritance Record (Form 135-D)',
      issuingAuthority: 'Office of Mamlatdar / Talati, Revenue Department',
      meaningSimple: 'This is not a penalty or fine. It is a standard public notice to transfer the land title under your name through succession (mutation).',
      actionableSteps: [
        'If you agree with the succession details, attend or submit confirmation before 15 October.',
        'Carry your identity proof (Aadhaar/Voter ID) and registered succession tree document.',
        'Always collect a stamped acknowledgment slip from the revenue office.',
      ],
      importantDates: [{ label: 'Objection / Response Deadline', date: '15 October 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'Case / Notice Number', value: 'REV/2026/8492' },
        { label: 'Khata / Survey Number', value: 'Survey No. 142/3' },
      ],
      whatToKeep: ['Original Notice Paper', 'Official stamped acknowledgment receipt', 'Application reference number'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'Looks consistent with available references',
        explanation: 'The structure, official revenue header, standard 15-day statutory window, and Talati office credentials align with standard state revenue protocols.',
        warningSignals: [],
        officialVerificationChannel: 'Talati-cum-Mantri or Mamlatdar e-Dhara Center',
      },
    };
  }

  if (language === 'gu') {
    if (isSuspicious) {
      return {
        whatIsThis: 'શંકાસ્પદ નાણાકીય માંગણી નોટિસ',
        issuingAuthority: 'અજાણ્યો ખાનગી નંબર અને યુપીઆઈ આઈડી',
        meaningSimple: 'આ પત્રમાં 24 કલાકમાં ₹12,500 અંગત યુપીઆઈ પર ભરવાની ધમકી આપી છે. સરકારી કચેરીઓ ક્યારેય આવી રીતે અંગત યુપીઆઈ પર પૈસા માંગતી નથી.',
        actionableSteps: [
          'કોઈપણ સંજોગોમાં અંગત યુપીઆઈ પર પૈસા મોકલશો નહીં.',
          'તમારા ગામના તલાટી અથવા તાલુકા મામલતદાર કચેરી જઈને આ કાગળની ખરાઈ કરો.',
          'સાયબર હેલ્પલાઇન 1930 પર આ શંકાસ્પદ નંબરની જાણ કરો.',
        ],
        importantDates: [{ label: 'ધમકીભરી મુદત', date: '24 કલાકમાં', isUrgent: true }],
        importantNumbers: [{ label: 'શંકાસ્પદ યુપીઆઈ આઈડી', value: 'revenue-dept-pay@okaxis' }],
        whatToKeep: ['આ કાગળ સાચવીને રાખો, પુરાવા તરીકે કામ લાગશે.'],
        safetyScreening: {
          category: 'warning_signs',
          statusLabel: 'મજબૂત ચેતવણી સંકેતો — સત્તાવાર કચેરીથી ચકાસો',
          explanation: 'આ કાગળમાં તાત્કાલિક પૈસા ભરવાની ધમકી અને અંગત યુપીઆઈ છે, જે સામાન્ય સરકારી નિયમ નથી.',
          warningSignals: [
            '24 કલાકમાં પૈસા ન ભરો તો જમીન જપ્તીની ધમકી',
            'અધિકૃત સરકારી લેટરપેડના બદલે ખાનગી મોબાઈલ નંબર',
            'ખાનગી યુપીઆઈ દ્વારા નાણાંની માંગણી',
          ],
          officialVerificationChannel: 'તાલુકા મામલતદાર કચેરી / જનસેવા કેન્દ્ર',
        },
      };
    }
    return {
      whatIsThis: 'જમીનની વારસાઈ નોંધણીની સરકારી નોટિસ (હકપત્રક નોંધ નં. 135-ડી)',
      issuingAuthority: 'મામલતદાર / તલાટી કચેરી, મહેસૂલ વિભાગ',
      meaningSimple: 'આ કોઈ દંડ કે કેસ નથી. આ તમારા વડીલોપાર્જિત જમીન તમારા નામે ચડાવવાની સામાન્ય પ્રક્રિયા છે.',
      actionableSteps: [
        'નોટિસમાં જણાવ્યા મુજબ 15 ઓક્ટોબર પહેલા તલાટી કચેરીમાં હાજરી આપો.',
        'ઓળખપત્ર (આધાર કાર્ડ/ચૂંટણી કાર્ડ) અને વારસાઈ પેઢીનામાની નકલ સાથે રાખો.',
        'તલાટી સાહેબ પાસેથી સિક્કાવાળી પહોંચ (પાવતી) જરૂર મેળવી લો.',
      ],
      importantDates: [{ label: 'વાંધા અરજીની છેલ્લી તારીખ', date: '15 ઓક્ટોબર 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'નોંધ / નોટિસ ક્રમાંક', value: 'REV/2026/8492' },
        { label: 'સર્વે / ખાતા નંબર', value: 'ખાતા નં. 142/3' },
      ],
      whatToKeep: ['આ નોટિસનો અસલ કાગળ', 'તલાટી દ્વારા અપાતી સિક્કાવાળી પહોંચ', 'અરજી ક્રમાંક અને તારીખ'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'ઉપલબ્ધ સરકારી સંદર્ભો સાથે સુસંગત જણાય છે',
        explanation: 'આ નોટિસનું માળખું, સરકારી શીર્ષક, 15 દિવસનો વાંધા સમયગાળો અને તલાટી કચેરીની વિગતો સામાન્ય મહેસૂલી નિયમો મુજબ જણાય છે.',
        warningSignals: [],
        officialVerificationChannel: 'તાલુકા મામલતદાર / ઈ-ધરા કેન્દ્ર',
      },
    };
  }

  if (language === 'bn') {
    if (isSuspicious) {
      return {
        whatIsThis: 'সন্দেহজনক ২৪ ঘণ্টার অর্থ দাবি নোটিশ',
        issuingAuthority: 'অজ্ঞাত ব্যক্তিগত মোবাইল নম্বর ও অননুমোদিত ইউপিআই',
        meaningSimple: 'এই চিঠিতে ২৪ ঘণ্টার মধ্যে একটি ব্যক্তিগত ইউপিআইতে ₹১২,৫০০ জমা না দিলে জমি বাজেয়াপ্তের হুমকি দেওয়া হয়েছে। সরকারি দপ্তর কখনোই ব্যক্তিগত ইউপিআইতে টাকা দাবি করে না।',
        actionableSteps: [
          'কোনো অবস্থাতেই ব্যক্তিগত ইউপিআই বা অ্যাকাউন্টে টাকা পাঠাবেন না।',
          'স্থানীয় তহশিলদার বা পঞ্চায়েত অফিসে গিয়ে এই চিঠির সত্যতা যাচাই করুন।',
          'জাতীয় সাইবার হেল্পলাইন ১৯৩০ বা নিকটস্থ থানায় অভিযোগ দায়ের করুন।',
        ],
        importantDates: [{ label: 'হুমকিমূলক সময়সীমা', date: '২৪ ঘণ্টার মধ্যে', isUrgent: true }],
        importantNumbers: [{ label: 'সন্দেহজনক ইউপিআই', value: 'revenue-dept-pay@okaxis' }],
        whatToKeep: ['এই চিঠির মূল কপিটি প্রমাণের জন্য নিরাপদে সংরক্ষণ করুন।'],
        safetyScreening: {
          category: 'warning_signs',
          statusLabel: 'কঠোর সতর্কবার্তা সংকেত — সরকারি দপ্তর থেকে যাচাই করুন',
          explanation: 'এতে অবিলম্বে অর্থ প্রদানের চাপ ও জমি নিলামের হুমকি রয়েছে, যা সরকারি বিধিবহির্ভূত।',
          warningSignals: ['২৪ ঘণ্টার মধ্যে জমি নিলামের হুমকি', 'সরকারি সিলের পরিবর্তে ব্যক্তিগত মোবাইল নম্বর', 'ব্যক্তিগত ইউপিআইতে টাকা দাবি'],
          officialVerificationChannel: 'স্থানীয় মহকুমা শাসক / তহশিল রাজস্ব কার্যালয়',
        },
      };
    }
    return {
      whatIsThis: 'জমির উত্তরাধিকার নামপত্তনের সরকারি নোটিশ (ফর্ম ১৩৫-ডি)',
      issuingAuthority: 'রাজস্ব দপ্তর / তহশিলদার / পঞ্চায়েত কার্যালয়',
      meaningSimple: 'এটি কোনো জরিমানা বা আদালতের মামলা নয়। এটি আপনার পূর্বপুরুষের জমি আপনার নামে রেকর্ড করার একটি সাধারণ সরকারি প্রক্রিয়া।',
      actionableSteps: [
        'নোটিশে উল্লেখিত ১৫ অক্টোবরের পূর্বে তহশিলদার বা রাজস্ব কার্যালয়ে গিয়ে সম্মতি নিশ্চিত করুন।',
        'পরিচয়পত্র এবং ওয়ারিশান সনদের কপি সাথে রাখুন।',
        'আধিকারিকের কাছ থেকে সিলমোহরযুক্ত প্রাপ্তিস্বীকার পত্র অবশ্যই গ্রহণ করুন।',
      ],
      importantDates: [{ label: 'আপত্তি জানানোর শেষ তারিখ', date: '১৫ অক্টোবর ২০২৬', isUrgent: true }],
      importantNumbers: [
        { label: 'কেস / নোটিশ নম্বর', value: 'REV/2026/8492' },
        { label: 'খতিয়ান / দাগ নম্বর', value: 'দাগ নং ১৪২/৩' },
      ],
      whatToKeep: ['মূল নোটিশের কাগজ', 'সিলমোহরযুক্ত প্রাপ্তিস্বীকার রসিদ', 'আবেদন নম্বর ও তারিখ'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'সরকারি প্রামাণিক কাঠামোর সাথে সংগতিপূর্ণ',
        explanation: 'এই নোটিশের বিন্যাস, সরকারি রাজস্ব শিরোনাম ও ১৫ দিনের সময়সীমা বিধিবদ্ধ নিয়মের সাথে সামঞ্জস্যপূর্ণ।',
        warningSignals: [],
        officialVerificationChannel: 'স্থানীয় তহশিলদার / রাজস্ব সহায়তা কেন্দ্র',
      },
    };
  }

  if (language === 'mr') {
    if (isSuspicious) {
      return {
        whatIsThis: 'संशयास्पद आर्थिक मागणी नोटीस',
        issuingAuthority: 'अज्ञात खाजगी मोबाईल क्रमांक व अनधिकृत यूपीआय',
        meaningSimple: 'या पत्रात २४ तासांत खाजगी यूपीआयवर ₹१२,५०० न भरल्यास जमीन जप्तीची धमकी दिली आहे. सरकारी कार्यालये कधीही खाजगी यूपीआयवर पैसे मागत नाहीत.',
        actionableSteps: [
          'कोणत्याही परिस्थितीत खाजगी यूपीआयवर पैसे पाठवू नका.',
          'आपल्या गावातील तलाठी किंवा तहसील कार्यालयात जाऊन खात्री करा.',
          'सायबर हेल्पलाईन १९३० किंवा जवळच्या पोलीस ठाण्यात तक्रार करा.',
        ],
        importantDates: [{ label: 'धमकीची मुदत', date: '२४ तासांच्या आत', isUrgent: true }],
        importantNumbers: [{ label: 'संशयास्पद यूपीआय आयडी', value: 'revenue-dept-pay@okaxis' }],
        whatToKeep: ['हे मूळ पत्र पुराव्यासाठी सुरक्षित ठेवा.'],
        safetyScreening: {
          category: 'warning_signs',
          statusLabel: 'धोक्याचे तीव्र संकेत — अधिकृत कार्यालयातून खात्री करा',
          explanation: 'या पत्रात तातडीने पैसे भरण्याचा दबाव आणि खाजगी यूपीआय दिला आहे, जे सरकारी नियमांच्या विरुद्ध आहे.',
          warningSignals: ['२४ तासांत जमीन जप्तीची धमकी', 'अधिकृत सरकारी शिक्क्याऐवजी खाजगी मोबाईल नंबर', 'खाजगी यूपीआयद्वारे पैशांची मागणी'],
          officialVerificationChannel: 'तहसीलदार कार्यालय / महसूल जनसेवा केंद्र',
        },
      };
    }
    return {
      whatIsThis: 'जमिनीची वारसा नोंदणी सरकारी नोटीस (फॉर्म १३५-डी)',
      issuingAuthority: 'कार्यालय मामलेदार / तलाठी, महसूल विभाग',
      meaningSimple: 'हा कोणताही दंड किंवा न्यायालयीन खटला नाही. ही वडिलोपार्जित जमीन आपल्या नावावर वारसा हक्काने नोंदवण्याची (फेरफार नोंद) अधिकृत प्रक्रिया आहे.',
      actionableSteps: [
        'नोटीसमध्ये नमूद केलेल्या १५ ऑक्टोबरच्या आधी तलाठी कार्यालयात संपर्क साधा.',
        'ओळखपत्र आणि वारस दाखल्याची प्रत सोबत ठेवा.',
        'तलाठ्याकडून शिक्का असलेली पोचपावती नक्की घ्या.',
      ],
      importantDates: [{ label: 'हरकत नोंदवण्याची अंतिम मुदत', date: '१५ ऑक्टोबर २०२६', isUrgent: true }],
      importantNumbers: [
        { label: 'केस / नोटीस क्रमांक', value: 'REV/2026/8492' },
        { label: 'खाते / सर्व्हे क्रमांक', value: 'सर्व्हे क्र. १४२/३' },
      ],
      whatToKeep: ['मूळ नोटीस कागदपत्र', 'अधिकृत शिक्का असलेली पोचपावती', 'अर्ज संदर्भ क्रमांक'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'अधिकृत सरकारी नोंदीनुसार सुसंगत',
        explanation: 'या नोटीसचा नमुना, सरकारी महसूल मथळा आणि १५ दिवसांची कायदेशीर मुदत नियमांनुसार आहे.',
        warningSignals: [],
        officialVerificationChannel: 'तहसीलदार / मामलेदार महसूल जनसेवा केंद्र',
      },
    };
  }

  if (language === 'ta') {
    if (isSuspicious) {
      return {
        whatIsThis: 'சட்டவிரோத பணப்பறிப்பு / சந்தேகத்திற்கிடமான அறிவிப்பு',
        issuingAuthority: 'அடையாளம் தெரியாத தனிநபர் மொபைல் எண் & யுபிஐ',
        meaningSimple: 'இந்தக் கடிதத்தில் 24 மணி நேரத்திற்குள் ஒரு தனிநபர் யுபிஐ-க்கு ₹12,500 கட்டவில்லை என்றால் நிலம் ஏலம் விடப்படும் என்று மிரட்டப்பட்டுள்ளது. அரசு அலுவலகங்கள் ஒருபோதும் தனிநபர் யுபிஐ-க்கு பணம் கேட்காது.',
        actionableSteps: [
          'எந்தவொரு சூழ்நிலையிலும் தனிநபர் யுபிஐக்கு பணம் அனுப்பாதீர்கள்.',
          'உங்கள் உள்ளூர் வட்டாட்சியர் அல்லது கிராம நிர்வாக அலுவலகத்திற்குச் சென்று சரிபார்க்கவும்.',
          'சைபர் உதவி எண் 1930 அல்லது காவல் நிலையத்தில் புகார் அளிக்கவும்.',
        ],
        importantDates: [{ label: 'அச்சுறுத்தல் அவகாசம்', date: '24 மணி நேரத்திற்குள்', isUrgent: true }],
        importantNumbers: [{ label: 'சந்தேகத்திற்கிடமான யுபிஐ', value: 'revenue-dept-pay@okaxis' }],
        whatToKeep: ['இந்தக் கடிதத்தை ஆதாரமாக பத்திரமாக வைத்திருக்கவும்.'],
        safetyScreening: {
          category: 'warning_signs',
          statusLabel: 'தீவிர எச்சரிக்கை அறிகுறிகள் — அதிகாரப்பூர்வ அலுவலகத்தில் சரிபார்க்கவும்',
          explanation: 'உடனடி பண மிரட்டல் மற்றும் தனிநபர் யுபிஐ முகவரி இருப்பதால் இது அரசு நடைமுறைக்கு முரணானது.',
          warningSignals: ['24 மணி நேரத்தில் நிலம் ஏலம் விடப்படும் என்ற மிரட்டல்', 'தனிநபர் மொபைல் எண் மற்றும் யுபிஐ'],
          officialVerificationChannel: 'வட்டாட்சியர் அலுவலகம் / இ-சேவை மையம்',
        },
      };
    }
    return {
      whatIsThis: 'நில வாரிசு உரிமை பெயர் மாற்ற அறிவிப்பு (படிவம் 135-D)',
      issuingAuthority: 'வட்டாட்சியர் / கிராம நிர்வாக அலுவலர் அலுவலகம், வருவாய்த்துறை',
      meaningSimple: 'இது எந்தவித அபராதமும் அல்லது நீதிமன்ற வழக்கும் அல்ல. உங்கள் பரம்பரை நிலத்தை உங்கள் பெயருக்கு பட்டா மாற்றம் செய்வதற்கான சாதாரண அரசாங்க நடைமுறையாகும்.',
      actionableSteps: [
        'அறிவிப்பில் குறிப்பிட்டுள்ள அக்டோபர் 15-க்குள் VAO அலுவலகத்தில் ஆஜராகி உறுதிப்படுத்தவும்.',
        'அடையாள அட்டை மற்றும் வாரிசு சான்றிதழ் நகலை தயாராக வைத்திருக்கவும்.',
        'அதிகாரியிடம் இருந்து முத்திரையிடப்பட்ட ரசீதை கட்டாயம் பெற்றுக்கொள்ளவும்.',
      ],
      importantDates: [{ label: 'ஆட்சேபனை தெரிவிக்க கடைசி நாள்', date: '15 அக்டோபர் 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'நோட்டீஸ் / வழக்கு எண்', value: 'REV/2026/8492' },
        { label: 'சர்வே / பட்டா எண்', value: 'சர்வே எண் 142/3' },
      ],
      whatToKeep: ['அசல் நோட்டீஸ் கடிதம்', 'முத்திரையிடப்பட்ட அதிகாரப்பூர்வ ரசீது', 'விண்ணப்ப பதிவு எண்'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'அரசாங்க நடைமுறைகளுடன் பொருந்தி வருகின்றது',
        explanation: 'நோட்டீஸின் வடிவம், வருவாய்த்துறை தலைப்பு, 15 நாட்கள் அவகாசம் ஆகியவை அதிகாரப்பூர்வ விதிகளுடன் ஒத்துப்போகின்றன.',
        warningSignals: [],
        officialVerificationChannel: 'வட்டாட்சியர் / இ-சேவை மையம்',
      },
    };
  }

  if (language === 'te') {
    if (isSuspicious) {
      return {
        whatIsThis: 'అనుమానాస్పద నగదు డిమాండ్ నోటీసు',
        issuingAuthority: 'గుర్తుతెలియని ప్రైవేట్ మొబైల్ నంబర్ & యూపీఐ',
        meaningSimple: 'ఈ లేఖలో 24 గంటల్లో ప్రైవేట్ యూపీఐకి ₹12,500 చెల్లించకపోతే భూమి వేలం వేస్తామని బెదిరించారు. ప్రభుత్వ విభాగాలు ఎప్పుడూ ప్రైవేట్ యూపీఐలకు డబ్బులు అడగవు.',
        actionableSteps: [
          'ఎట్టి పరిస్థితుల్లోనూ ప్రైవేట్ యూపీఐకి డబ్బులు పంపవద్దు.',
          'మీ స్థానిక తహశీల్దార్ లేదా రెవెన్యూ కార్యాలయానికి వెళ్లి ధృవీకరించుకోండి.',
          'సైబర్ హెల్ప్‌లైన్ 1930 లేదా సమీప పోలీస్ స్టేషన్‌లో ఫిర్యాదు చేయండి.',
        ],
        importantDates: [{ label: 'బెదిరింపు గడువు', date: '24 గంటల్లోగా', isUrgent: true }],
        importantNumbers: [{ label: 'అనుమానాస్పద యూపీఐ ఐడీ', value: 'revenue-dept-pay@okaxis' }],
        whatToKeep: ['ఈ అసలు పత్రాన్ని ఆధారంగా భద్రంగా దాచుకోండి.'],
        safetyScreening: {
          category: 'warning_signs',
          statusLabel: 'తీవ్రమైన హెచ్చరిక సంకేతాలు — తహశీల్దార్ కార్యాలయంలో నిర్ధారించుకోండి',
          explanation: 'వెంటనే డబ్బులు చెల్లించాలనే బెదిరింపు మరియు ప్రైవేట్ యూపీఐ ఇవ్వడం ప్రభుత్వ నియమాలకు విరుద్ధం.',
          warningSignals: ['24 గంటల్లో భూమి వేలం వేస్తామనే బెదిరింపు', 'ప్రైవేట్ యూపీఐ ద్వారా నగదు వసూలు ప్రయత్నం'],
          officialVerificationChannel: 'తహశీల్దార్ కార్యాలయం / మీసేవ కేంద్రం',
        },
      };
    }
    return {
      whatIsThis: 'భూమి వారసత్వ హక్కు నమోదు నోటీసు (ఫారం 135-D)',
      issuingAuthority: 'తహశీల్దార్ / గ్రామ రెవెన్యూ అధికారి కార్యాలయం, రెవెన్యూ విభాగం',
      meaningSimple: 'ఇది ఎటువంటి జరిమానా లేదా కోర్టు కేసు కాదు. మీ పూర్వీకుల వ్యవసాయ భూమిని మీ పేరుపై నమోదు చేయడానికి సంబంధించిన సాధారణ ప్రభుత్వ ప్రక్రియ.',
      actionableSteps: [
        'నోటీసులో పేర్కొన్న అక్టోబర్ 15 లోపు తహశీల్దార్ లేదా వీఆర్వో కార్యాలయంలో సంప్రదించండి.',
        'గుర్తింపు కార్డు మరియు వారసత్వ ధృవీకరణ పత్రం ప్రతిని సిద్ధంగా ఉంచుకోండి.',
        'అధికారి నుండి అధికారిక స్టాంప్ వేసిన రసీదును తప్పనిసరిగా తీసుకోండి.',
      ],
      importantDates: [{ label: 'అభ్యంతరం తెలపడానికి చివరి తేదీ', date: '15 అక్టోబర్ 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'కేసు / నోటీసు సంఖ్య', value: 'REV/2026/8492' },
        { label: 'సర్వే / ఖాతా సంఖ్య', value: 'సర్వే నం. 142/3' },
      ],
      whatToKeep: ['అసలు నోటీసు కాగితం', 'స్టాంప్ వేసిన అధికారిక రసీదు', 'దరఖాస్తు సంఖ్య'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'అధికారిక ప్రభుత్వ రికార్డులకు అనుగుణంగా ఉంది',
        explanation: 'నోటీసు రూపకల్పన, రెవెన్యూ శాఖ హెడర్ మరియు 15 రోజుల చట్టబద్ధమైన గడువు ప్రభుత్వ నిబంధనలకు అనుగుణంగా ఉన్నాయి.',
        warningSignals: [],
        officialVerificationChannel: 'తహశీల్దార్ / మీసేవ కేంద్రం',
      },
    };
  }

  if (language === 'kn') {
    if (isSuspicious) {
      return {
        whatIsThis: 'ಅನುಮಾನಾಸ್ಪದ ಹಣ ವಸೂಲಾತಿ ನೋಟಿಸ್',
        issuingAuthority: 'ಅಪರಿಚಿತ ಖಾಸಗಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ & ಯುಪಿಐ',
        meaningSimple: 'ಈ ಪತ್ರದಲ್ಲಿ 24 ಗಂಟೆಗಳಲ್ಲಿ ಖಾಸಗಿ ಯುಪಿಐಗೆ ₹12,500 ಪಾವತಿಸದಿದ್ದರೆ ಜಮೀನು ಹರಾಜು ಹಾಕುವುದಾಗಿ ಬೆದರಿಕೆ ಹಾಕಲಾಗಿದೆ. ಸರ್ಕಾರಿ ಇಲಾಖೆಗಳು ಎಂದಿಗೂ ಖಾಸಗಿ ಯುಪಿಐಗೆ ಹಣ ಕೇಳುವುದಿಲ್ಲ.',
        actionableSteps: [
          'ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಖಾಸಗಿ ಯುಪಿಐಗೆ ಹಣ ಕಳುಹಿಸಬೇಡಿ.',
          'ನಿಮ್ಮ ತಾಲೂಕು ತಹಶೀಲ್ದಾರ್ ಅಥವಾ ಕಂದಾಯ ಕಚೇರಿಗೆ ತೆರಳಿ ಪರಿಶೀಲಿಸಿ.',
          'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಸಹಾಯವಾಣಿ 1930 ಅಥವಾ ಪೊಲೀಸ್ ಠಾಣೆಗೆ ದೂರು ನೀಡಿ.',
        ],
        importantDates: [{ label: 'ಬೆದರಿಕೆಯ ಗಡುವು', date: '24 ಗಂಟೆಯೊಳಗೆ', isUrgent: true }],
        importantNumbers: [{ label: 'ಅನುಮಾನಾಸ್ಪದ ಯುಪಿಐ ಐಡಿ', value: 'revenue-dept-pay@okaxis' }],
        whatToKeep: ['ಈ ಮೂಲ ಪತ್ರವನ್ನು ಸಾಕ್ಷಿಯಾಗಿ ಸುರಕ್ಷಿತವಾಗಿಡಿ.'],
        safetyScreening: {
          category: 'warning_signs',
          statusLabel: 'ತೀವ್ರ ಎಚ್ಚರಿಕೆಯ ಸಂಕೇತ — ಅಧಿಕೃತ ಕಚೇರಿಯಿಂದ ಪರಿಶೀಲಿಸಿ',
          explanation: 'ತುರ್ತು ಹಣದ ಬೇಡಿಕೆ ಮತ್ತು ಖಾಸಗಿ ಯುಪಿಐ ನಮೂದಿಸಿರುವುದು ಸರ್ಕಾರಿ ನಿಯಮಗಳಿಗೆ ವಿರುದ್ಧವಾಗಿದೆ.',
          warningSignals: ['24 ಗಂಟೆಗಳಲ್ಲಿ ಜಮೀನು ಹರಾಜು ಹಾಕುವ ಬೆದರಿಕೆ', 'ಖಾಸಗಿ ಯುಪಿಐ ಮೂಲಕ ಹಣದ ಬೇಡಿಕೆ'],
          officialVerificationChannel: 'ತಹಶೀಲ್ದಾರ್ ಕಾರ್ಯಾಲಯ / ನಾಡಕಚೇರಿ',
        },
      };
    }
    return {
      whatIsThis: 'ಭೂಮಿ ವಾರಸುದಾರಿಕೆ ಹಕ್ಕು ದಾಖಲಾತಿ ನೋಟಿಸ್ (ಫಾರ್ಮ್ 135-ಡಿ)',
      issuingAuthority: 'ತಹಶೀಲ್ದಾರ್ / ಗ್ರಾಮ ಲೆಕ್ಕಿಗರ ಕಾರ್ಯಾಲಯ, ಕಂದಾಯ ಇಲಾಖೆ',
      meaningSimple: 'ಇದು ಯಾವುದೇ ದಂಡ ಅಥವಾ ನ್ಯಾಯಾಲಯದ ಮೊಕದ್ದಮೆ ಅಲ್ಲ. ನಿಮ್ಮ ಪೂರ್ವಜರ ಭೂಮಿಯನ್ನು ನಿಮ್ಮ ಹೆಸರಿಗೆ ವರ್ಗಾಯಿಸುವ ಸಾಮಾನ್ಯ ಕಾನೂನುಬದ್ಧ ಪ್ರಕ್ರಿಯೆಯಾಗಿದೆ.',
      actionableSteps: [
        'ನೋಟಿಸ್‌ನಲ್ಲಿ ತಿಳಿಸಲಾದ ಅಕ್ಟೋಬರ್ 15 ಕ್ಕಿಂತ ಮೊದಲು ಕಂದಾಯ ಕಚೇರಿಗೆ ಭೇಟಿ ನೀಡಿ.',
        'ಗುರುತಿನ ಚೀಟಿ ಮತ್ತು ವಾರಸುದಾರಿಕೆ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಜೊತೆಯಲ್ಲಿಟ್ಟುಕೊಳ್ಳಿ.',
        'ಅಧಿಕಾರಿಯಿಂದ ಅಧಿಕೃತ ಮೊಹರು ಮಾಡಿದ ಸ್ವೀಕೃತಿ ಪಾವತಿಯನ್ನು ತಪ್ಪದೇ ಪಡೆಯಿರಿ.',
      ],
      importantDates: [{ label: 'ಆಕ್ಷೇಪಣೆ ಸಲ್ಲಿಸಲು ಕೊನೆಯ ದಿನಾಂಕ', date: '15 ಅಕ್ಟೋಬರ್ 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'ಪ್ರಕರಣ / ನೋಟಿಸ್ ಸಂಖ್ಯೆ', value: 'REV/2026/8492' },
        { label: 'ಸರ್ವೇ / ಖಾತೆ ಸಂಖ್ಯೆ', value: 'ಸರ್ವೇ ನಂ. 142/3' },
      ],
      whatToKeep: ['ಮೂಲ ನೋಟಿಸ್ ಪ್ರತಿ', 'ಮೊಹರು ಮಾಡಿದ ರಸೀದಿ', 'ಅರ್ಜಿ ಸಂಖ್ಯೆ'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'ಸರ್ಕಾರಿ ಮಾನದಂಡಗಳೊಂದಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತಿದೆ',
        explanation: 'ಈ ನೋಟಿಸ್‌ನ ನಮೂನೆ, ಕಂದಾಯ ಶೀರ್ಷಿಕೆ ಮತ್ತು 15 ದಿನಗಳ ಕಾನೂನುಬದ್ಧ ಗಡುವು ನಿಯಮಾನುಸಾರವಾಗಿದೆ.',
        warningSignals: [],
        officialVerificationChannel: 'ತಹಶೀಲ್ದಾರ್ ಕಾರ್ಯಾಲಯ / ನಾಡಕಚೇರಿ',
      },
    };
  }

  if (language === 'ml') {
    if (isSuspicious) {
      return {
        whatIsThis: 'വ്യാജ പണപ്പിരിവ് / സംശയാസ്പദമായ നോട്ടീസ്',
        issuingAuthority: 'വ്യക്തിഗത മൊബൈൽ നമ്പറും വ്യാജ യുപിഐയും',
        meaningSimple: 'ഈ കത്തിൽ 24 മണിക്കൂറിനകം സ്വകാര്യ യുപിഐയിലേക്ക് ₹12,500 അടച്ചില്ലെങ്കിൽ ഭൂമി ലേലം ചെയ്യുമെന്ന് ഭീഷണിപ്പെടുത്തുന്നു. സർക്കാർ ഓഫീസുകൾ ഒരിക്കലും സ്വകാര്യ യുപിഐ വഴി പണം ആവശ്യപ്പെടില്ല.',
        actionableSteps: [
          'ഒരു കാരണവശാലും സ്വകാര്യ യുപിഐയിലേക്ക് പണം അയക്കരുത്.',
          'താലൂക്ക് തഹസിൽദാർ അല്ലെങ്കിൽ വില്ലേജ് ഓഫീസുമായി ബന്ധപ്പെട്ട് പരിശോധിക്കുക.',
          'സൈബർ ഹെൽപ്പ് ലൈനായ 1930-ലോ അടുത്തുള്ള പോലീസ് സ്റ്റേഷനിലോ പരാതി നൽകുക.',
        ],
        importantDates: [{ label: 'ഭീഷണിപ്പെടുത്തുന്ന സമയം', date: '24 മണിക്കൂറിനകം', isUrgent: true }],
        importantNumbers: [{ label: 'സംശയാസ്പദമായ യുപിഐ ഐഡി', value: 'revenue-dept-pay@okaxis' }],
        whatToKeep: ['ഈ കത്തിന്റെ അസ്സൽ തെളിവായി സൂക്ഷിക്കുക.'],
        safetyScreening: {
          category: 'warning_signs',
          statusLabel: 'ഗുരുതരമായ മുന്നറിയിപ്പ് — ഔദ്യോഗിക ഓഫീസിൽ അന്വേഷിക്കുക',
          explanation: 'ഉടൻ പണം അടയ്ക്കാനുള്ള ഭീഷണിയും സ്വകാര്യ യുപിഐ വിലാസവും സർക്കാർ ചട്ടങ്ങൾക്ക് വിരുദ്ധമാണ്.',
          warningSignals: ['24 മണിക്കൂറിനകം ഭൂമി ലേലം ചെയ്യുമെന്ന ഭീഷണി', 'സ്വകാര്യ യുപിഐ വഴി പണം ആവശ്യപ്പെടൽ'],
          officialVerificationChannel: 'താലൂക്ക് ഓഫീസ് / വില്ലേജ് ഓഫീസ്',
        },
      };
    }
    return {
      whatIsThis: 'ഭൂമി അനന്തരാവകാശ പോക്കുവരവ് നോട്ടീസ് (ഫോം 135-ഡി)',
      issuingAuthority: 'തഹസിൽദാർ / വില്ലേജ് ഓഫീസ്, റവന്യൂ വകുപ്പ്',
      meaningSimple: 'ഇതൊരു പിഴയോ കോടതി കേസുകളോ അല്ല. കുടുംബ സ്വത്ത് നിങ്ങളുടെ പേരിലേക്ക് പോക്കുവരവ് ചെയ്യുന്നതിനുള്ള സാധാരണ സർക്കാർ അറിയിപ്പാണ്.',
      actionableSteps: [
        'നോട്ടീസിൽ പറഞ്ഞിരിക്കുന്ന ഒക്ടോബർ 15-ന് മുൻപായി വില്ലേജ് ഓഫീസിൽ വിവരങ്ങൾ അറിയിക്കുക.',
        'തിരിച്ചറിയൽ രേഖ, അവകാശ സർട്ടിഫിക്കറ്റ് എന്നിവ കൂടെ കരുതുക.',
        'ഉദ്യോഗസ്ഥനിൽ നിന്ന് മുദ്ര പതിപ്പിച്ച കൈപ്പറ്റ് രസീത് നിർബന്ധമായും വാങ്ങുക.',
      ],
      importantDates: [{ label: 'തടസ്സവാദം ബോധിപ്പിക്കാനുള്ള അവസാന തീയതി', date: '15 ഒക്ടോബർ 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'നോട്ടീസ് / കേസ് നമ്പർ', value: 'REV/2026/8492' },
        { label: 'സർവേ നമ്പർ / തണ്ടപ്പേര്', value: 'സർവേ നം. 142/3' },
      ],
      whatToKeep: ['അസ്സൽ നോട്ടീസ്', 'മുദ്ര പതിപ്പിച്ച രസീത്', 'അപേക്ഷാ നമ്പർ'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'ഔദ്യോഗിക സർക്കാർ ചട്ടങ്ങൾക്ക് അനുസൃതമാണ്',
        explanation: 'നോട്ടീസിന്റെ ഘടന, റവന്യൂ ശീർഷകം, 15 ദിവസത്തെ സമയം എന്നിവ ഔദ്യോഗിക ചട്ടങ്ങളുമായി യോജിക്കുന്നു.',
        warningSignals: [],
        officialVerificationChannel: 'താലൂക്ക് ഓഫീസ് / വില്ലേജ് അക്ഷയ കേന്ദ്രം',
      },
    };
  }

  if (language === 'pa') {
    if (isSuspicious) {
      return {
        whatIsThis: 'ਗ਼ੈਰ-ਕਾਨੂੰਨੀ ਵਸੂਲੀ / ਸ਼ੱਕੀ ਨੋਟਿਸ',
        issuingAuthority: 'ਅਣਪਛਾਤਾ ਨਿੱਜੀ ਮੋਬਾਈਲ ਨੰਬਰ ਅਤੇ ਜਾਅਲੀ ਯੂਪੀਆਈ',
        meaningSimple: 'ਇਸ ਚਿੱਠੀ ਵਿੱਚ 24 ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ ਨਿੱਜੀ ਯੂਪੀਆਈ ਤੇ ₹12,500 ਜਮ੍ਹਾਂ ਨਾ ਕਰਵਾਉਣ ਤੇ ਜ਼ਮੀਨ ਨਿਲਾਮ ਕਰਨ ਦੀ ਧਮਕੀ ਦਿੱਤੀ ਗਈ ਹੈ। ਸਰਕਾਰੀ ਦਫ਼ਤਰ ਕਦੇ ਵੀ ਨਿੱਜੀ ਯੂਪੀਆਈ ਤੇ ਪੈਸੇ ਨਹੀਂ ਮੰਗਦੇ।',
        actionableSteps: [
          'ਕਿਸੇ ਵੀ ਹਾਲਤ ਵਿੱਚ ਨਿੱਜੀ ਯੂਪੀਆਈ ਜਾਂ ਖਾਤੇ ਵਿੱਚ ਪੈਸੇ ਨਾ ਭੇਜੋ।',
          'ਆਪਣੇ ਤਹਿਸੀਲਦਾਰ ਜਾਂ ਪਟਵਾਰੀ ਦਫ਼ਤਰ ਜਾ ਕੇ ਇਸ ਨੋਟਿਸ ਦੀ ਜਾਂਚ ਕਰਵਾਓ।',
          'ਸਾਈਬਰ ਹੈਲਪਲਾਈਨ 1930 ਜਾਂ ਨੇੜਲੇ ਪੁਲਿਸ ਥਾਣੇ ਵਿੱਚ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ।',
        ],
        importantDates: [{ label: 'ਧਮਕੀ ਭਰੀ ਮਿਆਦ', date: '24 ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ', isUrgent: true }],
        importantNumbers: [{ label: 'ਸ਼ੱਕੀ ਯੂਪੀਆਈ ਆਈਡੀ', value: 'revenue-dept-pay@okaxis' }],
        whatToKeep: ['ਇਸ ਚਿੱਠੀ ਦੀ ਅਸਲ ਕਾਪੀ ਸਬੂਤ ਵਜੋਂ ਸੰਭਾਲ ਕੇ ਰੱਖੋ।'],
        safetyScreening: {
          category: 'warning_signs',
          statusLabel: 'ਸਖ਼ਤ ਚੇਤਾਵਨੀ ਸੰਕੇਤ — ਸਰਕਾਰੀ ਦਫ਼ਤਰ ਤੋਂ ਪੜਤਾਲ ਕਰੋ',
          explanation: 'ਇਸ ਵਿੱਚ ਤੁਰੰਤ ਪੈਸੇ ਮੰਗਣ ਦਾ ਦਬਾਅ ਅਤੇ ਨਿੱਜੀ ਯੂਪੀਆਈ ਦਿੱਤਾ ਗਿਆ ਹੈ ਜੋ ਸਰਕਾਰੀ ਨਿਯਮਾਂ ਦੇ ਉਲਟ ਹੈ।',
          warningSignals: ['24 ਘੰਟਿਆਂ ਵਿੱਚ ਜ਼ਮੀਨ ਨਿਲਾਮ ਕਰਨ ਦੀ ਧਮਕੀ', 'ਨਿੱਜੀ ਯੂਪੀਆਈ ਰਾਹੀਂ ਪੈਸਿਆਂ ਦੀ ਮੰਗ'],
          officialVerificationChannel: 'ਤਹਿਸੀਲਦਾਰ / ਫ਼ਰਦ ਕੇਂਦਰ / ਸੇਵਾ ਕੇਂਦਰ',
        },
      };
    }
    return {
      whatIsThis: 'ਜ਼ਮੀਨ ਦੀ ਵਰਾਸਤ / ਇੰਤਕਾਲ ਸਬੰਧੀ ਸਰਕਾਰੀ ਨੋਟਿਸ (ਫ਼ਾਰਮ 135-ਡੀ)',
      issuingAuthority: 'ਤਹਿਸੀਲਦਾਰ / ਪਟਵਾਰੀ ਦਫ਼ਤਰ, ਮਾਲ ਵਿਭਾਗ',
      meaningSimple: 'ਇਹ ਕੋਈ ਜੁਰਮਾਨਾ ਜਾਂ ਅਦਾਲਤੀ ਕੇਸ ਨਹੀਂ ਹੈ। ਇਹ ਤੁਹਾਡੀ ਜੱਦੀ ਜ਼ਮੀਨ ਤੁਹਾਡੇ ਨਾਮ ਤੇ ਚੜ੍ਹਾਉਣ ਦੀ ਆਮ ਸਰਕਾਰੀ ਪ੍ਰਕਿਰਿਆ ਹੈ।',
      actionableSteps: [
        'ਨੋਟਿਸ ਮੁਤਾਬਕ 15 ਅਕਤੂਬਰ ਤੋਂ ਪਹਿਲਾਂ ਪਟਵਾਰੀ ਜਾਂ ਤਹਿਸੀਲ ਦਫ਼ਤਰ ਵਿੱਚ ਸੰਪਰਕ ਕਰੋ।',
        'ਆਪਣਾ ਪਛਾਣ ਪੱਤਰ ਅਤੇ ਵਾਰਸਨਾਮੇ ਦੀ ਨਕਲ ਨਾਲ ਰੱਖੋ।',
        'ਅਧਿਕਾਰੀ ਕੋਲੋਂ ਮੋਹਰ ਲੱਗੀ ਹੋਈ ਰਸੀਦ ਜ਼ਰੂਰ ਲਵੋ।',
      ],
      importantDates: [{ label: 'ਇਤਰਾਜ਼ ਦਰਜ ਕਰਨ ਦੀ ਆਖ਼ਰੀ ਮਿਤੀ', date: '15 ਅਕਤੂਬਰ 2026', isUrgent: true }],
      importantNumbers: [
        { label: 'ਕੇਸ / ਨੋਟਿਸ ਨੰਬਰ', value: 'REV/2026/8492' },
        { label: 'ਖੇਵਟ / ਖਸਰਾ ਨੰਬਰ', value: 'ਖਸਰਾ ਨੰ. 142/3' },
      ],
      whatToKeep: ['ਅਸਲ ਨੋਟਿਸ ਕਾਗਜ਼', 'ਮੋਹਰ ਲੱਗੀ ਹੋਈ ਸਰਕਾਰੀ ਰਸੀਦ', 'ਦਰਖਾਸਤ ਨੰਬਰ'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'ਸਰਕਾਰੀ ਨਿਯਮਾਂ ਅਨੁਸਾਰ ਬਿਲਕੁਲ ਠੀਕ ਜਾਪਦਾ ਹੈ',
        explanation: 'ਨੋਟਿਸ ਦਾ ਫਾਰਮੈਟ, ਮਾਲ ਵਿਭਾਗ ਦਾ ਸਿਰਲੇਖ ਅਤੇ 15 ਦਿਨਾਂ ਦੀ ਕਾਨੂੰਨੀ ਮਿਆਦ ਮਿਆਰੀ ਪ੍ਰਕਿਰਿਆ ਅਨੁਸਾਰ ਹੈ।',
        warningSignals: [],
        officialVerificationChannel: 'ਤਹਿਸੀਲਦਾਰ / ਫ਼ਰਦ ਕੇਂਦਰ / ਸੇਵਾ ਕੇਂਦਰ',
      },
    };
  }

  if (language === 'or') {
    if (isSuspicious) {
      return {
        whatIsThis: 'ବେଆଇନ ଆଦାୟ / ସନ୍ଦେହଜନକ ନୋଟିସ',
        issuingAuthority: 'ଅଜ୍ଞାତ ବ୍ୟକ୍ତିଗତ ମୋବାଇଲ ନମ୍ବର ଏବଂ ୟୁପିଆଇ',
        meaningSimple: 'ଏହି ପତ୍ରରେ ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ବ୍ୟକ୍ତିଗତ ୟୁପିଆଇରେ ₹୧୨,୫୦୦ ଜମା ନକଲେ ଜମି ନିଲାମ କରିବାକୁ ଧମକ ଦିଆଯାଇଛି। ସରକାରୀ ବିଭାଗ କେବେହେଲେ ବ୍ୟକ୍ତିଗତ ୟୁପିଆଇରେ ଟଙ୍କା ମାଗନ୍ତି ନାହିଁ।',
        actionableSteps: [
          'କୌଣସି ପରିସ୍ଥିତିରେ ବ୍ୟକ୍ତିଗତ ୟୁପିଆଇକୁ ଟଙ୍କା ପଠାନ୍ତୁ ନାହିଁ।',
          'ସ୍ଥାନୀୟ ତହସିଲ କିମ୍ବା ରାଜସ୍ୱ କାର୍ଯ୍ୟାଳୟକୁ ଯାଇ ଏହି ଚିଠିର ସତ୍ୟତା ଯାଞ୍ଚ କରନ୍ତୁ।',
          'ସାଇବର ହେଲ୍ପଲାଇନ ୧୯୩୦ କିମ୍ବା ପୋଲିସ ଷ୍ଟେସନରେ ଅଭିଯୋଗ କରନ୍ତୁ।',
        ],
        importantDates: [{ label: 'ଧମକପୂର୍ଣ୍ଣ ସମୟସୀମା', date: '୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ', isUrgent: true }],
        importantNumbers: [{ label: 'ସନ୍ଦେହଜନକ ୟୁପିଆଇ ଆଇଡି', value: 'revenue-dept-pay@okaxis' }],
        whatToKeep: ['ଏହି ଚିଠିର ମୂଳ କପି ପ୍ରମାଣ ଭାବରେ ସୁରକ୍ଷିତ ରଖନ୍ତୁ।'],
        safetyScreening: {
          category: 'warning_signs',
          statusLabel: 'ଦୃଢ଼ ସତର୍କତା ସଙ୍କେତ — ସରକାରୀ କାର୍ଯ୍ୟାଳୟରୁ ଯାଞ୍ଚ କରନ୍ତୁ',
          explanation: 'ତୁରନ୍ତ ଟଙ୍କା ଦେବା ପାଇଁ ଚାପ ଏବଂ ବ୍ୟକ୍ତିଗତ ୟୁପିଆଇ ଉଲ୍ଲେଖ ଥିବାରୁ ଏହା ସରକାରୀ ନିୟମ ବିରୋଧୀ।',
          warningSignals: ['୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ଜମି ନିଲାମ କରିବାର ଧମକ', 'ବ୍ୟକ୍ତିଗତ ୟୁପିଆଇ ମାଧ୍ୟମରେ ଟଙ୍କା ଦାବି'],
          officialVerificationChannel: 'ତହସିଲଦାର କାର୍ଯ୍ୟାଳୟ / ଜନସେବା କେନ୍ଦ୍ର',
        },
      };
    }
    return {
      whatIsThis: 'ଜମି ଉତ୍ତରାଧିକାର ନାମଜାରୀ ସରକାରୀ ନୋଟିସ (ଫର୍ମ ୧୩୫-ଡି)',
      issuingAuthority: 'ତହସିଲଦାର / ରାଜସ୍ୱ ନିରୀକ୍ଷକ (RI) କାର୍ଯ୍ୟାଳୟ, ରାଜସ୍ୱ ବିଭାଗ',
      meaningSimple: 'ଏହା କୌଣସି ଜରିମାନା କିମ୍ବା ମକଦ୍ଦମା ନୁହେଁ। ଏହା ଆପଣଙ୍କ ପୈତୃକ ଜମି ଆପଣଙ୍କ ନାମରେ ରେକର୍ଡ କରିବାର ସାଧାରଣ ସରକାରୀ ପ୍ରକ୍ରିୟା।',
      actionableSteps: [
        'ନୋଟିସ ଅନୁଯାୟୀ ୧୫ ଅକ୍ଟୋବର ପୂର୍ବରୁ ତହସିଲ କିମ୍ବା RI କାର୍ଯ୍ୟାଳୟରେ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
        'ପରିଚୟ ପତ୍ର ଏବଂ ଉତ୍ତରାଧିକାର ପ୍ରମାଣପତ୍ରର ନକଲ ସାଥିରେ ରଖନ୍ତୁ।',
        'ଅଧିକାରୀଙ୍କଠାରୁ ସିଲ୍ ମୋହର ଥିବା ରସିଦ ନିଶ୍ଚିତ ଭାବେ ସଂଗ୍ରହ କରନ୍ତୁ।',
      ],
      importantDates: [{ label: 'ଆପତ୍ତି ଦାଖଲ କରିବାର ଶେଷ ତାରିଖ', date: '୧୫ ଅକ୍ଟୋବର ୨୦୨୬', isUrgent: true }],
      importantNumbers: [
        { label: 'କେସ / ନୋଟିସ ନମ୍ବର', value: 'REV/2026/8492' },
        { label: 'ଖାତା / ପ୍ଲଟ ନମ୍ବର', value: 'ପ୍ଲଟ ନଂ. ୧୪୨/୩' },
      ],
      whatToKeep: ['ମୂଳ ନୋଟିସ କାଗଜ', 'ସିଲ୍ ଥିବା ଅଫିସିଆଲ ରସିଦ', 'ଦରଖାସ୍ତ ନମ୍ବର'],
      safetyScreening: {
        category: 'consistent',
        statusLabel: 'ସରକାରୀ ନିୟମାନୁଯାୟୀ ଠିକ୍ ଜଣାପଡୁଛି',
        explanation: 'ନୋଟିସର ଢାଞ୍ଚା, ରାଜସ୍ୱ ବିଭାଗ ଶୀର୍ଷକ ଓ ୧୫ ଦିନର ସମୟସୀମା ସାଧାରଣ ନିୟମ ସହିତ ମେଳ ଖାଉଛି।',
        warningSignals: [],
        officialVerificationChannel: 'ତହସିଲଦାର କାର୍ଯ୍ୟାଳୟ / ଜନସେବା କେନ୍ଦ୍ର',
      },
    };
  }

  // Default: Hindi (hi)
  if (isSuspicious) {
    return {
      whatIsThis: 'अवैध वसूली / संदिग्ध नोटिस',
      issuingAuthority: 'अज्ञात निजी मोबाइल नंबर व अनधिकृत खाता',
      meaningSimple: 'इस पत्र में 24 घंटे के भीतर सीधे यूपीआई पर ₹12,500 जमा करने की धमकी दी गई है। सरकारी विभाग कभी भी निजी यूपीआई पर पैसे नहीं मांगते।',
      actionableSteps: [
        'किसी भी निजी यूपीआई या खाते में पैसे न भेजें।',
        'अपने नजदीकी तहसील या पंचायत कार्यालय में जाकर इस नोटिस की जांच कराएं।',
        'साइबर हेल्पलाइन 1930 या नजदीकी पुलिस थाने में शिकायत दर्ज कराएं।',
      ],
      importantDates: [{ label: 'धमकी भरी समय सीमा', date: '24 घंटे के अंदर', isUrgent: true }],
      importantNumbers: [{ label: 'संदिग्ध यूपीआई आईडी', value: 'revenue-dept-pay@okaxis' }],
      whatToKeep: ['इस पत्र की मूल प्रति सुरक्षित रखें, किसी को न सौंपें।'],
      safetyScreening: {
        category: 'warning_signs',
        statusLabel: 'मजबूत चेतावनी संकेत — आधिकारिक कार्यालय से जांचें',
        explanation: 'इस पत्र में निजी यूपीआई पर तुरंत पैसे जमा करने का दबाव और धमकी है, जो सामान्य सरकारी प्रक्रिया के विपरीत है।',
        warningSignals: [
          '24 घंटे में भुगतान न करने पर जमीन जब्ती की धमकी',
          'सरकारी मुहर के स्थान पर निजी मोबाइल नंबर',
          'अनधिकृत यूपीआई पेमेंट पता',
        ],
        officialVerificationChannel: 'स्थानीय तहसील / ब्लॉक विकास कार्यालय (BDCO)',
      },
    };
  }

  return {
    whatIsThis: 'जमीन की वारसाई / नाम दर्ज कराने की सरकारी नोटिस (फॉर्म 135-डी)',
    issuingAuthority: 'कार्यालय मामलतदार / तलाटी, राजस्व विभाग',
    meaningSimple: 'यह कोई जुर्माना या मुकदमा नहीं है। यह आपके पूर्वज की जमीन आपके नाम दर्ज कराने (म्यूटेशन) की सामान्य सरकारी सूचना है ताकि कोई आपत्ति हो तो दर्ज की जा सके।',
    actionableSteps: [
      'नोटिस में दी गई तारीख (15 अक्टूबर) से पहले यदि कोई आपत्ति न हो तो तलाटी कार्यालय में उपस्थिति दर्ज करें।',
      'अपने पहचान पत्र (आधार कार्ड/पहचान पत्र) और मूल वारिसनामा की प्रति साथ रखें।',
      'तलाटी से मुहर लगी पावती (रसीद) अवश्य लें।',
    ],
    importantDates: [{ label: 'आपत्ति दर्ज कराने की अंतिम तिथि', date: '15 अक्टूबर 2026', isUrgent: true }],
    importantNumbers: [
      { label: 'केस / नोटिस क्रमांक', value: 'REV/2026/8492' },
      { label: 'सर्वे / खाता क्रमांक', value: 'खाता नं. 142/3' },
    ],
    whatToKeep: ['नोटिस की मूल प्रति', 'आवेदन की मुहरबंद रसीद (पावती)', 'तलाटी द्वारा दिया गया पावती नंबर'],
    safetyScreening: {
      category: 'consistent',
      statusLabel: 'उपलब्ध सरकारी संदर्भों के अनुसार सुसंगत प्रतीत होता है',
      explanation: 'इस नोटिस का प्रारूप, सरकारी शीर्षक, 15 दिन का नियत समय और मामलतदार कार्यालय का पता मानक राजस्व प्रक्रियाओं के अनुरूप है।',
      warningSignals: [],
      officialVerificationChannel: 'तहसीलदार / मामलतदार राजस्व सेवा केंद्र',
    },
  };
}

// Localized Q&A Responses for All 11 Supported Languages
function getFallbackAnswer(question: string, language: string) {
  const answers: Record<string, string> = {
    hi: 'घबराइए मत। सबसे पहले अपने पास आधार कार्ड और जमीन के कागजात रखें। 15 अक्टूबर से पहले अपने गांव के तलाटी या तहसील कार्यालय जाएं और जमा करने के बाद मुहरबंद रसीद (पावती) अवश्य लें। क्या आप चाहते हैं कि मैं आपके बेटे या सहायक को यह संदेश भेज दूं?',
    en: 'Do not worry. First, keep your identity proof and land succession papers ready. Visit the Talati or Tehsil office before 15 October, and strictly collect a stamped acknowledgment slip. Would you like me to share these steps with your trusted helper?',
    gu: 'ચિંતા કરશો નહીં. સૌથી પહેલા તમારું આધાર કાર્ડ અને પેઢીનામાની નકલ તૈયાર રાખો. 15 ઓક્ટોબર પહેલા તમારા ગામના તલાટી કચેરીએ જાવ અને કાગળ આપ્યા પછી સિક્કાવાળી પહોંચ લેવાનું ક્યારેય ચૂકશો નહીં. શું હું આ વાત તમારા દીકરા કે મદદગારને મોકલી આપું?',
    bn: 'চিন্তা করবেন না। প্রথমে আপনার আধার কার্ড ও ওয়ারিশান সনদের কপি প্রস্তুত রাখুন। ১৫ অক্টোবরের আগে তহশিল অফিসে যোগাযোগ করুন এবং জমা দেওয়ার পর সিলমোহরযুক্ত রসিদ অবশ্যই গ্রহণ করুন। আপনি কি চান আমি আপনার বিশ্বস্ত সহায়ককে এই তথ্য জানিয়ে দিই?',
    mr: 'काळजी करू नका. सर्वात आधी आपले आधार कार्ड आणि वारस दाखला जवळ ठेवा. १५ ऑक्टोबरच्या आधी तलाठी कार्यालयात संपर्क साधा आणि अर्ज दिल्यावर शिक्का असलेली पोचपावती अवश्य घ्या. मी ही माहिती आपल्या मदतनीसाला पाठवू का?',
    ta: 'கவலைப்பட வேண்டாம். முதலில் உங்கள் ஆதார் அட்டை மற்றும் வாரிசு சான்றிதழை தயாராக வைத்திருக்கவும். அக்டோபர் 15-க்கு முன் கிராம நிர்வாக அலுவலகத்தை அணுகி, முத்திரையிடப்பட்ட ரசீதை தவறாமல் பெற்றுக்கொள்ளவும். இந்த தகவலை உங்கள் குடும்ப உதவியாளருக்கு அனுப்பவா?',
    te: 'ఆందోళన చెందవద్దు. ముందుగా మీ ఆధార్ కార్డు మరియు వారసత్వ పత్రాలను సిద్ధంగా ఉంచుకోండి. అక్టోబర్ 15 లోపు తహశీల్దార్ లేదా రెవెన్యూ కార్యాలయానికి వెళ్లి, స్టాంప్ వేసిన రసీదును తప్పనిసరిగా తీసుకోండి. ఈ వివరాలను మీ సహాయకుడికి పంపమంటారా?',
    kn: 'ಚಿಂತಿಸಬೇಡಿ. ಮೊದಲಿಗೆ ನಿಮ್ಮ ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ವಾರಸುದಾರಿಕೆ ಪತ್ರವನ್ನು ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ. ಅಕ್ಟೋಬರ್ 15 ರೊಳಗೆ ಕಂದಾಯ ಕಚೇರಿಗೆ ತೆರಳಿ, ಮೊಹರು ಮಾಡಿದ ಸ್ವೀಕೃತಿ ರಸೀದಿಯನ್ನು ತಪ್ಪದೇ ಪಡೆದುಕೊಳ್ಳಿ. ಈ ಮಾಹಿತಿಯನ್ನು ನಿಮ್ಮ ಸಹಾಯಕರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲೇ?',
    ml: 'ആശങ്കപ്പെടേണ്ടതില്ല. ആദ്യം നിങ്ങളുടെ ആധാർ കാർഡും അവകാശ സർട്ടിഫിക്കറ്റും തയ്യാറാക്കി വെയ്ക്കുക. ഒക്ടോബർ 15-ന് മുൻപായി വില്ലേജ് ഓഫീസിൽ പോയി മുദ്ര പതിപ്പിച്ച രസീത് വാങ്ങുക. ഈ വിവരങ്ങൾ നിങ്ങളുടെ സഹായിക്ക് അയച്ചു നൽകണമോ?',
    pa: 'ਘਬਰਾਓ ਨਾ। ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣਾ ਆਧਾਰ ਕਾਰਡ ਅਤੇ ਵਾਰਸਨਾਮੇ ਦੀ ਨਕਲ ਤਿਆਰ ਰੱਖੋ। 15 ਅਕਤੂਬਰ ਤੋਂ ਪਹਿਲਾਂ ਪਟਵਾਰੀ ਜਾਂ ਤਹਿਸੀਲ ਦਫ਼ਤਰ ਜਾਓ ਅਤੇ ਮੋਹਰ ਲੱਗੀ ਰਸੀਦ ਜ਼ਰੂਰ ਲਵੋ। ਕੀ ਮੈਂ ਇਹ ਜਾਣਕਾਰੀ ਤੁਹਾਡੇ ਮਦਦਗਾਰ ਨੂੰ ਭੇਜ ਦੇਵਾਂ?',
    or: 'ବ୍ୟସ୍ତ ହୁଅନ୍ତୁ ନାହିଁ। ପ୍ରଥମେ ଆପଣଙ୍କ ଆଧାର କାର୍ଡ ଏବଂ ଉତ୍ତରାଧିକାର ପ୍ରମାଣପତ୍ର ପ୍ରସ୍ତୁତ ରଖନ୍ତୁ। ୧୫ ଅକ୍ଟୋବର ପୂର୍ବରୁ ତହସିଲ କାର୍ଯ୍ୟାଳୟକୁ ଯାଇ ସିଲ୍ ଥିବା ରସିଦ ନିଶ୍ଚିତ ଭାବେ ସଂଗ୍ରହ କରନ୍ତୁ। ମୁଁ ଏହି ସୂଚନା ଆପଣଙ୍କ ବିଶ୍ୱସ୍ତ ସହାୟକଙ୍କୁ ପଠାଇବି କି?',
  };

  return answers[language] || answers.hi;
}

// Full stack support: Connect Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NyayaSaathi Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
