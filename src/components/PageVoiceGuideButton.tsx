import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { translations } from '../translations';
import { voiceService } from '../services/voiceService';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Turtle,
  Zap,
  HelpCircle,
  MessageCircle,
  Sparkles,
  X
} from 'lucide-react';

interface PageVoiceGuideButtonProps {
  currentLang: LanguageCode;
  pageKey: 'home' | 'documents' | 'process' | 'records' | 'tasks' | 'helpers' | 'docDetail';
  isSpeaking: boolean;
  isPaused: boolean;
  isSlowerSpeed: boolean;
  onToggleSpeed: () => void;
  onTriggerExplanation: (textToSpeak: string) => void;
  onHighlightElement?: (elementId: string | null) => void;
}

export const PageVoiceGuideButton: React.FC<PageVoiceGuideButtonProps> = ({
  currentLang,
  pageKey,
  isSpeaking,
  isPaused,
  isSlowerSpeed,
  onToggleSpeed,
  onTriggerExplanation,
  onHighlightElement,
}) => {
  const t = translations[currentLang];
  const explanationText = t.pageExplaining[pageKey];

  const [showInterruptionModal, setShowInterruptionModal] = useState(false);
  const [interruptionQuestion, setInterruptionQuestion] = useState('');
  const [interruptionAnswer, setInterruptionAnswer] = useState<string | null>(null);

  const handleExplain = () => {
    onTriggerExplanation(explanationText);

    // Contextual highlighting based on page
    if (pageKey === 'home' && onHighlightElement) {
      onHighlightElement('card-received-doc');
    } else if (pageKey === 'process' && onHighlightElement) {
      onHighlightElement('process-current-step');
    }
  };

  const handleAskInterruption = (query?: string) => {
    const q = query || interruptionQuestion;
    if (!q.trim()) return;

    // Simple, plain-language definitions
    let ans = '';
    if (currentLang === 'hi') {
      ans = 'दस्तावेज़ का मतलब कोई भी सरकारी कागज़, नोटिस, रसीद या पट्टा है जो सरकार या कचहरी से मिलता है।';
    } else if (currentLang === 'gu') {
      ans = 'દસ્તાવેજ એટલે કોઈપણ સરકારી કાગળ, નોટિસ, પાવતી કે જમીનની પહોંચ જે કચેરીમાંથી મળે છે.';
    } else if (currentLang === 'bn') {
      ans = 'দলিল বা নথি হলো যেকোনো সরকারি কাগজ, নোটিশ বা রশিদ যা সরকারি কার্যালয় থেকে দেওয়া হয়।';
    } else {
      ans = 'A document is any official government paper, notice, receipt, or title slip issued by an official office.';
    }

    setInterruptionAnswer(ans);
    voiceService.speak(ans, currentLang, isSlowerSpeed ? 0.8 : 0.95);
  };

  return (
    <div className="bg-amber-100/90 rounded-2xl p-3 border border-amber-300 shadow-xs flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
      {/* Primary "Explain this page" button */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleExplain}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-xs transition-all cursor-pointer ${
            isSpeaking && !isPaused
              ? 'bg-amber-700 text-white ring-2 ring-amber-400 animate-pulse'
              : 'bg-amber-600 hover:bg-amber-500 text-white'
          }`}
          title={t.explainThisPage}
        >
          <Volume2 className="w-4 h-4" />
          <span>{t.explainThisPage}</span>
        </button>

        <span className="text-xs text-amber-900 font-medium hidden sm:inline">
          {t.canIExplainPrompt}
        </span>
      </div>

      {/* Voice Controls & Interruption Help */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Speed toggle */}
        <button
          onClick={onToggleSpeed}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            isSlowerSpeed
              ? 'bg-amber-700 text-white'
              : 'bg-white hover:bg-amber-200/80 text-amber-900 border border-amber-300'
          }`}
          title="Toggle speech rate"
        >
          {isSlowerSpeed ? (
            <>
              <Turtle className="w-3.5 h-3.5" />
              <span>{t.voiceGuideSlower}</span>
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5" />
              <span>{t.voiceGuideNormal}</span>
            </>
          )}
        </button>

        {/* Word/Term explanation helper */}
        <button
          onClick={() => setShowInterruptionModal(!showInterruptionModal)}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-amber-200/80 text-amber-900 rounded-lg text-xs font-semibold border border-amber-300 cursor-pointer"
          title={t.interruptionAskTitle}
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
          <span>{t.interruptionAskTitle}</span>
        </button>

        {/* Stop speech if active */}
        {isSpeaking && (
          <button
            onClick={() => voiceService.stop()}
            className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 transition-colors cursor-pointer"
            title={t.voiceGuideStop}
          >
            <VolumeX className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Interruption / Word Definition Popover */}
      {showInterruptionModal && (
        <div className="w-full mt-2 pt-2 border-t border-amber-200/80 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-bold text-amber-950">
            <span>{t.interruptionAskTitle}</span>
            <button
              onClick={() => {
                setShowInterruptionModal(false);
                setInterruptionAnswer(null);
              }}
              className="text-amber-800 hover:text-amber-950"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={interruptionQuestion}
              onChange={(e) => setInterruptionQuestion(e.target.value)}
              placeholder={t.interruptionPlaceholder}
              className="flex-1 p-2 text-xs border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white"
            />
            <button
              onClick={() => handleAskInterruption()}
              className="px-3 py-1.5 bg-amber-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
            >
              {t.interruptionAskBtn}
            </button>
          </div>

          <div>
            <button
              onClick={() => handleAskInterruption('What does document mean?')}
              className="text-[11px] text-amber-900 underline font-semibold cursor-pointer"
            >
              {t.interruptionSampleQ}
            </button>
          </div>

          {interruptionAnswer && (
            <div className="bg-white p-3 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium">
              {interruptionAnswer}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
