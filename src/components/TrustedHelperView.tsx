import React, { useState } from 'react';
import { TrustedHelper, LanguageCode } from '../types';
import { translations } from '../translations';
import { PageVoiceGuideButton } from './PageVoiceGuideButton';
import {
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Share2,
  Sparkles,
  Phone
} from 'lucide-react';

interface TrustedHelperViewProps {
  helper: TrustedHelper;
  currentLang: LanguageCode;
  onApproveAction: (actionId: string) => void;
  onRejectAction: (actionId: string) => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isSlowerSpeed: boolean;
  onToggleSpeed: () => void;
  onTriggerPageExplanation: (text: string) => void;
}

export const TrustedHelperView: React.FC<TrustedHelperViewProps> = ({
  helper,
  currentLang,
  onApproveAction,
  onRejectAction,
  isSpeaking,
  isPaused,
  isSlowerSpeed,
  onToggleSpeed,
  onTriggerPageExplanation,
}) => {
  const t = translations[currentLang];
  const [showHelperSummary, setShowHelperSummary] = useState(false);
  const [approvalDecision, setApprovalDecision] = useState<'pending' | 'approved' | 'rejected'>(
    helper.pendingApproval ? helper.pendingApproval.status : 'pending'
  );

  const handleDecision = (type: 'approved' | 'rejected') => {
    setApprovalDecision(type);
    if (helper.pendingApproval) {
      if (type === 'approved') onApproveAction(helper.pendingApproval.actionId);
      else onRejectAction(helper.pendingApproval.actionId);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Persistent Page-Level Voice Assistance Control */}
      <PageVoiceGuideButton
        currentLang={currentLang}
        pageKey="helpers"
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
            {t.helpers.title}
          </h1>
          <p className="text-xs md:text-sm text-amber-900/80">
            {t.helpers.subtitle}
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs md:text-sm shadow-xs transition-all shrink-0 cursor-pointer">
          <Users className="w-4 h-4" />
          <span>{t.helpers.addHelperBtn}</span>
        </button>
      </div>

      {/* Owner Protection Principle */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-300/80 text-xs md:text-sm text-amber-900 flex items-start gap-3">
        <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="font-semibold">
          {t.helpers.ownerNotice}
        </p>
      </div>

      {/* Active Helper Card */}
      <div className="bg-white rounded-3xl p-6 md:p-7 border border-amber-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xl font-serif">
              {helper.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-amber-950">
                  {helper.name}
                </h3>
                <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  {t.helpers.activeHelperBadge}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-amber-900/80 mt-1 font-medium">
                <span>{helper.relationship}</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono">
                  <Phone className="w-3 h-3 text-amber-700" />
                  {helper.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Explain to Helper Button */}
          <button
            onClick={() => setShowHelperSummary(!showHelperSummary)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold border border-amber-300 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-amber-800" />
            <span>{t.helpers.explainToHelperBtn}</span>
          </button>
        </div>

        {/* Pending Sensitive Action Approval Dialog */}
        {helper.pendingApproval && (
          <div className="rounded-2xl p-5 bg-orange-50 border-2 border-orange-300 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-900">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span>{t.helpers.approvalRequiredHeading}</span>
            </div>

            <p className="text-sm md:text-base font-bold text-orange-950">
              {helper.pendingApproval.description}
            </p>

            <div className="text-xs text-orange-800/80">
              {t.helpers.requestTimePrefix} {helper.pendingApproval.requestedTime}
            </div>

            {/* Decision Buttons */}
            {approvalDecision === 'pending' ? (
              <div className="pt-2 flex flex-wrap gap-2.5">
                <button
                  onClick={() => handleDecision('approved')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs md:text-sm font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.helpers.btnAllow}</span>
                </button>
                <button
                  onClick={() => handleDecision('rejected')}
                  className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-900 rounded-xl text-xs md:text-sm font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  <span>{t.helpers.btnDeny}</span>
                </button>
              </div>
            ) : approvalDecision === 'approved' ? (
              <div className="p-3 bg-emerald-100 text-emerald-950 text-xs font-bold rounded-xl flex items-center gap-2 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.helpers.approvalSuccess}</span>
              </div>
            ) : (
              <div className="p-3 bg-stone-200 text-stone-900 text-xs font-bold rounded-xl flex items-center gap-2">
                <XCircle className="w-4 h-4 text-stone-600" />
                <span>{t.helpers.rejectionSuccess}</span>
              </div>
            )}
          </div>
        )}

        {/* Granular Permissions Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
            {t.helpers.permissionsHeading}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs md:text-sm">
            <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.helpers.permViewStatus}</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.helpers.permViewDocs}</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.helpers.permUploadProof}</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-950 rounded-xl border border-red-200 font-medium">
              <XCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{t.helpers.permNoDelete}</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-950 rounded-xl border border-red-200 font-medium sm:col-span-2">
              <XCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{t.helpers.permNoSilentChanges}</span>
            </div>
          </div>
        </div>

        {/* "Explain to my helper" Simplified Shareable Summary Card */}
        {showHelperSummary && (
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-300 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.helpers.explainSummaryHeading}</span>
              </span>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-mono">
                {t.helpers.summaryPreviewBadge}
              </span>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-amber-200 text-xs md:text-sm space-y-2 text-amber-950">
              <p className="font-bold">
                {t.helpers.helperSummaryGreeting}
              </p>
              <p>
                {t.helpers.helperSummaryLine1}
              </p>
              <p>
                {t.helpers.helperSummaryLine2}
              </p>
              <p className="text-[11px] text-stone-500 italic">
                {t.helpers.helperSummaryPrivacyNote}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
