import React, { useState } from 'react';
import { LanguageCode, SUPPORTED_LANGUAGES, LanguageInfo } from '../types';
import { translations } from '../translations';
import { Languages, X, Check, Search } from 'lucide-react';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  currentLang: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onClose: () => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  currentLang,
  onSelectLanguage,
  onClose,
}) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(
    (l) =>
      l.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-7 shadow-2xl border border-amber-200 space-y-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <Languages className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold font-serif text-amber-950">
                {t.languageSelector.selectLanguageTitle}
              </h3>
              <p className="text-xs text-amber-800">
                {t.languageSelector.currentLanguageLabel}{' '}
                <strong className="text-amber-950">
                  {SUPPORTED_LANGUAGES.find((l) => l.code === currentLang)?.nativeName} (
                  {SUPPORTED_LANGUAGES.find((l) => l.code === currentLang)?.englishName})
                </strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-amber-100 text-amber-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.languageSelector.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 text-xs md:text-sm border border-amber-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Language Options Grid */}
        <div className="overflow-y-auto space-y-1.5 flex-1 pr-1">
          {filteredLanguages.map((lang: LanguageInfo) => {
            const isSelected = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-700 text-white border-amber-700 font-bold shadow-xs'
                    : 'bg-stone-50 hover:bg-amber-100/70 text-stone-900 border-stone-200'
                }`}
              >
                <div>
                  <div className="text-sm md:text-base font-semibold">
                    {lang.nativeName}
                  </div>
                  <div className={`text-xs ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                    {lang.englishName}
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-white text-amber-800 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
