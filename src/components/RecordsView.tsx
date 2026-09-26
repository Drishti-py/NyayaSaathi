import React, { useState } from 'react';
import { EvidenceRecord, LanguageCode, EvidenceLevel } from '../types';
import { translations } from '../translations';
import { PageVoiceGuideButton } from './PageVoiceGuideButton';
import {
  Plus,
  Calendar,
  AlertCircle,
  X
} from 'lucide-react';

interface RecordsViewProps {
  records: EvidenceRecord[];
  currentLang: LanguageCode;
  onAddRecord: (record: Omit<EvidenceRecord, 'id'>) => void;
  openAddModalInitially?: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  isSlowerSpeed: boolean;
  onToggleSpeed: () => void;
  onTriggerPageExplanation: (text: string) => void;
}

export const RecordsView: React.FC<RecordsViewProps> = ({
  records,
  currentLang,
  onAddRecord,
  openAddModalInitially = false,
  isSpeaking,
  isPaused,
  isSlowerSpeed,
  onToggleSpeed,
  onTriggerPageExplanation,
}) => {
  const t = translations[currentLang];
  const [isModalOpen, setIsModalOpen] = useState(openAddModalInitially);

  // Form State
  const [title, setTitle] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [sourceType, setSourceType] = useState<EvidenceRecord['sourceType']>('official_receipt');
  const [notes, setNotes] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const evidenceLevel: EvidenceLevel =
      sourceType === 'official_receipt' || sourceType === 'stamped_copy'
        ? 'official_proof'
        : sourceType === 'sms'
        ? 'official_proof'
        : 'user_record';

    onAddRecord({
      title: title.trim(),
      receiptNumber: receiptNumber.trim() || undefined,
      date,
      sourceType,
      evidenceLevel,
      notes: notes.trim() || undefined,
    });

    // Reset & close
    setTitle('');
    setReceiptNumber('');
    setNotes('');
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Persistent Page-Level Voice Assistance Control */}
      <PageVoiceGuideButton
        currentLang={currentLang}
        pageKey="records"
        isSpeaking={isSpeaking}
        isPaused={isPaused}
        isSlowerSpeed={isSlowerSpeed}
        onToggleSpeed={onToggleSpeed}
        onTriggerExplanation={onTriggerPageExplanation}
      />

      {/* Top Banner */}
      <div className="bg-amber-100/90 rounded-3xl p-5 md:p-6 border border-amber-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-amber-950">
            {t.records.title}
          </h1>
          <p className="text-xs md:text-sm text-amber-900/80">
            {t.records.subtitle}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs md:text-sm shadow-xs transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.records.addNewButton}</span>
        </button>
      </div>

      {/* Legal Proof Disclaimer Box */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-300/80 text-xs md:text-sm text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="font-medium">
          {t.records.legalProofDisclaimer}
        </p>
      </div>

      {/* Records Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {records.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs space-y-3 hover:border-amber-400 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-amber-950 font-serif">
                  {rec.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-amber-900/80 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>{rec.date}</span>
                </div>
              </div>

              {/* Evidence Level Badge */}
              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                  rec.evidenceLevel === 'official_proof'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                {rec.evidenceLevel === 'official_proof'
                  ? t.records.tierOfficial
                  : t.records.tierUserEntered}
              </span>
            </div>

            {/* Receipt Number */}
            {rec.receiptNumber && (
              <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs">
                <span className="text-amber-800 font-medium">
                  {t.records.formReceiptNo}:
                </span>
                <span className="font-mono font-bold text-amber-950">
                  {rec.receiptNumber}
                </span>
              </div>
            )}

            {/* Notes */}
            {rec.notes && (
              <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-medium">
                {rec.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Add New Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-amber-200 space-y-5">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="text-lg font-bold font-serif text-amber-950">
                {t.records.modalTitle}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-amber-100 text-amber-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs md:text-sm">
              <div className="space-y-1.5">
                <label className="font-bold text-amber-950 block">
                  {t.records.formTitle} *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.records.formTitlePlaceholder}
                  className="w-full p-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-amber-950 block">
                    {t.records.formReceiptNo}
                  </label>
                  <input
                    type="text"
                    value={receiptNumber}
                    onChange={(e) => setReceiptNumber(e.target.value)}
                    placeholder="TAL/2026/0912"
                    className="w-full p-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 font-mono bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-amber-950 block">
                    {t.records.formDate}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-amber-950 block">
                  {t.records.formType}
                </label>
                <select
                  value={sourceType}
                  onChange={(e) => setSourceType(e.target.value as any)}
                  className="w-full p-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 bg-white cursor-pointer"
                >
                  <option value="official_receipt">
                    {t.records.typeOptions.officialSlip}
                  </option>
                  <option value="sms">
                    {t.records.typeOptions.smsNotice}
                  </option>
                  <option value="stamped_copy">
                    {t.records.typeOptions.stampedCopy}
                  </option>
                  <option value="user_note">
                    {t.records.typeOptions.userNote}
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-amber-950 block">
                  {t.records.formNotes}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.records.formNotesPlaceholder}
                  className="w-full p-3 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-amber-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-amber-300 text-amber-900 font-semibold cursor-pointer"
                >
                  {t.records.cancelButton}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  {t.records.saveButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
