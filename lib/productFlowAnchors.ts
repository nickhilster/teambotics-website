import type { SiteLocale } from "@/lib/i18n/types";

type ProductAnchorSet = {
  tagline: string;
  summary: string;
  focusPoint: string;
};

type LocalizedProductAnchors = Partial<Record<SiteLocale, ProductAnchorSet>>;

export const productFlowAnchors: Record<string, LocalizedProductAnchors> = {
  ryfine: {
    en: {
      tagline: "turn rough instructions, project context, and operating rules into clearer AI-ready prompts",
      summary: "move from rough intent to sharper execution",
      focusPoint: "turn messy intent into instructions a model can execute reliably",
    },
    "fr-CA": {
      tagline: "transformer des instructions brouillonnes, du contexte projet et des regles operationnelles en prompts plus clairs et prets pour l'IA",
      summary: "passer d'une intention brouillonne a une execution plus nette",
      focusPoint: "transformer une intention brouillonne en instructions qu'un modele peut executer de facon fiable",
    },
    "es-419": {
      tagline: "convertir instrucciones iniciales, contexto de proyecto y reglas operativas en prompts mas claros y listos para IA",
      summary: "pasar de una intencion inicial a una ejecucion mas clara",
      focusPoint: "convertir una intencion desordenada en instrucciones que un modelo pueda ejecutar con fiabilidad",
    },
  },
  code2motion: {
    en: {
      tagline: "turns code, motion, and generative interaction into playable digital experiences",
      summary: "packages generative motion, playful interaction, and PWA-ready delivery",
      focusPoint: "discovery layer for interactive c2merses, motion studies, and browser-native creative tools",
    },
    "fr-CA": {
      tagline: "transforme le code, le mouvement et l'interaction generative en experiences numeriques jouables",
      summary: "transforme le mouvement generatif, l'interaction ludique et la diffusion en PWA",
      focusPoint: "outils creatifs natifs du navigateur",
    },
    "es-419": {
      tagline: "convierte codigo, movimiento e interaccion generativa en experiencias digitales jugables",
      summary: "Convierte movimiento generativo, interaccion ludica y despliegue listo para PWA",
      focusPoint: "herramientas creativas nativas del navegador",
    },
  },
  "ltb-buddy": {
    en: {
      tagline: "from plain-language issue description to a cleaner, more complete LTB application",
      summary: "turns a stressful legal workflow into a guided intake experience",
      focusPoint: "difficult to complete without legal context",
    },
    "fr-CA": {
      tagline: "passer d'une description en langage clair a une demande plus propre et plus complete",
      summary: "transforme un workflow juridique stressant en une experience d'intake guidee",
      focusPoint: "difficile a mener sans contexte juridique",
    },
    "es-419": {
      tagline: "pasar de una descripcion en lenguaje claro a una solicitud mas limpia y completa",
      summary: "convierte un workflow legal estresante en una experiencia de intake guiada",
      focusPoint: "dificil de completar sin contexto legal",
    },
  },
  redactorbuddy: {
    en: {
      tagline: "strips sensitive personal data from financial documents entirely on-device",
      summary: "keeps the workflow entirely on-device",
      focusPoint: "sensitive files do not need to leave the device",
    },
  },
  mdownmanager: {
    en: {
      tagline: "structured, searchable knowledge system for AI-ready work",
      summary: "creates a cleaner knowledge layer that supports retrieval, handoff, and local AI workflows",
      focusPoint: "hard to search, maintain, and reuse at scale",
    },
  },
  easybuddy: {
    en: {
      tagline: "realistic customer scenarios, and confident workflow recall",
      summary: "prepare before live customer interactions",
      focusPoint: "from routine service explanations to tense or ambiguous conversations",
    },
    "fr-CA": {
      tagline: "integration plus rapide, de scenarios clients realistes et d'un rappel de workflow plus confiant",
      summary: "se preparer avant les interactions reelles avec les clients",
      focusPoint: "jusqu'aux conversations tendues ou ambiguës",
    },
    "es-419": {
      tagline: "incorporacion mas rapida, escenarios realistas con clientes y mejor recuerdo del workflow",
      summary: "prepararse antes de las interacciones reales con clientes",
      focusPoint: "desde explicaciones rutinarias de servicio hasta conversaciones tensas o ambiguas",
    },
  },
  storytellr: {
    en: {
      tagline: "helps people show who they are, what they've built, and why it matters",
      summary: "connects decisions, projects, collaborators, and outcomes in one readable view",
      focusPoint: "miss how decisions, projects, collaborators, and outcomes actually connect",
    },
    "fr-CA": {
      tagline: "a montrer qui elles sont, ce qu'elles ont bati et pourquoi cela compte",
      summary: "relie decisions, projets, collaborateurs et resultats dans une vue lisible",
      focusPoint: "maniere dont decisions, projets, collaborateurs et resultats se relient reellement",
    },
    "es-419": {
      tagline: "ayuda a mostrar quien es una persona, que ha construido y por que importa",
      summary: "Conecta decisiones, proyectos, colaboradores y resultados en una vista legible",
      focusPoint: "como se conectan realmente decisiones, proyectos, colaboradores y resultados",
    },
  },
  recruiterbuddy: {
    en: {
      tagline: "profile research, claim verification, dossier review, and role-fit analysis",
      summary: "move faster, ask sharper questions, and align teams with less manual research",
      focusPoint: "Signals are surfaced as verified, plausible, unverifiable, or contradictory",
    },
  },
};

export function getProductFlowAnchors(slug: string, locale: SiteLocale): ProductAnchorSet | undefined {
  const localized = productFlowAnchors[slug];
  return localized?.[locale] ?? localized?.en;
}
