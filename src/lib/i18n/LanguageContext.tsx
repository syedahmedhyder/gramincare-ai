"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SupportedLanguage, SUPPORTED_LANGUAGES, TranslationDictionary } from "./types";
import { en } from "./en";
import { kn } from "./kn";
import { hi } from "./hi";
import { te } from "./te";
import { ta } from "./ta";
import { ml } from "./ml";
import { mr } from "./mr";
import { bn } from "./bn";
import { ur } from "./ur";

const dictionaries: Record<SupportedLanguage, TranslationDictionary> = {
  en,
  kn,
  hi,
  te,
  ta,
  ml,
  mr,
  bn,
  ur,
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: keyof TranslationDictionary) => string;
  speechLocale: string;
  isSpeaking: boolean;
  speak: (text: string) => void;
  stopSpeaking: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gramincare_language") as SupportedLanguage;
      if (saved && dictionaries[saved]) {
        setLanguageState(saved);
      }
    } catch {
      // Ignore localStorage issues in private mode or SSR
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("gramincare_language", lang);
    } catch {
      // Ignore
    }
    stopSpeaking();
  };

  const t = (key: keyof TranslationDictionary): string => {
    const dict = dictionaries[language] || dictionaries.en;
    return dict[key] || dictionaries.en[key] || String(key);
  };

  const currentOption = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const speechLocale = currentOption.speechLocale;

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported in this browser environment.");
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = speechLocale;
      utterance.rate = 0.95; // Slightly slower for clear rural comprehension
      utterance.pitch = 1.0;

      // Find matching voice if available
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith(language) || v.lang.includes(speechLocale));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Speech playback error:", err);
      setIsSpeaking(false);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        speechLocale,
        isSpeaking,
        speak,
        stopSpeaking,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
