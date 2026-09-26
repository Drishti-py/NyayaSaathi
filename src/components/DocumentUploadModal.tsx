import React, { useState, useRef } from 'react';
import { LanguageCode } from '../types';
import { translations } from '../translations';
import {
  X,
  Upload,
  FileText,
  ShieldAlert,
  Sparkles,
  Loader2,
  Lock
} from 'lucide-react';

interface DocumentUploadModalProps {
  isOpen: boolean;
  currentLang: LanguageCode;
  onClose: () => void;
  onSelectSample: (sampleType: 'mutation_notice' | 'suspicious') => void;
  onCustomUpload: (fileData: { text?: string; imageBase64?: string; fileName: string }) => void;
  isLoading: boolean;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  currentLang,
  onClose,
  onSelectSample,
  onCustomUpload,
  isLoading,
}) => {
  const t = translations[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [manualText, setManualText] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onCustomUpload({
        imageBase64: base64,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleManualSubmit = () => {
    if (!manualText.trim()) return;
    onCustomUpload({
      text: manualText.trim(),
      fileName: 'User_Notice_Text.txt',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-amber-200 overflow-y-auto max-h-[90vh] relative space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-bold font-serif text-amber-950">
              {t.uploadModal.title}
            </h2>
            <p className="text-xs md:text-sm text-amber-800">
              {t.uploadModal.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 rounded-full hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading Overlay when Gemini is analyzing */}
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center relative">
              <Loader2 className="w-8 h-8 animate-spin text-amber-700" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-amber-950">
                {t.uploadModal.analyzingMessage}
              </h3>
              <p className="text-xs text-amber-800/80">
                {t.uploadModal.analyzingSubtext}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Privacy Shield Box */}
            <div className="rounded-2xl bg-amber-50 border border-amber-300/80 p-3.5 flex items-start gap-3 text-xs text-amber-900">
              <Lock className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
              <div>
                <span>{t.uploadModal.privacyNote}</span>
              </div>
            </div>

            {/* Quick 1-Click Demo Samples */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.uploadModal.chooseSamplePrompt}</span>
              </div>

              {/* Sample 1: Land Mutation Notice */}
              <div
                onClick={() => onSelectSample('mutation_notice')}
                className="p-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100 hover:border-emerald-500 cursor-pointer transition-all flex items-start justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-emerald-950 group-hover:text-emerald-900">
                      {t.uploadModal.sample1Title}
                    </span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                      {t.uploadModal.sample1Badge}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900/80">
                    {t.uploadModal.sample1Desc}
                  </p>
                </div>
                <div className="shrink-0 p-2 bg-emerald-200/80 rounded-xl text-emerald-900 group-hover:bg-emerald-300">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              {/* Sample 2: Suspicious Notice */}
              <div
                onClick={() => onSelectSample('suspicious')}
                className="p-4 rounded-2xl border-2 border-orange-300 bg-orange-50/70 hover:bg-orange-100 hover:border-orange-500 cursor-pointer transition-all flex items-start justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-orange-950 group-hover:text-orange-900">
                      {t.uploadModal.sample2Title}
                    </span>
                    <span className="text-[10px] bg-orange-200 text-orange-900 font-bold px-2 py-0.5 rounded-full">
                      {t.uploadModal.sample2Badge}
                    </span>
                  </div>
                  <p className="text-xs text-orange-900/80">
                    {t.uploadModal.sample2Desc}
                  </p>
                </div>
                <div className="shrink-0 p-2 bg-orange-200/80 rounded-xl text-orange-900 group-hover:bg-orange-300">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Custom File Upload Option */}
            <div className="pt-2 border-t border-amber-100 space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-2xl p-5 text-center cursor-pointer bg-amber-50/40 hover:bg-amber-100/50 transition-colors flex flex-col items-center justify-center gap-2"
              >
                <Upload className="w-6 h-6 text-amber-700" />
                <span className="text-sm font-bold text-amber-950">
                  {t.uploadModal.chooseFile}
                </span>
                <span className="text-xs text-amber-800/70">
                  {t.uploadModal.fileTypesHint}
                </span>
              </div>

              {/* Or manual text entry toggle */}
              <div className="text-center">
                <button
                  onClick={() => setShowManualInput(!showManualInput)}
                  className="text-xs text-amber-800 hover:text-amber-950 underline font-medium cursor-pointer"
                >
                  {showManualInput
                    ? t.uploadModal.closeManualPrompt
                    : t.uploadModal.pasteManualPrompt}
                </button>
              </div>

              {showManualInput && (
                <div className="space-y-2 pt-2 animate-in fade-in">
                  <textarea
                    value={manualText}
                    onChange={(e) => setManualText(e.target.value)}
                    placeholder={t.uploadModal.manualPlaceholder}
                    rows={4}
                    className="w-full text-xs md:text-sm p-3 border border-amber-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={handleManualSubmit}
                    disabled={!manualText.trim()}
                    className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs md:text-sm font-bold shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    {t.uploadModal.manualSubmitBtn}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
