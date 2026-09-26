import React from 'react';
import { DocumentAnalysis, LanguageCode } from '../types';
import { translations } from '../translations';
import { AlertTriangle, ShieldAlert, CheckCircle2, HelpCircle, Building } from 'lucide-react';

interface SafetyScreeningCardProps {
  screening: DocumentAnalysis['safetyScreening'];
  currentLang: LanguageCode;
}

export const SafetyScreeningCard: React.FC<SafetyScreeningCardProps> = ({
  screening,
  currentLang,
}) => {
  const t = translations[currentLang];

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'consistent':
        return {
          icon: CheckCircle2,
          bgColor: 'bg-emerald-50 border-emerald-300',
          textColor: 'text-emerald-950',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          indicatorColor: 'bg-emerald-600',
          label: t.safety.statusLabels.consistent,
        };
      case 'unverified':
        return {
          icon: HelpCircle,
          bgColor: 'bg-amber-50 border-amber-300',
          textColor: 'text-amber-950',
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
          indicatorColor: 'bg-amber-500',
          label: t.safety.statusLabels.unverified,
        };
      case 'inconsistent':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-orange-50 border-orange-300',
          textColor: 'text-orange-950',
          badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
          indicatorColor: 'bg-orange-500',
          label: t.safety.statusLabels.inconsistent,
        };
      case 'warning_signs':
      default:
        return {
          icon: ShieldAlert,
          bgColor: 'bg-red-50 border-red-300',
          textColor: 'text-red-950',
          badgeColor: 'bg-red-100 text-red-900 border-red-300',
          indicatorColor: 'bg-red-600',
          label: t.safety.statusLabels.warning_signs,
        };
    }
  };

  const config = getCategoryConfig(screening.category);
  const Icon = config.icon;

  return (
    <div className={`rounded-3xl p-5 md:p-7 border-2 ${config.bgColor} space-y-5 shadow-xs`}>
      {/* Header & Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${config.badgeColor} shadow-xs shrink-0`}>
            <Icon className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold font-serif">
              {t.safety.title}
            </h3>
            <p className="text-xs text-black/70">
              {t.safety.subtitle}
            </p>
          </div>
        </div>

        {/* Dynamic Status Badge */}
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${config.badgeColor}`}>
          <span className={`w-2.5 h-2.5 rounded-full ${config.indicatorColor} animate-pulse`} />
          <span>{config.label}</span>
        </div>
      </div>

      {/* Explanation of the screening */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-black/60">
          {t.safety.whyHeading}
        </h4>
        <p className="text-sm md:text-base leading-relaxed font-medium">
          {screening.explanation}
        </p>
      </div>

      {/* Detected Warning Signals if any */}
      {screening.warningSignals && screening.warningSignals.length > 0 && (
        <div className="bg-white/80 rounded-2xl p-4 border border-red-200 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-red-900">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>{t.safety.warningSignsHeading}</span>
          </div>
          <ul className="list-disc list-inside text-xs md:text-sm text-red-950 space-y-1">
            {screening.warningSignals.map((signal, idx) => (
              <li key={idx} className="font-medium">{signal}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Official Verification Channel */}
      <div className="bg-white/70 rounded-2xl p-4 border border-black/10 flex items-start gap-3 text-xs md:text-sm">
        <Building className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-black/80">
            {t.safety.officialChannelHeading}
          </span>
          <span className="font-semibold text-black/90">
            {screening.officialVerificationChannel || t.safety.defaultOfficialOffice}
          </span>
        </div>
      </div>

      {/* Non-negotiable Legal Disclaimer */}
      <div className="text-[11px] md:text-xs text-black/60 italic border-t border-black/10 pt-3">
        {t.safety.disclaimer}
      </div>
    </div>
  );
};
