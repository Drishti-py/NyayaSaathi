import { LanguageCode } from '../types';
import { languageConfig } from '../config/languageConfig';

export interface GlobalVoiceConfiguration {
  selectedLanguage: LanguageCode;
  personaName: string;
  ttsProvider: string;
  locale: string;
  speakingRate: number; // Canonical default 1.0 (0.85 when slower speed toggled)
  pitch: number;        // Canonical 1.0
  isSlowerSpeed: boolean;
  pronunciationSettings: {
    stripSpecialChars: boolean;
    naturalPauseFormatting: boolean;
    noTransliteration: boolean;
  };
}

export interface VoiceStatusEvent {
  isSpeaking: boolean;
  isPaused: boolean;
  isSlowerSpeed: boolean;
  currentLang: LanguageCode;
  provider: string;
  persona: string;
  speakingRate: number;
  currentText?: string;
  error?: string;
  warning?: string;
}

/**
 * NyayaSaathiVoiceService
 * 
 * CANONICAL SINGLE GLOBAL VOICE LAYER
 * 
 * Every page (Dashboard/Home, Document Screening, My Documents, Government Work,
 * Records, Pending Tasks, Trusted Helpers, Tell Me What Happened) inherits
 * this EXACT same voice persona and configuration.
 * 
 * Pages only supply the text. They do NOT decide the voice, speed, or TTS model.
 */
export class NyayaSaathiVoiceService {
  private config: GlobalVoiceConfiguration;
  private audioPlayer: HTMLAudioElement | null = null;
  private isSpeakingState = false;
  private isPausedState = false;
  private currentSpeechText = '';
  private currentOnEnd?: () => void;
  private onStateChangeListeners: Array<(event: VoiceStatusEvent) => void> = [];

  constructor() {
    this.config = {
      selectedLanguage: 'hi',
      personaName: 'NyayaSaathi Hindi Voice Persona',
      ttsProvider: 'Canonical NyayaSaathi Voice Engine',
      locale: 'hi-IN',
      speakingRate: 1.0, // Canonical natural speed
      pitch: 1.0,
      isSlowerSpeed: false,
      pronunciationSettings: {
        stripSpecialChars: true,
        naturalPauseFormatting: true,
        noTransliteration: true,
      },
    };

    if (typeof window !== 'undefined') {
      this.audioPlayer = new Audio();
      this.audioPlayer.preload = 'auto';

      this.audioPlayer.onplay = () => {
        this.isSpeakingState = true;
        this.isPausedState = false;
        this.notify();
      };

      this.audioPlayer.onpause = () => {
        if (this.isSpeakingState) {
          this.isPausedState = true;
          this.notify();
        }
      };

      this.audioPlayer.onended = () => {
        this.isSpeakingState = false;
        this.isPausedState = false;
        this.notify();
        if (this.currentOnEnd) {
          const cb = this.currentOnEnd;
          this.currentOnEnd = undefined;
          cb();
        }
      };

      this.audioPlayer.onerror = (e) => {
        console.warn('[NyayaSaathiVoiceService] Audio playback error:', e);
        this.isSpeakingState = false;
        this.isPausedState = false;
        this.notify();
        if (this.currentOnEnd) {
          const cb = this.currentOnEnd;
          this.currentOnEnd = undefined;
          cb();
        }
      };
    }
  }

