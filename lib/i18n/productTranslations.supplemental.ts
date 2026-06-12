import type { GeneratedProductTranslation, SiteLocale } from "@/lib/i18n/types";

export const supplementalProductTranslations: Partial<
  Record<Exclude<SiteLocale, "en">, Record<string, GeneratedProductTranslation>>
> = {
  "fr-CA": {
    ryfine: {
      title: "Workflow de raffinement de prompts",
      label: "Produit en ligne",
      stage: "Produit en ligne",
      statusLabel: "PRODUIT EN LIGNE",
      market: "UX de prompt / IA appliquee / Habilitation de workflow",
      tagline:
        "Une couche locale de raffinement de prompts qui aide les gens a transformer des instructions brouillonnes, du contexte projet et des regles operationnelles en prompts plus clairs et prets pour l'IA.",
      description:
        "Un produit de raffinement de prompts pour les utilisateurs qui ont besoin d'instructions plus claires avant de confier le travail a ChatGPT, Claude, Gemini, Copilot, Cursor ou d'autres outils IA.",
      summary:
        "RyFine aide les utilisateurs a passer d'une intention brouillonne a une execution plus nette. Il combine UX de prompt, contexte reutilisable, workflows adaptes aux fournisseurs et controle local afin d'ameliorer les instructions sans devenir expert en prompt engineering.",
      heroSummary:
        "Des prompts plus clairs, un contexte plus solide et une execution plus sure avant le travail avec l'IA.",
      impact:
        "Positionne Teambotics comme constructeur de produits IA pratiques qui ameliorent le cote humain de l'interaction avec les modeles.",
      tags: ["UX de prompt", "Ingenierie du contexte", "IA locale d'abord"],
      aiCapabilities: [
        "Raffinement de prompts avant execution",
        "Prompts et contexte projet reutilisables",
        "Routage de workflows selon le fournisseur",
        "Posture de confidentialite locale d'abord",
      ],
      focusPoints: [
        {
          label: "Le probleme",
          value:
            "La plupart des outils IA commencent encore par une zone vide. Les utilisateurs savent ce qu'ils veulent, mais peinent souvent a transformer une intention brouillonne en instructions qu'un modele peut executer de facon fiable.",
        },
        {
          label: "Le workflow",
          value:
            "RyFine se place avant l'appel au modele. Il aide les utilisateurs a structurer intention, contexte, regles et attentes de sortie pour que l'interaction IA suivante parte d'une couche d'instructions plus forte.",
        },
        {
          label: "Le standard",
          value:
            "Le produit traite la qualite des prompts comme du design d'interface, pas comme une formule magique. L'objectif est une clarte repetable, le controle utilisateur et un meilleur contexte avant l'automatisation.",
        },
      ],
      proofPoints: [
        "Transforme des prompts brouillons en instructions plus claires avant l'envoi vers des systemes IA.",
        "Soutient des structures de prompts reutilisables, du contexte projet et des workflows adaptes aux fournisseurs.",
        "S'inscrit dans une posture locale d'abord ou les cles controlees par l'utilisateur, le stockage local et les appels directs aux fournisseurs font partie du modele de confiance.",
        "Demontre la capacite de Teambotics a livrer des outils IA appliques qui ameliorent l'adoption au niveau du workflow.",
      ],
      detailSections: [
        {
          title: "Cadre produit",
          body:
            "RyFine est la couche de prompt avant l'execution. Il donne aux utilisateurs un endroit plus clair pour faconner intention, contexte, contraintes et attentes avant de demander a un systeme IA d'agir.",
        },
        {
          title: "Approche d'interface",
          body:
            "L'experience est concue autour du raffinement plutot que du remplacement. Les utilisateurs gardent le controle pendant que le produit les aide a structurer de meilleures instructions, comparer les sorties et reutiliser des modeles plus solides.",
        },
        {
          title: "Adequation business",
          body:
            "Pour les equipes qui adoptent l'IA, RyFine montre comment l'habilitation pratique peut commencer a la couche d'instruction: de meilleurs prompts, un contexte plus clair, moins de devinettes et un workflow plus enseignable.",
        },
      ],
      externalLabel: "Ouvrir le produit",
      supportLabel: "Parler de RyFine",
      ctaLabel: "Lire l'etude de cas",
    },
  },
  "es-419": {
    ryfine: {
      title: "Flujo de refinamiento de prompts",
      label: "Producto en vivo",
      stage: "Producto en vivo",
      statusLabel: "PRODUCTO EN VIVO",
      market: "UX de prompts / IA aplicada / Habilitacion de flujos de trabajo",
      tagline:
        "Una capa local de refinamiento de prompts que ayuda a convertir instrucciones iniciales, contexto de proyecto y reglas operativas en prompts mas claros y listos para IA.",
      description:
        "Un producto de refinamiento de prompts para usuarios que necesitan instrucciones mas claras antes de llevar el trabajo a ChatGPT, Claude, Gemini, Copilot, Cursor u otras herramientas de IA.",
      summary:
        "RyFine ayuda a pasar de una intencion inicial a una ejecucion mas clara. Combina UX de prompts, contexto reutilizable, flujos adaptados al proveedor y control local para mejorar instrucciones sin exigir que la persona sea experta en prompt engineering.",
      heroSummary:
        "Prompts mas claros, contexto mas fuerte y ejecucion mas segura antes de trabajar con IA.",
      impact:
        "Posiciona a Teambotics como constructor de productos practicos de IA que mejoran el lado humano de la interaccion con modelos.",
      tags: ["UX de prompts", "Ingenieria de contexto", "IA local-first"],
      aiCapabilities: [
        "Refinamiento de prompts antes de ejecutar",
        "Prompts y contexto de proyecto reutilizables",
        "Ruteo de flujos segun proveedor",
        "Postura de privacidad local-first",
      ],
      focusPoints: [
        {
          label: "El problema",
          value:
            "La mayoria de las herramientas de IA todavia empiezan con una caja vacia. Las personas saben lo que quieren, pero suelen tener dificultad para convertir una intencion desordenada en instrucciones que un modelo pueda ejecutar con fiabilidad.",
        },
        {
          label: "El flujo",
          value:
            "RyFine se ubica antes de la llamada al modelo. Ayuda a estructurar intencion, contexto, reglas y expectativas de salida para que la siguiente interaccion con IA empiece desde una capa de instrucciones mas fuerte.",
        },
        {
          label: "El estandar",
          value:
            "El producto trata la calidad del prompt como diseno de interfaz, no como palabras magicas. El objetivo es claridad repetible, control del usuario y mejor contexto antes de ejecutar automatizacion.",
        },
      ],
      proofPoints: [
        "Convierte prompts iniciales en instrucciones mas claras antes de enviarlas a sistemas de IA.",
        "Soporta estructuras reutilizables de prompts, contexto de proyecto y flujos adaptados al proveedor.",
        "Encaja con una postura local-first donde claves controladas por el usuario, almacenamiento local y llamadas directas a proveedores son parte del modelo de confianza.",
        "Demuestra la capacidad de Teambotics para lanzar herramientas de IA aplicada que mejoran la adopcion en la capa de flujo de trabajo.",
      ],
      detailSections: [
        {
          title: "Enfoque de producto",
          body:
            "RyFine es la capa de prompts antes de la ejecucion. Da a los usuarios un lugar mas claro para dar forma a intencion, contexto, restricciones y expectativas antes de pedirle a un sistema de IA que actue.",
        },
        {
          title: "Enfoque de interfaz",
          body:
            "La experiencia esta disenada alrededor del refinamiento, no del reemplazo. Los usuarios mantienen el control mientras el producto les ayuda a estructurar mejores instrucciones, comparar resultados y reutilizar patrones mas fuertes.",
        },
        {
          title: "Encaje de negocio",
          body:
            "Para equipos que adoptan IA, RyFine muestra como la habilitacion practica puede empezar en la capa de instrucciones: mejores prompts, contexto mas claro, menos adivinanza y un flujo mas facil de ensenar.",
        },
      ],
      externalLabel: "Abrir producto",
      supportLabel: "Hablar de RyFine",
      ctaLabel: "Leer caso",
    },
  },
};
