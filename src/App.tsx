/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageCode, DocumentItem, ProcessJourney, EvidenceRecord, TrustedHelper, TaskReminder } from './types';
import { translations } from './translations';
import { Header } from './components/Header';
import { VoiceGuideBar } from './components/VoiceGuideBar';
import { HomeScreen } from './components/HomeScreen';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { DocumentView } from './components/DocumentView';
import { ProcessJourneyView } from './components/ProcessJourneyView';
import { RecordsView } from './components/RecordsView';
import { TrustedHelperView } from './components/TrustedHelperView';
import { TasksRemindersView } from './components/TasksRemindersView';
import { VoiceQualityTestConsole } from './components/VoiceQualityTestConsole';
import { voiceService } from './services/voiceService';
import {
  getSampleMutationDoc,
  getSampleSuspiciousDoc,
  getInitialProcessJourney,
  getInitialRecords,
  getInitialHelper,
  getInitialReminders,
} from './data/demoDocuments';

export default function App() {
  // Global Language Setting (Default: Hindi per requirements)
  const [currentLang, setCurrentLang] = useState<LanguageCode>('hi');

  // Active View / Navigation Tab
  const [activeNav, setActiveNav] = useState<string>('home');

  // Documents State (Dynamically initialized per selected language)
  const [documents, setDocuments] = useState<DocumentItem[]>([
    getSampleMutationDoc('hi'),
    getSampleSuspiciousDoc('hi'),
  ]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem>(getSampleMutationDoc('hi'));
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAnalyzingDoc, setIsAnalyzingDoc] = useState(false);

  // Process Journey State (Dynamically localized)
  const [journey, setJourney] = useState<ProcessJourney>(getInitialProcessJourney('hi'));

  // Records State
  const [records, setRecords] = useState<EvidenceRecord[]>(getInitialRecords('hi'));
  const [openAddRecordModal, setOpenAddRecordModal] = useState(false);

  // Helpers State
  const [helper, setHelper] = useState<TrustedHelper>(getInitialHelper('hi'));

  // Reminders State
  const [reminders, setReminders] = useState<TaskReminder[]>(getInitialReminders('hi'));

  // Voice Guide State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSlowerSpeed, setIsSlowerSpeed] = useState(false);
  const [currentSpeechText, setCurrentSpeechText] = useState('');
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null);
  const [isVoiceTesterOpen, setIsVoiceTesterOpen] = useState(false);

  // Subscribe to voiceService state
  useEffect(() => {
    const unsubscribe = voiceService.subscribe((event) => {
      setIsSpeaking(event.isSpeaking);
      setIsPaused(event.isPaused);
      if (!event.isSpeaking && !event.isPaused) {
        setHighlightedCardId(null);
      }
    });
    return unsubscribe;
  }, []);

  // When language switches, re-localize documents and state, and speak welcome
  const handleLanguageChange = (newLang: LanguageCode) => {
    setCurrentLang(newLang);
    voiceService.stop();

    // Re-localize sample docs, journey, records, helper, reminders
    const updatedMutationDoc = getSampleMutationDoc(newLang);
    const updatedSuspiciousDoc = getSampleSuspiciousDoc(newLang);
    setDocuments([updatedMutationDoc, updatedSuspiciousDoc]);

    if (selectedDoc.sampleType === 'suspicious') {
      setSelectedDoc(updatedSuspiciousDoc);
    } else {
      setSelectedDoc(updatedMutationDoc);
    }

    setJourney(getInitialProcessJourney(newLang));
    setRecords(getInitialRecords(newLang));
    setHelper(getInitialHelper(newLang));
    setReminders(getInitialReminders(newLang));

    const welcomeMsg = translations[newLang].pageExplaining.home;
    setCurrentSpeechText(welcomeMsg);
    voiceService.speak(welcomeMsg, newLang, isSlowerSpeed ? 0.8 : 0.95);
  };

  // Trigger main voice guide for current screen
  const handleTriggerVoiceGuide = () => {
    if (isSpeaking) {
      voiceService.stop();
      setCurrentSpeechText('');
      setHighlightedCardId(null);
      return;
    }

    const t = translations[currentLang];
    let textToSpeak = '';

    if (activeNav === 'home') {
      textToSpeak = t.pageExplaining.home;
      setHighlightedCardId('card-received-doc');
    } else if (activeNav === 'documents') {
      textToSpeak = t.pageExplaining.documents;
    } else if (activeNav === 'process') {
      textToSpeak = t.pageExplaining.process;
      setHighlightedCardId('process-current-step');
    } else if (activeNav === 'records') {
      textToSpeak = t.pageExplaining.records;
    } else if (activeNav === 'helpers') {
      textToSpeak = t.pageExplaining.helpers;
    } else if (activeNav === 'tasks') {
      textToSpeak = t.pageExplaining.tasks;
    }

    setCurrentSpeechText(textToSpeak);
    voiceService.speak(textToSpeak, currentLang, isSlowerSpeed ? 0.8 : 0.95);
  };

  // Page level explanation trigger (for the persistent "Explain this page" button on every screen)
  const handleTriggerPageExplanation = (text: string) => {
    setCurrentSpeechText(text);
    voiceService.speak(text, currentLang, isSlowerSpeed ? 0.8 : 0.95);
  };

  // Slower speech toggle
  const handleToggleSpeed = () => {
    const nextSpeed = !isSlowerSpeed;
    setIsSlowerSpeed(nextSpeed);
    if (isSpeaking && currentSpeechText) {
      voiceService.speak(currentSpeechText, currentLang, nextSpeed ? 0.8 : 0.95);
    }
  };

  // Card explain audio on home screen
  const handleExplainCard = (cardTitle: string, promptText: string) => {
    setCurrentSpeechText(`${cardTitle}: ${promptText}`);
    voiceService.speak(promptText, currentLang, isSlowerSpeed ? 0.8 : 0.95);
  };

  // 1-Click Complete Demo Journey handler
  const handleStartDemoJourney = async () => {
    const doc = getSampleMutationDoc(currentLang);
    setSelectedDoc(doc);
    setActiveNav('documents');

    const t = translations[currentLang];
    const explanationText = `${doc.title}. ${doc.analysis.whatIsThis}. ${doc.analysis.meaningSimple}`;
    setCurrentSpeechText(explanationText);
    voiceService.speak(explanationText, currentLang, isSlowerSpeed ? 0.8 : 0.95);
  };

  // Document Upload / Sample select handler
  const handleSelectSample = async (sampleType: 'mutation_notice' | 'suspicious') => {
    setIsAnalyzingDoc(true);

    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sampleType,
          language: currentLang,
        }),
      });

      const resData = await response.json();
      const analysisData = resData.data;

      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        title: analysisData.whatIsThis || (sampleType === 'mutation_notice' ? 'Mutation Notice' : 'Demand Notice'),
        originalFileName: sampleType === 'mutation_notice' ? 'Notice_Form_135D_Talati_Office.pdf' : 'Suspicious_Notice_Letter.jpg',
        uploadedAt: new Date().toISOString().split('T')[0],
        sampleType,
        isDemoNotice: true,
        analysis: analysisData,
      };

      setDocuments((prev) => [newDoc, ...prev]);
      setSelectedDoc(newDoc);
      setIsUploadModalOpen(false);
      setActiveNav('documents');

      const speech = `${newDoc.analysis.whatIsThis}. ${newDoc.analysis.meaningSimple}`;
      setCurrentSpeechText(speech);
      voiceService.speak(speech, currentLang, isSlowerSpeed ? 0.8 : 0.95);
    } catch (err) {
      console.error('Error during analysis:', err);
      const fallbackDoc = sampleType === 'mutation_notice' ? getSampleMutationDoc(currentLang) : getSampleSuspiciousDoc(currentLang);
      setSelectedDoc(fallbackDoc);
      setIsUploadModalOpen(false);
      setActiveNav('documents');
    } finally {
      setIsAnalyzingDoc(false);
    }
  };

  // Custom upload handler
  const handleCustomUpload = async (fileData: { text?: string; imageBase64?: string; fileName: string }) => {
    setIsAnalyzingDoc(true);

    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: fileData.text,
          imageBase64: fileData.imageBase64,
          language: currentLang,
        }),
      });

      const resData = await response.json();
      const analysisData = resData.data;

      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        title: analysisData.whatIsThis || fileData.fileName,
        originalFileName: fileData.fileName,
        uploadedAt: new Date().toISOString().split('T')[0],
        imageUrl: fileData.imageBase64,
        isDemoNotice: false,
        analysis: analysisData,
      };

      setDocuments((prev) => [newDoc, ...prev]);
      setSelectedDoc(newDoc);
      setIsUploadModalOpen(false);
      setActiveNav('documents');

      const speech = `${newDoc.analysis.whatIsThis}. ${newDoc.analysis.meaningSimple}`;
      setCurrentSpeechText(speech);
      voiceService.speak(speech, currentLang, isSlowerSpeed ? 0.8 : 0.95);
    } catch (err) {
      console.error('Error during custom analysis:', err);
    } finally {
      setIsAnalyzingDoc(false);
    }
  };

  // Add Record handler
  const handleAddRecord = (newRecordData: Omit<EvidenceRecord, 'id'>) => {
    const newRecord: EvidenceRecord = {
      ...newRecordData,
      id: `rec-${Date.now()}`,
    };

    setRecords((prev) => [newRecord, ...prev]);

    // Update process step evidence level if attached
    if (newRecordData.relatedProcessStepId || journey.currentStepIndex === 2) {
      setJourney((prev) => ({
        ...prev,
        steps: prev.steps.map((step, idx) =>
          idx === prev.currentStepIndex
            ? { ...step, evidenceLevel: newRecordData.evidenceLevel, status: 'completed' }
            : step
        ),
      }));
    }
  };

  // Toggle reminder completion
  const handleToggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isCompleted: !r.isCompleted } : r))
    );
  };

  // Helper approvals
  const handleApproveHelperAction = (actionId: string) => {
    setHelper((prev) => ({
      ...prev,
      pendingApproval: prev.pendingApproval
        ? { ...prev.pendingApproval, status: 'approved' }
        : undefined,
    }));
  };

  const handleRejectHelperAction = (actionId: string) => {
    setHelper((prev) => ({
      ...prev,
      pendingApproval: prev.pendingApproval
        ? { ...prev.pendingApproval, status: 'rejected' }
        : undefined,
    }));
  };

  const t = translations[currentLang];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col selection:bg-amber-200">
      {/* Top Header with Single Selected Language button & Navigation */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onTriggerVoiceGuide={handleTriggerVoiceGuide}
        onOpenVoiceTester={() => setIsVoiceTesterOpen(true)}
        isVoiceActive={isSpeaking}
        activeNav={activeNav}
        onNavigate={(view) => {
          voiceService.stop();
          setActiveNav(view);
        }}
      />

      {/* Voice Guide Audio Controller Bar (Active when speaking or paused) */}
      <VoiceGuideBar
        currentLang={currentLang}
        isSpeaking={isSpeaking}
        isPaused={isPaused}
        isSlowerSpeed={isSlowerSpeed}
        currentSpeechText={currentSpeechText}
        onPause={() => voiceService.pause()}
        onResume={() => voiceService.resume()}
        onReplay={() => voiceService.speak(currentSpeechText, currentLang, isSlowerSpeed ? 0.8 : 0.95)}
        onToggleSpeed={handleToggleSpeed}
        onStop={() => {
          voiceService.stop();
          setCurrentSpeechText('');
          setHighlightedCardId(null);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeNav === 'home' && (
          <HomeScreen
            currentLang={currentLang}
            highlightedCardId={highlightedCardId}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
            onNavigate={(nav) => setActiveNav(nav)}
            onStartDemoJourney={handleStartDemoJourney}
            onExplainCard={handleExplainCard}
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            isSlowerSpeed={isSlowerSpeed}
            onToggleSpeed={handleToggleSpeed}
            onTriggerPageExplanation={handleTriggerPageExplanation}
            onHighlightElement={(id) => setHighlightedCardId(id)}
          />
        )}

        {activeNav === 'documents' && (
          <DocumentView
            document={selectedDoc}
            currentLang={currentLang}
            onStartProcess={() => setActiveNav('process')}
            onAttachRecordPrompt={() => {
              setActiveNav('records');
              setOpenAddRecordModal(true);
            }}
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            isSlowerSpeed={isSlowerSpeed}
            onToggleSpeed={handleToggleSpeed}
            onTriggerPageExplanation={handleTriggerPageExplanation}
          />
        )}

        {activeNav === 'process' && (
          <ProcessJourneyView
            journey={journey}
            currentLang={currentLang}
            onAttachProofClick={(stepId) => {
              setActiveNav('records');
              setOpenAddRecordModal(true);
            }}
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            isSlowerSpeed={isSlowerSpeed}
            onToggleSpeed={handleToggleSpeed}
            onTriggerPageExplanation={handleTriggerPageExplanation}
            onHighlightElement={(id) => setHighlightedCardId(id)}
            highlightedElementId={highlightedCardId}
          />
        )}

        {activeNav === 'records' && (
          <RecordsView
            records={records}
            currentLang={currentLang}
            onAddRecord={handleAddRecord}
            openAddModalInitially={openAddRecordModal}
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            isSlowerSpeed={isSlowerSpeed}
            onToggleSpeed={handleToggleSpeed}
            onTriggerPageExplanation={handleTriggerPageExplanation}
          />
        )}

        {activeNav === 'tasks' && (
          <TasksRemindersView
            reminders={reminders}
            currentLang={currentLang}
            onToggleComplete={handleToggleReminder}
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            isSlowerSpeed={isSlowerSpeed}
            onToggleSpeed={handleToggleSpeed}
            onTriggerPageExplanation={handleTriggerPageExplanation}
          />
        )}

        {activeNav === 'helpers' && (
          <TrustedHelperView
            helper={helper}
            currentLang={currentLang}
            onApproveAction={handleApproveHelperAction}
            onRejectAction={handleRejectHelperAction}
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            isSlowerSpeed={isSlowerSpeed}
            onToggleSpeed={handleToggleSpeed}
            onTriggerPageExplanation={handleTriggerPageExplanation}
          />
        )}
      </main>

      {/* Document Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        currentLang={currentLang}
        onClose={() => setIsUploadModalOpen(false)}
        onSelectSample={handleSelectSample}
        onCustomUpload={handleCustomUpload}
        isLoading={isAnalyzingDoc}
      />

      {/* Accessible Footer */}
      <footer className="border-t border-amber-200/80 bg-amber-50/70 py-6 text-center text-xs text-amber-900/80 space-y-2">
        <div className="font-bold text-amber-950 font-serif">
          {t.footer.title}
        </div>
        <p>
          {t.footer.desc}
        </p>
        <div className="pt-1">
          <button
            onClick={() => setIsVoiceTesterOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-200/80 hover:bg-amber-300 text-amber-950 text-[11px] font-bold transition-colors cursor-pointer"
          >
            <span>🔊 Native Voice Quality & Speech Tester (11 Languages)</span>
          </button>
        </div>
      </footer>

      {/* Native-Speaker Voice Quality & Debug Console */}
      <VoiceQualityTestConsole
        isOpen={isVoiceTesterOpen}
        onClose={() => setIsVoiceTesterOpen(false)}
        activeLanguage={currentLang}
        onSelectLanguage={(lang) => {
          handleLanguageChange(lang);
          setIsVoiceTesterOpen(false);
        }}
      />
    </div>
  );
}