  /**
   * Subscribe to global voice state changes
   */
  public subscribe(listener: (event: VoiceStatusEvent) => void) {
    this.onStateChangeListeners.push(listener);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notify(error?: string, warning?: string) {
    const payload: VoiceStatusEvent = {
      isSpeaking: this.isSpeakingState,
      isPaused: this.isPausedState,
      isSlowerSpeed: this.config.isSlowerSpeed,
      currentLang: this.config.selectedLanguage,
      provider: this.config.ttsProvider,
      persona: this.config.personaName,
      speakingRate: this.config.speakingRate,
      currentText: this.currentSpeechText,
      error,
      warning,
    };
    this.onStateChangeListeners.forEach((listener) => listener(payload));
  }

  /**
   * Update the globally active language.
   * This updates the global voice persona, locale, and provider description.
   */
  public setLanguage(lang: LanguageCode) {
    const cfg = languageConfig[lang] || languageConfig.hi;
    this.config.selectedLanguage = lang;
    this.config.locale = cfg.speechLanguage;
    this.config.personaName = `NyayaSaathi ${cfg.name} Voice Persona (${cfg.nativeName})`;
    this.config.ttsProvider = cfg.voiceProviderDescription;
    this.notify();
  }

  /**
   * Access the single source of truth configuration
   */
  public getConfiguration(): Readonly<GlobalVoiceConfiguration> {
    return { ...this.config };
  }

  public getSelectedLanguage(): LanguageCode {
    return this.config.selectedLanguage;
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }

  public isPaused(): boolean {
    return this.isPausedState;
  }

  public isSlowerSpeed(): boolean {
    return this.config.isSlowerSpeed;
  }

  /**
   * Toggle between Canonical Normal Pace (1.0x) and Accessible Gentle Pace (0.85x)
   */
  public toggleSlowerSpeed() {
    this.config.isSlowerSpeed = !this.config.isSlowerSpeed;
    this.config.speakingRate = this.config.isSlowerSpeed ? 0.85 : 1.0;

    if (this.audioPlayer) {
      this.audioPlayer.playbackRate = this.config.speakingRate;
    }

    this.notify();
  }

  /**
   * CANONICAL SPEAK METHOD
   * 
   * Used by Dashboard, Document Screening, and every other screen.
   * Automatically inherits the canonical persona, native speech model,
   * speed (1.0x), and native Gujarati/Hindi/etc. pronunciation.
   * 
   * Pages NEVER need to specify speed or voice parameters.
   */
  public async speak(
    text: string,
    overrideLang?: LanguageCode,
    overrideSpeed?: number,
    onEndCallback?: () => void
  ) {
    this.stop();

    if (overrideLang && overrideLang !== this.config.selectedLanguage) {
      this.setLanguage(overrideLang);
    }

    const lang = this.config.selectedLanguage;
    const cfg = languageConfig[lang] || languageConfig.hi;

    // Check if voice is supported for this language (e.g. Odia is text-supported with voice in active development)
    if (!cfg.isVoiceSupported) {
      const warning = `Voice synthesis for ${cfg.name} is currently in development. Text guidance is fully active.`;
      console.warn('[NyayaSaathiVoiceService]', warning);
      this.notify(undefined, warning);
      if (onEndCallback) onEndCallback();
      return;
    }

    // Clean text: strip emojis, symbols, and formatting for crystal-clear natural speech
    const cleanText = text
      .replace(/[*#_~`]/g, '')
      .replace(/[🟢🟡🟠🔴✓✗➕🚀🌱⚠️📁🔒👉📍📱👑•🔊💬🏛️📋👥🔔▶️⏸️⏹️🐢⚡🔄]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      if (onEndCallback) onEndCallback();
      return;
    }

    this.currentSpeechText = cleanText;
    this.currentOnEnd = onEndCallback;
    this.isSpeakingState = true;
    this.isPausedState = false;
    this.notify();

    const rate = overrideSpeed !== undefined ? overrideSpeed : this.config.speakingRate;

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          language: lang,
          speed: rate,
        }),
      });

      if (!response.ok) {
        throw new Error(`TTS server responded with ${response.status}`);
      }

      const data = await response.json();

      if (data.voiceUnavailable) {
        console.warn(`[NyayaSaathiVoiceService] Voice unavailable:`, data.message);
        this.isSpeakingState = false;
        this.notify(undefined, data.message);
        if (onEndCallback) onEndCallback();
        return;
      }

      if (!data.success || !data.base64Audio) {
        throw new Error('TTS response missing base64Audio');
      }

      if (!this.audioPlayer) {
        this.audioPlayer = new Audio();
      }

      const mime = data.mimeType || 'audio/mpeg';
      this.audioPlayer.src = `data:${mime};base64,${data.base64Audio}`;
      this.audioPlayer.playbackRate = rate;

      await this.audioPlayer.play();
    } catch (err: any) {
      console.error('[NyayaSaathiVoiceService] Speech playback failed:', err?.message);
      this.isSpeakingState = false;
      this.isPausedState = false;
      this.notify(err?.message);
      if (onEndCallback) onEndCallback();
    }
  }

  public pause() {
    if (this.audioPlayer && this.isSpeakingState && !this.isPausedState) {
      this.audioPlayer.pause();
    }
  }

  public resume() {
    if (this.audioPlayer && this.isSpeakingState && this.isPausedState) {
      this.audioPlayer.play().catch((err) => {
        console.warn('[NyayaSaathiVoiceService] Resume failed:', err);
      });
    }
  }

  public stop() {
    if (this.audioPlayer) {
      try {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
      } catch (e) {
        // Ignore audio cleanup errors
      }
    }
    this.isSpeakingState = false;
    this.isPausedState = false;
    this.notify();
  }

  public replay() {
    if (this.currentSpeechText) {
      this.speak(this.currentSpeechText);
    }
  }
}

// Export single shared instance for the entire application
export const voiceService = new NyayaSaathiVoiceService();
export const nyayaSaathiVoiceService = voiceService;

/**
 * Microphone Voice Input for "Tell Me What Happened" and Voice Q&A
 */
export function startVoiceRecognition(
  lang: LanguageCode,
  onResult: (transcript: string) => void,
  onError?: (err: any) => void
): { stop: () => void } | null {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn('SpeechRecognition API not available in this browser');
    if (onError) onError(new Error('Speech recognition not supported in browser'));
    return null;
  }

  const recognition = new SpeechRecognition();
  const cfg = languageConfig[lang] || languageConfig.hi;
  recognition.lang = cfg.speechLanguage;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    if (event.results && event.results[0] && event.results[0][0]) {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    }
  };

  recognition.onerror = (event: any) => {
    console.warn('Speech recognition error:', event.error);
    if (onError) onError(event);
  };

  recognition.start();

  return {
    stop: () => {
      try {
        recognition.stop();
      } catch (e) {
        // Ignore stop error
      }
    },
  };
}
