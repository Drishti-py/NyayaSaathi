import React from 'react';
import { TaskReminder, LanguageCode } from '../types';
import { translations } from '../translations';
import { PageVoiceGuideButton } from './PageVoiceGuideButton';
import { voiceService } from '../services/voiceService';
import {
  Volume2,
  CheckCircle2,
  Circle,
  MessageSquare,
  Bell
} from 'lucide-react';

interface TasksRemindersViewProps {
  reminders: TaskReminder[];
  currentLang: LanguageCode;
  onToggleComplete: (id: string) => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isSlowerSpeed: boolean;
  onToggleSpeed: () => void;
  onTriggerPageExplanation: (text: string) => void;
}

export const TasksRemindersView: React.FC<TasksRemindersViewProps> = ({
  reminders,
  currentLang,
  onToggleComplete,
  isSpeaking,
  isPaused,
  isSlowerSpeed,
  onToggleSpeed,
  onTriggerPageExplanation,
}) => {
  const t = translations[currentLang];

  const handleListenReminder = (title: string, dueDate: string, preview: string) => {
    const text = `${title}. ${t.tasks.dueDateLabel} ${dueDate}. ${preview}`;
    voiceService.speak(text, currentLang, isSlowerSpeed ? 0.8 : 0.95);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Persistent Page-Level Voice Assistance Control */}
      <PageVoiceGuideButton
        currentLang={currentLang}
        pageKey="tasks"
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
            {t.tasks.title}
          </h1>
          <p className="text-xs md:text-sm text-amber-900/80">
            {t.tasks.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-amber-200/90 text-amber-950 font-bold px-3 py-2 rounded-xl border border-amber-300">
          <Bell className="w-4 h-4 text-amber-700" />
          <span>
            {reminders.filter((r) => !r.isCompleted).length} {t.tasks.activeTasksCount}
          </span>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.map((rem) => (
          <div
            key={rem.id}
            className={`rounded-3xl p-6 border-2 transition-all ${
              rem.isCompleted
                ? 'bg-stone-50 border-stone-200 opacity-60'
                : 'bg-white border-amber-200 shadow-xs hover:border-amber-400'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => onToggleComplete(rem.id)}
                  className="mt-1 text-amber-700 hover:text-amber-900 cursor-pointer"
                  title={t.tasks.toggleCompleteTitle}
                >
                  {rem.isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-6 h-6 text-amber-400 hover:text-amber-600" />
                  )}
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-base md:text-lg font-bold ${
                        rem.isCompleted ? 'line-through text-stone-500' : 'text-amber-950'
                      }`}
                    >
                      {rem.title}
                    </span>
                    {rem.isUrgent && !rem.isCompleted && (
                      <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full border border-red-200">
                        {t.tasks.urgentBadge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-amber-800 font-medium">
                    {rem.documentTitle}
                  </div>
                </div>
              </div>

              {/* Due Date & Listen Button */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[11px] text-stone-500 font-medium">
                    {t.tasks.dueDateLabel}
                  </div>
                  <div className="text-sm md:text-base font-bold text-amber-900 font-mono">
                    {rem.dueDate}
                  </div>
                </div>

                <button
                  onClick={() => handleListenReminder(rem.title, rem.dueDate, rem.smsPreview)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-xs font-bold border border-amber-300 transition-colors cursor-pointer"
                  title={t.tasks.listenReminder}
                >
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  <span>{t.tasks.listenReminder}</span>
                </button>
              </div>
            </div>

            {/* Privacy-safe SMS reminder preview */}
            <div className="mt-4 pt-3 border-t border-amber-100 flex items-start gap-2.5 text-xs text-stone-700 bg-amber-50/50 p-3 rounded-2xl border border-amber-200/60">
              <MessageSquare className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-950 block">
                  {t.tasks.smsPreviewHeading}
                </span>
                <span className="text-stone-800 italic">"{rem.smsPreview}"</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
