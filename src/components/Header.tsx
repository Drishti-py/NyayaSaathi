import React, { useState } from 'react';
import { LanguageCode, SUPPORTED_LANGUAGES } from '../types';
import { translations } from '../translations';
import { LanguageSelectorModal } from './LanguageSelectorModal';
import { ShieldCheck, Globe, ChevronDown, Volume2 } from 'lucide-react';

interface HeaderProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onTriggerVoiceGuide: () => void;
  onOpenVoiceTester: () => void;
  isVoiceActive: boolean;
  activeNav: string;
  onNavigate: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onTriggerVoiceGuide,
  onOpenVoiceTester,
  isVoiceActive,
  activeNav,
  onNavigate,
}) => {
  const t = translations[currentLang];
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const currentLangInfo = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      <header className="bg-amber-50/95 backdrop-blur-md border-b border-amber-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Brand & Tagline */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center text-white shadow-md shadow-amber-900/10 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-amber-950 font-serif">
                {t.appName}
              </span>
              <p className="text-xs text-amber-800 line-clamp-1">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Action Controls: Explain Page & Global Language Button */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Page Voice Explanation Button */}
            <button
              onClick={onTriggerVoiceGuide}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                isVoiceActive
                  ? 'bg-amber-700 text-white ring-2 ring-amber-400 animate-pulse'
                  : 'bg-amber-600 hover:bg-amber-500 text-white'
              }`}
              title={t.explainThisPage}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isVoiceActive ? t.voiceGuideStop : t.explainThisPage}</span>
            </button>

            {/* Voice Quality & Debug Console Button */}
            <button
              onClick={onOpenVoiceTester}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 text-xs md:text-sm font-bold shadow-xs transition-colors cursor-pointer"
              title="Native Voice Quality & Pronunciation Tester"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Voice Quality</span>
              <span>Tester</span>
            </button>

            {/* Redesigned Single Language Button: Shows ONLY currently selected language */}
            <button
              onClick={() => setIsLangModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-100/80 text-amber-950 border border-amber-300 text-xs md:text-sm font-bold shadow-xs transition-colors cursor-pointer"
              title={t.languageSelector.selectLanguageTitle}
            >
              <Globe className="w-4 h-4 text-amber-700" />
              <span>{currentLangInfo.nativeName}</span>
              <span className="text-[11px] text-amber-800/80 font-normal">
                ({currentLangInfo.englishName})
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-700 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="border-t border-amber-200/60 bg-amber-100/60">
          <div className="max-w-6xl mx-auto px-4 flex overflow-x-auto no-scrollbar py-1 gap-1">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeNav === 'home'
                  ? 'bg-white text-amber-950 font-bold shadow-xs border border-amber-200'
                  : 'text-amber-900/80 hover:bg-amber-200/60'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => onNavigate('documents')}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeNav === 'documents'
                  ? 'bg-white text-amber-950 font-bold shadow-xs border border-amber-200'
                  : 'text-amber-900/80 hover:bg-amber-200/60'
              }`}
            >
              {t.nav.documents}
            </button>
            <button
              onClick={() => onNavigate('process')}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeNav === 'process'
                  ? 'bg-white text-amber-950 font-bold shadow-xs border border-amber-200'
                  : 'text-amber-900/80 hover:bg-amber-200/60'
              }`}
            >
              {t.nav.process}
            </button>
            <button
              onClick={() => onNavigate('records')}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeNav === 'records'
                  ? 'bg-white text-amber-950 font-bold shadow-xs border border-amber-200'
                  : 'text-amber-900/80 hover:bg-amber-200/60'
              }`}
            >
              {t.nav.records}
            </button>
            <button
              onClick={() => onNavigate('tasks')}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeNav === 'tasks'
                  ? 'bg-white text-amber-950 font-bold shadow-xs border border-amber-200'
                  : 'text-amber-900/80 hover:bg-amber-200/60'
              }`}
            >
              {t.nav.tasks}
            </button>
            <button
              onClick={() => onNavigate('helpers')}
              className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeNav === 'helpers'
                  ? 'bg-white text-amber-950 font-bold shadow-xs border border-amber-200'
                  : 'text-amber-900/80 hover:bg-amber-200/60'
              }`}
            >
              {t.nav.helpers}
            </button>
          </div>
        </div>
      </header>

      {/* Language Selector Modal for 11 Languages */}
      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        currentLang={currentLang}
        onSelectLanguage={onLanguageChange}
        onClose={() => setIsLangModalOpen(false)}
      />
    </>
  );
};
