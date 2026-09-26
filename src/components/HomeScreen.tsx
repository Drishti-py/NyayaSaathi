import React from 'react';
import { LanguageCode } from '../types';
import { translations } from '../translations';
import { PageVoiceGuideButton } from './PageVoiceGuideButton';
import {
  FileText,
  Building2,
  Mic,
  Calendar,
  Receipt,
  Users,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Volume2
} from 'lucide-react';

interface HomeScreenProps {
  currentLang: LanguageCode;
  highlightedCardId: string | null;
  onOpenUploadModal: () => void;
  onNavigate: (view: string) => void;
  onStartDemoJourney: () => void;
  onExplainCard: (cardName: string, text: string) => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isSlowerSpeed: boolean;
  onToggleSpeed: () => void;
  onTriggerPageExplanation: (text: string) => void;
  onHighlightElement: (id: string | null) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentLang,
  highlightedCardId,
  onOpenUploadModal,
  onNavigate,
  onStartDemoJourney,
  onExplainCard,
  isSpeaking,
  isPaused,
  isSlowerSpeed,
  onToggleSpeed,
  onTriggerPageExplanation,
  onHighlightElement,
}) => {
  const t = translations[currentLang];

  const cards = [
    {
      id: 'card-received-doc',
      title: t.home.cards.receivedDoc.title,
      desc: t.home.cards.receivedDoc.desc,
      icon: FileText,
      bgColor: 'bg-amber-100/90 text-amber-900 border-amber-300',
      iconColor: 'text-amber-700 bg-amber-200/80',
      action: () => onOpenUploadModal(),
      voicePrompt: t.home.cards.receivedDoc.voicePrompt,
    },
    {
      id: 'card-gov-work',
      title: t.home.cards.govWork.title,
      desc: t.home.cards.govWork.desc,
      icon: Building2,
      bgColor: 'bg-emerald-50 text-emerald-950 border-emerald-300',
      iconColor: 'text-emerald-700 bg-emerald-100',
      action: () => onNavigate('process'),
      voicePrompt: t.home.cards.govWork.voicePrompt,
    },
    {
      id: 'card-tell-story',
      title: t.home.cards.tellStory.title,
      desc: t.home.cards.tellStory.desc,
      icon: Mic,
      bgColor: 'bg-orange-50 text-orange-950 border-orange-300',
      iconColor: 'text-orange-700 bg-orange-100',
      action: () => onOpenUploadModal(),
      voicePrompt: t.home.cards.tellStory.voicePrompt,
    },
    {
      id: 'card-pending-tasks',
      title: t.home.cards.pendingTasks.title,
      desc: t.home.cards.pendingTasks.desc,
      icon: Calendar,
      bgColor: 'bg-blue-50 text-blue-950 border-blue-300',
      iconColor: 'text-blue-700 bg-blue-100',
      action: () => onNavigate('tasks'),
      voicePrompt: t.home.cards.pendingTasks.voicePrompt,
    },
    {
      id: 'card-my-records',
      title: t.home.cards.myRecords.title,
      desc: t.home.cards.myRecords.desc,
      icon: Receipt,
      bgColor: 'bg-teal-50 text-teal-950 border-teal-300',
      iconColor: 'text-teal-700 bg-teal-100',
      action: () => onNavigate('records'),
      voicePrompt: t.home.cards.myRecords.voicePrompt,
    },
    {
      id: 'card-trusted-helpers',
      title: t.home.cards.trustedHelpers.title,
      desc: t.home.cards.trustedHelpers.desc,
      icon: Users,
      bgColor: 'bg-purple-50 text-purple-950 border-purple-300',
      iconColor: 'text-purple-700 bg-purple-100',
      action: () => onNavigate('helpers'),
      voicePrompt: t.home.cards.trustedHelpers.voicePrompt,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6">
      {/* Persistent Page-Level Voice Assistance Control */}
      <PageVoiceGuideButton
        currentLang={currentLang}
        pageKey="home"
        isSpeaking={isSpeaking}
        isPaused={isPaused}
        isSlowerSpeed={isSlowerSpeed}
        onToggleSpeed={onToggleSpeed}
        onTriggerExplanation={onTriggerPageExplanation}
        onHighlightElement={onHighlightElement}
      />

      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-br from-amber-900 via-amber-950 to-orange-950 text-amber-50 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.home.taglineBadge}</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight font-serif text-white">
            {t.home.heading}
          </h1>
          <p className="text-base md:text-lg text-amber-200/90 leading-relaxed font-sans">
            {t.home.subheading}
          </p>

          {/* Quick Demo Button */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onStartDemoJourney}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-sm md:text-base shadow-md transition-all hover:scale-102 cursor-pointer"
            >
              <span>{t.home.startDemoBtn}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onOpenUploadModal}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm md:text-base border border-white/20 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>{t.home.uploadCustomBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Core Functional Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          const isHighlighted = highlightedCardId === card.id;

          return (
            <div
              key={card.id}
              id={card.id}
              onClick={card.action}
              className={`rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-md ${
                card.bgColor
              } ${
                isHighlighted
                  ? 'ring-4 ring-amber-500 ring-offset-2 scale-102 border-amber-600 bg-amber-200/95'
                  : 'hover:border-amber-400'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconColor} shadow-xs`}>
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  {/* Speaker button to hear what this card is */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onExplainCard(card.title, card.voicePrompt);
                    }}
                    className="p-1.5 rounded-lg bg-white/70 hover:bg-white text-amber-900 shadow-xs hover:scale-110 transition-transform cursor-pointer"
                    title={card.title}
                  >
                    <Volume2 className="w-4 h-4 text-amber-800" />
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-bold tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm mt-1 opacity-85 leading-normal font-sans">
                    {card.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-bold text-amber-950/80 group-hover:text-amber-950">
                <span>{t.home.openCardText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety & Trust Assurance Strip */}
      <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-4 flex flex-col sm:flex-row items-center gap-3 text-xs md:text-sm text-amber-900">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <span className="font-bold">{t.home.safetyRuleTitle}</span>
          <span>{t.home.safetyRuleText}</span>
        </div>
      </div>
    </div>
  );
};
