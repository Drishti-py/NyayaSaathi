import React from 'react';
import { LanguageCode } from '../types';
import { translations } from '../translations';
import { Volume2, Play, Pause, RotateCcw, Turtle, Zap, X } from 'lucide-react';

interface VoiceGuideBarProps {
  currentLang: LanguageCode;
  isSpeaking: boolean;
  isPaused: boolean;
  isSlowerSpeed: boolean;
  currentSpeechText: string;
  onPause: () => void;
  onResume: () => void;
  onReplay: () => void;
  onToggleSpeed: () => void;
  onStop: () => void;
}

export const VoiceGuideBar: React.FC<VoiceGuideBarProps> = ({
  currentLang,
  isSpeaking,
  isPaused,
  isSlowerSpeed,
  currentSpeechText,
  onPause,
  onResume,
  onReplay,
  onToggleSpeed,
  onStop,
}) => {
  const t = translations[currentLang];

  if (!isSpeaking && !isPaused && !currentSpeechText) {
    return null;
  }

  return (
    <div className="bg-amber-900 text-amber-50 shadow-lg border-b border-amber-700/60 sticky top-[95px] z-30 animate-in slide-in-from-top-2 duration-200">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Current speech text preview */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center shrink-0">
            <Volume2 className={`w-4 h-4 text-amber-200 ${isSpeaking && !isPaused ? 'animate-bounce' : ''}`} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                {t.appName}
              </span>
              {isPaused && (
                <span className="text-[10px] bg-amber-800 text-amber-200 px-1.5 py-0.5 rounded">
                  {t.voiceGuidePause}
                </span>
              )}
            </div>
            <p className="text-xs text-amber-100 truncate font-medium">
              {currentSpeechText || t.pageExplaining.home}
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Pause / Resume */}
          {isPaused ? (
            <button
              onClick={onResume}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
              title={t.voiceGuideResume}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{t.voiceGuideResume}</span>
            </button>
          ) : (
            <button
              onClick={onPause}
              className="flex items-center gap-1 px-3 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
              title={t.voiceGuidePause}
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>{t.voiceGuidePause}</span>
            </button>
          )}

          {/* Replay */}
          <button
            onClick={onReplay}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-800 hover:bg-amber-700 text-amber-200 hover:text-white rounded-lg text-xs font-medium cursor-pointer"
            title={t.voiceGuideReplay}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t.voiceGuideReplay}</span>
          </button>

          {/* Speed Toggle (Turtle / Normal) */}
          <button
            onClick={onToggleSpeed}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              isSlowerSpeed
                ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                : 'bg-amber-800 hover:bg-amber-700 text-amber-200'
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

          {/* Close / Stop */}
          <button
            onClick={onStop}
            className="p-1.5 rounded-lg bg-amber-800/80 hover:bg-amber-700 text-amber-300 hover:text-white cursor-pointer"
            title={t.voiceGuideStop}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
