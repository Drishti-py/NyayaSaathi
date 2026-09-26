import React from 'react';
import { ProcessJourney, LanguageCode, EvidenceLevel } from '../types';
import { translations } from '../translations';
import { PageVoiceGuideButton } from './PageVoiceGuideButton';
import { voiceService } from '../services/voiceService';
import {
  CheckCircle2,
  Volume2,
  PlusCircle,
  ArrowRight
} from 'lucide-react';

interface ProcessJourneyViewProps {
  journey: ProcessJourney;
  currentLang: LanguageCode;
  onAttachProofClick: (stepId: string) => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isSlowerSpeed: boolean;
  onToggleSpeed: () => void;
  onTriggerPageExplanation: (text: string) => void;
  onHighlightElement: (id: string | null) => void;
  highlightedElementId?: string | null;
}

export const ProcessJourneyView: React.FC<ProcessJourneyViewProps> = ({
  journey,
  currentLang,
  onAttachProofClick,
  isSpeaking,
  isPaused,
  isSlowerSpeed,
  onToggleSpeed,
  onTriggerPageExplanation,
  onHighlightElement,
  highlightedElementId,
}) => {
  const t = translations[currentLang];
  const currentStep = journey.steps[journey.currentStepIndex];

  const getEvidenceBadge = (level: EvidenceLevel) => {
    switch (level) {
      case 'official_proof':
        return {
          label: t.process.evidenceOfficial,
          color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-600',
        };
      case 'uploaded_doc':
        return {
          label: t.process.evidenceUploaded,
          color: 'bg-blue-100 text-blue-900 border-blue-300',
          dot: 'bg-blue-600',
        };
      case 'user_record':
        return {
          label: t.process.evidenceUserEntered,
          color: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-600',
        };
      case 'no_proof':
      default:
        return {
          label: t.process.evidenceNoProof,
          color: 'bg-stone-100 text-stone-700 border-stone-300',
          dot: 'bg-stone-400',
        };
    }
  };

  const handleExplainStep = (title: string, desc: string, nextAction: string) => {
    const text = `${title}. ${desc}. ${nextAction}`;
    voiceService.speak(text, currentLang, isSlowerSpeed ? 0.8 : 0.95);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Persistent Page-Level Voice Assistance Control */}
      <PageVoiceGuideButton
        currentLang={currentLang}
        pageKey="process"
        isSpeaking={isSpeaking}
        isPaused={isPaused}
        isSlowerSpeed={isSlowerSpeed}
        onToggleSpeed={onToggleSpeed}
        onTriggerExplanation={onTriggerPageExplanation}
        onHighlightElement={onHighlightElement}
      />

      {/* Title & Category Banner */}
      <div className="bg-amber-100/90 rounded-3xl p-5 md:p-6 border border-amber-300 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2.5 py-0.5 rounded-full">
            {journey.category}
          </span>
          <h1 className="text-xl md:text-2xl font-bold font-serif text-amber-950 mt-1">
            {journey.title}
          </h1>
          <p className="text-xs md:text-sm text-amber-900/80">
            {t.process.subtitle}
          </p>
        </div>

        <div className="text-xs bg-amber-200/80 text-amber-950 px-3 py-2 rounded-xl border border-amber-300/80 font-medium">
          {t.process.demoJourneyNote}
        </div>
      </div>

      {/* Prominent "Where am I right now?" & "What to do next?" Status Card */}
      {currentStep && (
        <div
          id="process-current-step"
          className={`bg-gradient-to-br from-amber-700 to-orange-800 text-white rounded-3xl p-6 md:p-7 shadow-lg space-y-5 transition-all ${
            highlightedElementId === 'process-current-step'
              ? 'ring-4 ring-amber-400 ring-offset-2 scale-101'
              : ''
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-600/60 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/30 border border-amber-400/40 flex items-center justify-center font-bold text-lg">
                {currentStep.stepNumber}
              </div>
              <div>
                <span className="text-xs font-bold text-amber-200 uppercase tracking-wider block">
                  {t.process.whereAmINow}
                </span>
                <h2 className="text-lg md:text-xl font-bold font-serif">
                  {currentStep.title}
                </h2>
              </div>
            </div>

            <button
              onClick={() => handleExplainStep(currentStep.title, currentStep.description, currentStep.nextActionPrompt)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-200" />
              <span>{t.process.buttonExplainStep}</span>
            </button>
          </div>

          {/* Description & Next Action Prompt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
            <div className="space-y-1 bg-black/10 p-4 rounded-2xl border border-white/10">
              <span className="text-amber-200 font-bold block text-xs">
                {t.process.stepDetailHeading}
              </span>
              <p className="leading-relaxed opacity-95 font-medium">
                {currentStep.description}
              </p>
            </div>

            <div className="space-y-2 bg-black/20 p-4 rounded-2xl border border-white/15">
              <span className="text-amber-200 font-bold block text-xs flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5" />
                <span>{t.process.whatToDoNext}</span>
              </span>
              <p className="leading-relaxed font-bold text-white text-sm">
                {currentStep.nextActionPrompt}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onAttachProofClick(currentStep.id)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 rounded-xl text-xs font-bold shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t.process.buttonAttachProof}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual Step-by-Step Timeline Journey */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-amber-200 shadow-xs space-y-6">
        <h3 className="text-base md:text-lg font-bold font-serif text-amber-950 flex items-center gap-2">
          <span>{t.process.title}</span>
          <span className="text-xs font-normal text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
            {journey.steps.filter((s) => s.status === 'completed').length} / {journey.steps.length} {t.process.completedBadge}
          </span>
        </h3>

        <div className="relative pl-6 md:pl-8 space-y-6 before:absolute before:left-3 md:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-amber-200">
          {journey.steps.map((step, idx) => {
            const isCurrent = idx === journey.currentStepIndex;
            const isCompleted = step.status === 'completed';
            const evidence = getEvidenceBadge(step.evidenceLevel);

            return (
              <div key={step.id} className="relative group">
                {/* Step Marker Node */}
                <div
                  className={`absolute -left-6 md:-left-8 top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-transform ${
                    isCompleted
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : isCurrent
                      ? 'bg-amber-600 text-white border-amber-400 ring-4 ring-amber-200 animate-pulse'
                      : 'bg-white text-stone-400 border-stone-300'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 stroke-[2.5]" />
                  ) : (
                    <span>{step.stepNumber}</span>
                  )}
                </div>

                {/* Step Card */}
                <div
                  className={`p-4 md:p-5 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-amber-50/90 border-amber-400 shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-stone-50/70 border-stone-200 opacity-80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm md:text-base font-bold text-amber-950">
                        {step.title}
                      </h4>
                      {isCurrent && (
                        <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                          {t.process.currentStepBadge}
                        </span>
                      )}
                    </div>

                    {/* Evidence Level Badge */}
                    <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${evidence.color}`}>
                      <span className={`w-2 h-2 rounded-full ${evidence.dot}`} />
                      <span>{evidence.label}</span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-stone-700 mt-2 font-medium">
                    {step.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-black/5 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
                    <div>
                      <span className="font-bold text-stone-800">
                        {t.process.officeHeading}
                      </span>
                      <span>{step.authorityName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleExplainStep(step.title, step.description, step.nextActionPrompt)}
                        className="p-1 rounded text-amber-800 hover:bg-amber-200/60 cursor-pointer"
                        title={t.process.buttonExplainStep}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      {step.evidenceLevel !== 'official_proof' && (
                        <button
                          onClick={() => onAttachProofClick(step.id)}
                          className="text-amber-900 hover:text-amber-950 font-bold underline cursor-pointer"
                        >
                          {t.process.buttonAttachProof}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
