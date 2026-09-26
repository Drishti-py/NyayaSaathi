export interface AppTranslations {
  appName: string;
  appTagline: string;
  explainThisPage: string;
  voiceGuideStop: string;
  voiceGuidePause: string;
  voiceGuideResume: string;
  voiceGuideSlower: string;
  voiceGuideNormal: string;
  voiceGuideReplay: string;
  canIExplainPrompt: string;
  yesExplainBtn: string;
  closeBtn: string;
  interruptionAskTitle: string;
  interruptionPlaceholder: string;
  interruptionAskBtn: string;
  interruptionSampleQ: string;

  nav: {
    home: string;
    documents: string;
    process: string;
    records: string;
    tasks: string;
    helpers: string;
  };

  pageExplaining: {
    home: string;
    documents: string;
    process: string;
    records: string;
    tasks: string;
    helpers: string;
    docDetail: string;
  };

  home: {
    heading: string;
    subheading: string;
    taglineBadge: string;
    startDemoBtn: string;
    uploadCustomBtn: string;
    cards: {
      receivedDoc: { title: string; desc: string; voicePrompt: string };
      govWork: { title: string; desc: string; voicePrompt: string };
      tellStory: { title: string; desc: string; voicePrompt: string };
      pendingTasks: { title: string; desc: string; voicePrompt: string };
      myRecords: { title: string; desc: string; voicePrompt: string };
      trustedHelpers: { title: string; desc: string; voicePrompt: string };
    };
    openCardText: string;
    safetyRuleTitle: string;
    safetyRuleText: string;
  };

  uploadModal: {
    title: string;
    subtitle: string;
    privacyNote: string;
    chooseFile: string;
    chooseSamplePrompt: string;
    sample1Title: string;
    sample1Desc: string;
    sample1Badge: string;
    sample2Title: string;
    sample2Desc: string;
    sample2Badge: string;
    uploadingMessage: string;
    analyzingMessage: string;
    analyzingSubtext: string;
    fileTypesHint: string;
    pasteManualPrompt: string;
    closeManualPrompt: string;
    manualPlaceholder: string;
    manualSubmitBtn: string;
    cancel: string;
  };

  docView: {
    tabOriginal: string;
    tabAnalysis: string;
    tabSafety: string;
    whatIsThis: string;
    issuingAuthority: string;
    meaningSimple: string;
    actionableSteps: string;
    importantDates: string;
    importantNumbers: string;
    whatToKeep: string;
    urgentBadge: string;
    askNyayaSaathi: string;
    askPlaceholder: string;
    askButton: string;
    askSampleQuestion: string;
    listenExplanation: string;
    stopListening: string;
    startJourneyBtn: string;
    fictionalNoticeBadge: string;
    fictionalNoticeNote: string;
    originalDocSafeNotice: string;
  };

  safety: {
    title: string;
    subtitle: string;
    disclaimer: string;
    statusLabels: {
      consistent: string;
      unverified: string;
      inconsistent: string;
      warning_signs: string;
    };
    whyHeading: string;
    warningSignsHeading: string;
    officialChannelHeading: string;
    defaultOfficialOffice: string;
  };

  process: {
    title: string;
    subtitle: string;
    currentStepBadge: string;
    completedBadge: string;
    pendingBadge: string;
    whereAmINow: string;
    whatToDoNext: string;
    stepDetailHeading: string;
    evidenceStatus: string;
    evidenceOfficial: string;
    evidenceUploaded: string;
    evidenceUserEntered: string;
    evidenceNoProof: string;
    buttonAttachProof: string;
    buttonExplainStep: string;
    demoJourneyNote: string;
    totalCompletedPrefix: string;
    officeHeading: string;
  };

  records: {
    title: string;
    subtitle: string;
    addNewButton: string;
    modalTitle: string;
    formTitle: string;
    formTitlePlaceholder: string;
    formReceiptNo: string;
    formDate: string;
    formType: string;
    formNotes: string;
    formNotesPlaceholder: string;
    saveButton: string;
    cancelButton: string;
    tierOfficial: string;
    tierUserEntered: string;
    legalProofDisclaimer: string;
    typeOptions: {
      officialSlip: string;
      smsNotice: string;
      stampedCopy: string;
      userNote: string;
    };
  };

  helpers: {
    title: string;
    subtitle: string;
    addHelperBtn: string;
    ownerNotice: string;
    activeHelperBadge: string;
    permissionsHeading: string;
    permViewStatus: string;
    permViewDocs: string;
    permUploadProof: string;
    permNoDelete: string;
    permNoSilentChanges: string;
    approvalRequiredHeading: string;
    requestTimePrefix: string;
    approvalSuccess: string;
    rejectionSuccess: string;
    btnAllow: string;
    btnDeny: string;
    explainToHelperBtn: string;
    explainSummaryHeading: string;
    summaryPreviewBadge: string;
    helperSummaryGreeting: string;
    helperSummaryLine1: string;
    helperSummaryLine2: string;
    helperSummaryPrivacyNote: string;
  };

  tasks: {
    title: string;
    subtitle: string;
    activeTasksCount: string;
    dueDateLabel: string;
    urgentBadge: string;
    listenReminder: string;
    smsPreviewHeading: string;
    toggleCompleteTitle: string;
  };

  languageSelector: {
    selectLanguageTitle: string;
    currentLanguageLabel: string;
    searchPlaceholder: string;
    changeLanguageBtn: string;
  };

  footer: {
    title: string;
    desc: string;
  };
}
