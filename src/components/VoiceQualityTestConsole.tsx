import React, { useState, useEffect } from 'react';
import { LanguageCode } from '../types';
import { languageConfig, SUPPORTED_LANGUAGE_CODES } from '../config/languageConfig';
import { voiceService, VoiceStatusEvent } from '../services/voiceService';
import {
  Volume2,
  Play,
  Pause,
  Square,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Sliders,
  Sparkles,
  Info,
  X,
} from 'lucide-react';

interface VoiceQualityTestConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  activeLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
}

export const VoiceQualityTestConsole: React.FC<VoiceQualityTestConsoleProps> = ({
  isOpen,
  onClose,
  activeLanguage,
  onSelectLanguage,
}) => {
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(activeLanguage);
  const [customSentence, setCustomSentence] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeProvider, setActiveProvider] = useState('');
  const [speed, setSpeed] = useState<number>(0.95);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const currentCfg = languageConfig[selectedLang];

  useEffect(() => {
    setSelectedLang(activeLanguage);
    setCustomSentence(languageConfig[activeLanguage].testSentence);
  }, [activeLanguage]);

  useEffect(() => {
    setCustomSentence(currentCfg.testSentence);
    setWarningMessage(null);
  }, [selectedLang]);

  useEffect(() => {
    const unsubscribe = voiceService.subscribe((event: VoiceStatusEvent) => {
      setIsPlaying(event.isSpeaking);
      setIsPaused(event.isPaused);
      if (event.provider) {
        setActiveProvider(event.provider);
      }
      if (event.warning) {
        setWarningMessage(event.warning);
      }
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const handlePlay = () => {
    setWarningMessage(null);
    const textToSpeak = customSentence.trim() || currentCfg.testSentence;

    if (!currentCfg.isVoiceSupported) {
      setWarningMessage(
        `Native-speaker voice synthesis for ${currentCfg.name} is currently in active development. Text explanation is fully supported without fallback to English.`
      );
      return;
    }

    voiceService.speak(textToSpeak, selectedLang, speed, () => {
      setIsPlaying(false);
      setIsPaused(false);
    });
  };

  const handlePause = () => {
    voiceService.pause();
  };

  const handleResume = () => {
    voiceService.resume();
  };

  const handleStop = () => {
    voiceService.stop();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-stone-50 rounded-3xl max-w-2xl w-full p-5 md:p-7 shadow-2xl border border-amber-300 max-h-[92vh] flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-900/10">
              <Volume2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base md:text-lg font-bold font-serif text-stone-900">
                  Native-Speaker Voice Quality Console
                </h2>
                <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                  Quality Audit
                </span>
              </div>
              <p className="text-xs text-stone-600">
                Verify authentic Indian pronunciation, cadence, and zero English-accent fallback.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              voiceService.stop();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content scroll area */}
        <div className="overflow-y-auto space-y-4 pr-1 flex-1">
          {/* Language Selector Pills */}
          <div>
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
              Select Language to Evaluate:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SUPPORTED_LANGUAGE_CODES.map((code) => {
                const item = languageConfig[code];
                const isSelected = code === selectedLang;
                return (
                  <button
                    key={code}
                    onClick={() => {
                      voiceService.stop();
                      setSelectedLang(code);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-800 text-white shadow-sm ring-2 ring-amber-400'
                        : 'bg-white hover:bg-amber-100 text-stone-800 border border-stone-200'
                    }`}
                  >
                    <span>{item.nativeName}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                      ({item.name})
                    </span>
                    {item.isVoiceSupported ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model & Voice Configuration Card */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-500 block">Evaluated Language:</span>
                <strong className="text-stone-900 text-sm">
                  {currentCfg.nativeName} ({currentCfg.name})
                </strong>
                <span className="text-[11px] text-stone-500 block">
                  Locale Tag: {currentCfg.speechLanguage}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block">TTS Voice / Model Engine:</span>
                <strong className="text-emerald-900 text-xs font-mono block">
                  {activeProvider || currentCfg.voiceProviderDescription}
                </strong>
              </div>
            </div>

            {/* Support Level Badge */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                {currentCfg.isVoiceSupported ? (
                  <div className="flex items-center gap-1 text-emerald-800 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{currentCfg.voiceStatusLabel}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-amber-900 font-bold text-xs bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-300">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>{currentCfg.voiceStatusLabel}</span>
                  </div>
                )}
              </div>

              {/* Set as Active App Language Button */}
              {selectedLang !== activeLanguage && (
                <button
                  onClick={() => {
                    onSelectLanguage(selectedLang);
                  }}
                  className="text-xs text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
                >
                  Set as App Language
                </button>
              )}
            </div>
          </div>

          {/* Warning Banner if Voice in Development (e.g. Odia) */}
          {warningMessage && (
            <div className="rounded-2xl bg-amber-50 border border-amber-300 p-3.5 flex items-start gap-2.5 text-xs text-amber-900 animate-in fade-in duration-200">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Notice: </strong>
                <span>{warningMessage}</span>
              </div>
            </div>
          )}

          {/* Test Sentence Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Test Sentence (Editable):</span>
              </label>
              <button
                onClick={() => setCustomSentence(currentCfg.testSentence)}
                className="text-[11px] text-amber-800 hover:underline cursor-pointer"
              >
                Reset to Default Sentence
              </button>
            </div>
            <textarea
              value={customSentence}
              onChange={(e) => setCustomSentence(e.target.value)}
              rows={3}
              className="w-full p-3 text-sm border border-stone-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium text-stone-900 leading-relaxed"
            />
          </div>

          {/* Speed Selector */}
          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-stone-200 text-xs">
            <div className="flex items-center gap-2 text-stone-700 font-medium">
              <Sliders className="w-4 h-4 text-stone-500" />
              <span>Speech Rate:</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[0.8, 0.95, 1.1].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    speed === s
                      ? 'bg-amber-700 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {s === 0.8 ? 'Slow (0.8x)' : s === 0.95 ? 'Normal (0.95x)' : 'Fast (1.1x)'}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Quality Acceptance Criteria Checklist */}
          <div className="bg-stone-100/80 rounded-2xl p-3 border border-stone-200/80 text-[11px] text-stone-700 space-y-1">
            <span className="font-bold text-stone-900 block">
              Native-Speaker Acceptance Criteria for {currentCfg.name}:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-stone-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Native vowel & consonant phonemes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Natural conversational rhythm & pauses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Zero letter-by-letter reading</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Zero English-accented fallback</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Playback Controls */}
        <div className="border-t border-amber-200 pt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {isPlaying && (
              <div className="flex items-center gap-1 text-xs text-amber-800 font-bold bg-amber-100 px-2 py-1 rounded-lg">
                <Radio className="w-3.5 h-3.5 animate-pulse text-amber-700" />
                <span>{isPaused ? 'Paused' : 'Playing Audio...'}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isPlaying && !isPaused ? (
              <button
                onClick={handlePause}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </button>
            ) : isPaused ? (
              <button
                onClick={handleResume}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={handlePlay}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs md:text-sm font-bold shadow-md shadow-amber-900/10 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play Native Speech</span>
              </button>
            )}

            {isPlaying && (
              <button
                onClick={handleStop}
                className="p-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 cursor-pointer transition-colors"
                title="Stop Audio"
              >
                <Square className="w-4 h-4 fill-current" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
