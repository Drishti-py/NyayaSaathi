export type LanguageCode =
  | 'hi'
  | 'en'
  | 'gu'
  | 'bn'
  | 'mr'
  | 'ta'
  | 'te'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'or';

export interface LanguageInfo {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  bcp47: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'hi', nativeName: 'हिंदी', englishName: 'Hindi', bcp47: 'hi-IN' },
  { code: 'en', nativeName: 'English', englishName: 'English', bcp47: 'en-IN' },
  { code: 'gu', nativeName: 'ગુજરાતી', englishName: 'Gujarati', bcp47: 'gu-IN' },
  { code: 'bn', nativeName: 'বাংলা', englishName: 'Bengali', bcp47: 'bn-IN' },
  { code: 'mr', nativeName: 'मराठी', englishName: 'Marathi', bcp47: 'mr-IN' },
  { code: 'ta', nativeName: 'தமிழ்', englishName: 'Tamil', bcp47: 'ta-IN' },
  { code: 'te', nativeName: 'తెలుగు', englishName: 'Telugu', bcp47: 'te-IN' },
  { code: 'kn', nativeName: 'ಕನ್ನಡ', englishName: 'Kannada', bcp47: 'kn-IN' },
  { code: 'ml', nativeName: 'മലയാളം', englishName: 'Malayalam', bcp47: 'ml-IN' },
  { code: 'pa', nativeName: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', bcp47: 'pa-IN' },
  { code: 'or', nativeName: 'ଓଡ଼ିଆ', englishName: 'Odia', bcp47: 'or-IN' },
];

export type AccessibilityMode = 'listen' | 'visual' | 'read' | 'helper';

export type SafetyCategory = 'consistent' | 'unverified' | 'inconsistent' | 'warning_signs';

export type EvidenceLevel = 'official_proof' | 'uploaded_doc' | 'user_record' | 'no_proof';

export interface DocumentAnalysis {
  whatIsThis: string;
  issuingAuthority: string;
  meaningSimple: string;
  actionableSteps: string[];
  importantDates: Array<{
    label: string;
    date: string;
    isUrgent: boolean;
  }>;
  importantNumbers: Array<{
    label: string;
    value: string;
  }>;
  whatToKeep: string[];
  safetyScreening: {
    category: SafetyCategory;
    statusLabel: string;
    explanation: string;
    warningSignals: string[];
    officialVerificationChannel: string;
  };
}

export interface DocumentItem {
  id: string;
  title: string;
  originalFileName: string;
  uploadedAt: string;
  sampleType?: 'mutation_notice' | 'suspicious' | 'custom';
  imageUrl?: string;
  analysis: DocumentAnalysis;
  isDemoNotice?: boolean;
}

export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  requiredDocuments: string[];
  authorityName: string;
  evidenceLevel: EvidenceLevel;
  proofRecordId?: string;
  status: 'completed' | 'in_progress' | 'pending';
  nextActionPrompt: string;
}

export interface ProcessJourney {
  id: string;
  title: string;
  category: string;
  currentStepIndex: number;
  steps: ProcessStep[];
  updatedAt: string;
}

export interface EvidenceRecord {
  id: string;
  title: string;
  date: string;
  receiptNumber?: string;
  sourceType: 'official_receipt' | 'sms' | 'stamped_copy' | 'user_note';
  evidenceLevel: EvidenceLevel;
  notes?: string;
  relatedProcessStepId?: string;
}

export interface TrustedHelper {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  permissions: {
    canViewStatus: boolean;
    canViewDocuments: boolean;
    canUploadProof: boolean;
    canDeleteRecords: false;
    canChangeInfoWithoutApproval: false;
  };
  pendingApproval?: {
    actionId: string;
    description: string;
    requestedTime: string;
    status: 'pending' | 'approved' | 'rejected';
  };
}

export interface TaskReminder {
  id: string;
  title: string;
  dueDate: string;
  isUrgent: boolean;
  documentTitle: string;
  smsPreview: string;
  isCompleted: boolean;
}
