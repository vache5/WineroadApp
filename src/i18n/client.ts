"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLocale } from "@/i18n/config";
import { resources } from "@/i18n/resources";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    defaultNS: "common",
    ns: ["common"],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
