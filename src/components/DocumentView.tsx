import React, { useState } from 'react';
import { DocumentItem, LanguageCode } from '../types';
import { translations } from '../translations';
import { SafetyScreeningCard } from './SafetyScreeningCard';
import { PageVoiceGuideButton } from './PageVoiceGuideButton';
import { voiceService, startVoiceRecognition } from '../services/voiceService';
import {
  Volume2,
  VolumeX,
  Mic,
  Send,
  Calendar,
  Hash,
  FileText,
  Shield,
  ArrowRight,
  Sparkles,
  Info,
  Loader2,
  FolderArchive
} from 'lucide-react';

interface DocumentViewProps {
  document: DocumentItem;
  currentLang: LanguageCode;
  onStartProcess: (doc: DocumentItem) => void;
  onAttachRecordPrompt: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isSlowerSpeed: boolean;
  onToggleSpeed: () => void;
  onTriggerPageExplanation: (text: string) => void;
}

export const DocumentView: React.FC<DocumentViewProps> = ({
  document,
  currentLang,
  onStartProcess,
  onAttachRecordPrompt,
  isSpeaking,
  isPaused,
  isSlowerSpeed,
  onToggleSpeed,
  onTriggerPageExplanation,
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'explanation' | 'safety' | 'original'>('explanation');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [chatAnswers, setChatAnswers] = useState<Array<{ q: string; a: string }>>([]);
  const [isListeningMic, setIsListeningMic] = useState(false);

  const { analysis } = document;

  // Read the full explanation aloud in the user's language
  const handleReadAloud = () => {
    if (isReadingAloud) {
      voiceService.stop();
      setIsReadingAloud(false);
      return;
    }

    const script = `${analysis.whatIsThis}. ${analysis.meaningSimple}. ${analysis.actionableSteps.join('. ')}. ${
      analysis.importantDates.length > 0
        ? `${t.docView.importantDates}: ${analysis.importantDates[0].date}.`
        : ''
    }`;

    setIsReadingAloud(true);
    voiceService.speak(script, currentLang, isSlowerSpeed ? 0.8 : 0.95, () => {
      setIsReadingAloud(false);
    });
  };

  // Ask question to NyayaSaathi
  const handleAskQuestion = async (queryText?: string) => {
    const questionToAsk = queryText || userQuestion;
    if (!questionToAsk.trim()) return;

    setIsAsking(true);
    try {
      const response = await fetch('/api/ask-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionToAsk,
          context: analysis,
          language: currentLang,
        }),
      });

      const result = await response.json();
      let answer = result.answer;

      if (!answer) {
        const fallbackAnswers: Record<LanguageCode, string> = {
          hi: 'घबराइए मत। सबसे पहले अपने पास आधार कार्ड और जमीन के कागजात रखें। 15 अक्टूबर से पहले अपने गांव के तलाटी या तहसील कार्यालय जाएं और जमा करने के बाद मुहरबंद रसीद अवश्य लें।',
          en: 'Do not worry. Prepare your identity proof and succession tree certificate copy. Visit the Talati or Tehsil office before 15 October, and always obtain a stamped acknowledgment slip.',
          gu: 'ચિંતા કરશો નહીં. સૌથી પહેલા તમારું આધાર કાર્ડ અને પેઢીનામાની નકલ તૈયાર રાખો. ૧૫ ઓક્ટોબર પહેલા તમારા ગામના તલાટી કચેરીએ જાવ અને કાગળ આપ્યા પછી સિક્કાવાળી પહોંચ લેવાનું ક્યારેય ચૂકશો નહીં.',
          bn: 'চিন্তা করবেন না। প্রথমে আপনার আধার কার্ড ও ওয়ারিশান সনদের কপি প্রস্তুত রাখুন। ১৫ অক্টোবরের আগে তহশিল অফিসে যোগাযোগ করুন এবং জমা দেওয়ার পর সিলমোহরযুক্ত রসিদ অবশ্যই গ্রহণ করুন।',
          mr: 'काळजी करू नका. सर्वात आधी आपले आधार कार्ड आणि वारस दाखला जवळ ठेवा. १५ ऑक्टोबरच्या आधी तलाठी कार्यालयात संपर्क साधा आणि अर्ज दिल्यावर शिक्का असलेली पोचपावती अवश्य घ्या.',
          ta: 'கவலைப்பட வேண்டாம். முதலில் உங்கள் ஆதார் அட்டை மற்றும் வாரிசு சான்றிதழை தயாராக வைத்திருக்கவும். அக்டோபர் 15-க்கு முன் கிராம நிர்வாக அலுவலகத்தை அணுகி, முத்திரையிடப்பட்ட ரசீதை தவறாமல் பெற்றுக்கொள்ளவும்.',
          te: 'ఆందోళన చెందవద్దు. ముందుగా మీ ఆధార్ కార్డు మరియు వారసత్వ పత్రాలను సిద్ధంగా ఉంచుకోండి. అక్టోబర్ 15 లోపు తహశీల్దార్ లేదా రెవెన్యూ కార్యాలయానికి వెళ్లి, స్టాంప్ వేసిన రసీదును తప్పనిసరిగా తీసుకోండి.',
          kn: 'ಚಿಂತಿಸಬೇಡಿ. ಮೊದಲಿಗೆ ನಿಮ್ಮ ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ವಾರಸುದಾರಿಕೆ ಪತ್ರವನ್ನು ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ. ಅಕ್ಟೋಬರ್ 15 ರೊಳಗೆ ಕಂದಾಯ ಕಚೇರಿಗೆ ತೆರಳಿ, ಮೊಹರು ಮಾಡಿದ ಸ್ವೀಕೃತಿ ರಸೀದಿಯನ್ನು ತಪ್ಪದೇ ಪಡೆದುಕೊಳ್ಳಿ.',
          ml: 'ആശങ്കപ്പെടേണ്ടതില്ല. ആദ്യം നിങ്ങളുടെ ആധാർ കാർഡും അവകാശ സർട്ടിഫിക്കറ്റും തയ്യാറാക്കി വെയ്ക്കുക. ഒക്ടോബർ 15-ന് മുൻപായി വില്ലേജ് ഓഫീസിൽ പോയി മുദ്ര പതിപ്പിച്ച രസീത് വാങ്ങുക.',
          pa: 'ਘਬਰਾਓ ਨਾ। ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਆਪਣਾ ਆਧਾਰ ਕਾਰਡ ਅਤੇ ਵਾਰਸਨਾਮੇ ਦੀ ਨਕਲ ਤਿਆਰ ਰੱਖੋ। 15 ਅਕਤੂਬਰ ਤੋਂ ਪਹਿਲਾਂ ਪਟਵਾਰੀ ਜਾਂ ਤਹਿਸੀਲ ਦਫ਼ਤਰ ਜਾਓ ਅਤੇ ਮੋਹਰ ਲੱਗੀ ਰਸੀਦ ਜ਼ਰੂਰ ਲਵੋ।',
          or: 'ବ୍ୟସ୍ତ ହୁଅନ୍ତୁ ନାହିଁ। ପ୍ରଥମେ ଆପଣଙ୍କ ଆଧାର କାର୍ଡ ଏବଂ ଉତ୍ତରାଧିକାର ପ୍ରମାଣପତ୍ର ପ୍ରସ୍ତୁତ ରଖନ୍ତୁ। ୧୫ ଅକ୍ଟୋବର ପୂର୍ବରୁ ତହସିଲ କାର୍ଯ୍ୟାଳୟକୁ ଯାଇ ସିଲ୍ ଥିବା ରସିଦ ନିଶ୍ଚିତ ଭାବେ ସଂଗ୍ରହ କରନ୍ତୁ।',
        };
        answer = fallbackAnswers[currentLang] || fallbackAnswers.hi;
      }

      setChatAnswers((prev) => [...prev, { q: questionToAsk, a: answer }]);
      setUserQuestion('');

      // Automatically speak the response
      voiceService.speak(answer, currentLang, isSlowerSpeed ? 0.8 : 0.95);
    } catch (err) {
      console.error('Failed to get answer:', err);
    } finally {
      setIsAsking(false);
    }
  };

  // Voice Speech Recognition
  const handleStartMic = () => {
    if (isListeningMic) return;
    setIsListeningMic(true);

    const recognizer = startVoiceRecognition(
      currentLang,
      (transcript) => {
        setIsListeningMic(false);
        setUserQuestion(transcript);
        handleAskQuestion(transcript);
      },
      () => {
        setIsListeningMic(false);
      }
    );

    if (!recognizer) {
      setIsListeningMic(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Persistent Page-Level Voice Assistance Control */}
      <PageVoiceGuideButton
        currentLang={currentLang}
        pageKey="docDetail"
        isSpeaking={isSpeaking}
        isPaused={isPaused}
        isSlowerSpeed={isSlowerSpeed}
        onToggleSpeed={onToggleSpeed}
        onTriggerExplanation={onTriggerPageExplanation}
      />

      {/* Top Banner / Document Title Card */}
      <div className="bg-amber-100/90 rounded-3xl p-5 md:p-6 border border-amber-300 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2.5 py-0.5 rounded-full">
              {document.uploadedAt}
            </span>
            {document.isDemoNotice && (
              <span className="text-xs bg-orange-100 text-orange-900 font-bold px-2.5 py-0.5 rounded-full border border-orange-300">
                {t.docView.fictionalNoticeBadge}
              </span>
            )}
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-amber-950">
            {document.title}
          </h1>
          <p className="text-xs md:text-sm text-amber-900/80">
            {t.docView.fictionalNoticeNote}
          </p>
        </div>

        {/* Action: Read Aloud & Start Process */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={handleReadAloud}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-xs transition-all cursor-pointer ${
              isReadingAloud
                ? 'bg-amber-700 text-white animate-pulse'
                : 'bg-white hover:bg-amber-50 text-amber-950 border border-amber-300'
            }`}
          >
            {isReadingAloud ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>{t.docView.stopListening}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-700" />
                <span>{t.docView.listenExplanation}</span>
              </>
            )}
          </button>

          <button
            onClick={() => onStartProcess(document)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs md:text-sm shadow-xs transition-all cursor-pointer"
          >
            <span>{t.docView.startJourneyBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Explanation / Safety Screening / Original) */}
      <div className="flex border-b border-amber-200 gap-2">
        <button
          onClick={() => setActiveTab('explanation')}
          className={`pb-3 px-4 text-xs md:text-sm font-bold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'explanation'
              ? 'border-amber-700 text-amber-950'
              : 'border-transparent text-amber-900/60 hover:text-amber-950'
          }`}
        >
          {t.docView.tabAnalysis}
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`pb-3 px-4 text-xs md:text-sm font-bold transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'safety'
              ? 'border-amber-700 text-amber-950'
              : 'border-transparent text-amber-900/60 hover:text-amber-950'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>{t.docView.tabSafety}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </button>
        <button
          onClick={() => setActiveTab('original')}
          className={`pb-3 px-4 text-xs md:text-sm font-bold transition-colors border-b-2 cursor-pointer ${
            activeTab === 'original'
              ? 'border-amber-700 text-amber-950'
              : 'border-transparent text-amber-900/60 hover:text-amber-950'
          }`}
        >
          {t.docView.tabOriginal}
        </button>
      </div>

      {/* Tab 1: Simple Explanation Content */}
      {activeTab === 'explanation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: What is this? */}
            <div className="bg-white rounded-2xl p-5 border border-amber-200/90 shadow-xs space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                {t.docView.whatIsThis}
              </span>
              <p className="text-base md:text-lg font-bold text-amber-950">
                {analysis.whatIsThis}
              </p>
              <div className="pt-2 text-xs text-amber-900/70 border-t border-amber-100 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {t.docView.issuingAuthority}: <strong className="text-amber-950">{analysis.issuingAuthority}</strong>
                </span>
              </div>
            </div>

            {/* Card 2: Simple Meaning */}
            <div className="bg-white rounded-2xl p-5 border border-amber-200/90 shadow-xs space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                {t.docView.meaningSimple}
              </span>
              <p className="text-sm md:text-base text-amber-950 leading-relaxed font-medium">
                {analysis.meaningSimple}
              </p>
            </div>
          </div>

          {/* Actionable Steps (What do I need to do?) */}
          <div className="bg-emerald-50/70 rounded-2xl p-5 md:p-6 border border-emerald-200 space-y-3">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
              {t.docView.actionableSteps}
            </span>
            <div className="space-y-2.5">
              {analysis.actionableSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white/90 p-3 rounded-xl border border-emerald-200/80">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-sm md:text-base text-emerald-950 font-medium">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Dates & Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Dates */}
            <div className="bg-blue-50/70 rounded-2xl p-5 border border-blue-200 space-y-3">
              <div className="flex items-center gap-2 text-blue-900">
                <Calendar className="w-4 h-4 text-blue-700" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {t.docView.importantDates}
                </span>
              </div>
              <div className="space-y-2">
                {analysis.importantDates.map((d, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-blue-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-blue-800/80 font-medium">{d.label}</div>
                      <div className="text-base font-bold text-blue-950 font-mono">{d.date}</div>
                    </div>
                    {d.isUrgent && (
                      <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full border border-red-200">
                        {t.docView.urgentBadge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Numbers */}
            <div className="bg-teal-50/70 rounded-2xl p-5 border border-teal-200 space-y-3">
              <div className="flex items-center gap-2 text-teal-900">
                <Hash className="w-4 h-4 text-teal-700" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {t.docView.importantNumbers}
                </span>
              </div>
              <div className="space-y-2">
                {analysis.importantNumbers.map((num, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-teal-200/80">
                    <div className="text-xs text-teal-800/80 font-medium">{num.label}</div>
                    <div className="text-sm md:text-base font-mono font-bold text-teal-950">{num.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What to Keep */}
          <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900">
              <FolderArchive className="w-4 h-4 text-amber-700" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {t.docView.whatToKeep}
              </span>
            </div>
            <ul className="list-disc list-inside text-xs md:text-sm text-amber-950 space-y-1 font-medium">
              {analysis.whatToKeep.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Interactive "Ask NyayaSaathi" Section */}
          <div className="bg-white rounded-3xl p-5 md:p-6 border-2 border-amber-300 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="text-base md:text-lg font-bold font-serif text-amber-950">
                  {t.docView.askNyayaSaathi}
                </h3>
              </div>
              <span className="text-xs text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full font-medium">
                Gemini
              </span>
            </div>

            {/* Quick Prompt Chip */}
            <div>
              <button
                onClick={() => handleAskQuestion(t.docView.askSampleQuestion.replace('👉 ', ''))}
                className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-xs md:text-sm font-bold border border-amber-300 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{t.docView.askSampleQuestion}</span>
              </button>
            </div>

            {/* Question Input with Mic & Send */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                placeholder={t.docView.askPlaceholder}
                className="flex-1 text-xs md:text-sm p-3 rounded-xl border border-amber-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
              />

              <button
                onClick={handleStartMic}
                className={`p-3 rounded-xl transition-colors cursor-pointer ${
                  isListeningMic
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                }`}
                title="Speak question"
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleAskQuestion()}
                disabled={isAsking || !userQuestion.trim()}
                className="px-4 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs md:text-sm font-bold shadow-xs disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                {isAsking ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>{t.docView.askButton}</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Conversational Answers Stream */}
            {chatAnswers.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-amber-100">
                {chatAnswers.map((chat, idx) => (
                  <div key={idx} className="space-y-1.5 animate-in fade-in">
                    <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <span>👤 {chat.q}</span>
                    </div>
                    <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200/80 text-xs md:text-sm text-amber-950 font-medium flex items-start justify-between gap-3">
                      <p className="leading-relaxed">{chat.a}</p>
                      <button
                        onClick={() => voiceService.speak(chat.a, currentLang, isSlowerSpeed ? 0.8 : 0.95)}
                        className="p-1 rounded-md text-amber-700 hover:bg-amber-200 shrink-0 cursor-pointer"
                        title="Listen to answer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Document Safety Screening */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          <SafetyScreeningCard
            screening={analysis.safetyScreening}
            currentLang={currentLang}
          />
        </div>
      )}

      {/* Tab 3: Original Document Preview (Kept as authentic physical artifact as specified) */}
      {activeTab === 'original' && (
        <div className="bg-white rounded-3xl p-6 border border-amber-200 space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-800" />
              <span className="font-bold text-amber-950 text-sm md:text-base font-mono">
                {document.originalFileName}
              </span>
            </div>
            <span className="text-xs text-amber-800 font-medium">
              {t.docView.originalDocSafeNotice}
            </span>
          </div>

          {/* Visual Document Layout Mockup (Original Artifact) */}
          <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-6 font-serif text-stone-900 space-y-4 max-w-2xl mx-auto shadow-inner">
            <div className="text-center border-b border-stone-300 pb-3 space-y-1">
              <div className="text-xs tracking-widest text-stone-600 uppercase font-bold">
                REVENUE DEPARTMENT — PUBLIC SUCCESSION NOTICE
              </div>
              <div className="text-lg font-bold text-stone-900">
                {analysis.issuingAuthority}
              </div>
              <div className="text-xs text-stone-600">
                STATUTORY SUCCESSION NOTICE FORM 135-D
              </div>
            </div>

            <div className="text-xs space-y-2 leading-relaxed text-stone-800">
              <p>
                Notice is hereby given that an application has been received regarding succession and title mutation for agricultural survey parcel No. 142/3.
              </p>
              <p>
                Any co-holder, legal heir, or interested party having objections may file written evidence at the revenue office within 15 days of this notice.
              </p>
              <p className="font-bold">
                No objections will be entertained after the statutory deadline.
              </p>
            </div>

            <div className="pt-6 flex justify-between items-end text-xs text-stone-700">
              <div>
                <div>Date: 24/09/2026</div>
                <div>Notice No: REV/2026/8492</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 border border-stone-400 rounded-full flex items-center justify-center text-[10px] text-stone-500 mx-auto">
                  [OFFICIAL SEAL]
                </div>
                <div className="mt-1 font-bold">Talati-cum-Mantri</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
