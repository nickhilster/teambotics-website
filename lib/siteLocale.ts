export const siteLocales = ["en", "fr-CA", "es-419"] as const;
export const localizedRouteLocales = ["fr-CA", "es-419"] as const;

export type SiteLocale = (typeof siteLocales)[number];
export type LocalizedRouteLocale = (typeof localizedRouteLocales)[number];

type SiteNavItem = {
  href: string;
  label: string;
};

type CapabilityMessage = {
  title: string;
  body: string;
};

type EngagementStepMessage = {
  number: string;
  title: string;
  body: string;
};

export type SiteMessages = {
  header: {
    navLabel: string;
    navItems: SiteNavItem[];
    ctaLabel: string;
    openNavigationLabel: string;
    closeNavigationLabel: string;
    languageLabel: string;
  };
  footer: {
    navLabel: string;
    copyright: string;
    privacyLabel: string;
    termsLabel: string;
    linkedInLabel: string;
  };
  hero: {
    pill: string;
    titleLines: [string, string, string];
    copy: string;
    primaryCta: string;
    secondaryCta: string;
  };
  positioning: {
    eyebrow: string;
    title: string;
    paragraphs: [string, string];
    quote: string;
  };
  liveSystems: {
    eyebrow: string;
    title: string;
    description: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    description: string;
    items: CapabilityMessage[];
  };
  engagement: {
    eyebrow: string;
    title: string;
    description: string;
    steps: EngagementStepMessage[];
  };
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
    reviewSystemsLabel: string;
  };
  leadForm: {
    eyebrow: string;
    title: string;
    copy: string;
    honeypotLabel: string;
    fields: {
      name: string;
      email: string;
      organization: string;
      interestArea: string;
      message: string;
    };
    chooseFocusLabel: string;
    interestAreaLabels: Record<string, string>;
    messageHint: string;
    privacyPrefix: string;
    privacyLinkLabel: string;
    privacySuffix: string;
    submitLabel: string;
    submittingLabel: string;
    emailLabel: string;
    validationErrorLabel: string;
    spamSuccessLabel: string;
    requestErrorLabel: string;
    requestEmailFallbackLabel: string;
    successLabel: string;
  };
  productPage: {
    allProductsLabel: string;
    detailEyebrow: string;
    detailTitle: string;
    detailDescription: string;
    evidenceEyebrow: string;
    evidenceTitle: string;
    buildProfileEyebrow: string;
    technologyLabel: string;
    systemCapabilitiesLabel: string;
  };
};

export const siteLocaleLabels: Record<SiteLocale, string> = {
  en: "English",
  "fr-CA": "Francais",
  "es-419": "Espanol",
};

export const siteLocaleHtmlLang: Record<SiteLocale, string> = {
  en: "en",
  "fr-CA": "fr-CA",
  "es-419": "es-419",
};

export function getLocalePathPrefix(locale: SiteLocale) {
  return locale === "en" ? "" : `/${locale}`;
}

export function withLocalePath(locale: SiteLocale, path: string) {
  const [pathWithoutHash, hash = ""] = path.split("#", 2);
  const normalizedPath = pathWithoutHash === "/" ? "/" : pathWithoutHash.replace(/\/$/, "") || "/";
  const localizedPath = locale === "en"
    ? normalizedPath
    : normalizedPath === "/"
      ? `/${locale}`
      : `/${locale}${normalizedPath}`;

  return hash ? `${localizedPath}#${hash}` : localizedPath;
}

export function stripLocaleFromPath(pathname: string) {
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "") || "/";

  for (const locale of localizedRouteLocales) {
    if (normalizedPath === `/${locale}`) {
      return {
        locale,
        pathname: "/",
      } as const;
    }

    if (normalizedPath.startsWith(`/${locale}/`)) {
      return {
        locale,
        pathname: normalizedPath.slice(locale.length + 1),
      } as const;
    }
  }

  return {
    locale: "en",
    pathname: normalizedPath,
  } as const;
}

const siteMessages: Record<SiteLocale, SiteMessages> = {
  en: {
    header: {
      navLabel: "Primary",
      navItems: [
        { href: "#systems", label: "Systems" },
        { href: "#capabilities", label: "Capabilities" },
        { href: "#engagement", label: "Approach" },
        { href: "#contact", label: "Contact" },
      ],
      ctaLabel: "Start a conversation",
      openNavigationLabel: "Open navigation",
      closeNavigationLabel: "Close navigation",
      languageLabel: "Language",
    },
    footer: {
      navLabel: "Footer",
      copyright:
        "© 2026 Teambotics. An independent AI lab - proprietary products and bespoke systems for selected partners.",
      privacyLabel: "Privacy",
      termsLabel: "Terms",
      linkedInLabel: "LinkedIn",
    },
    hero: {
      pill: "Independent AI lab · Products & bespoke systems",
      titleLines: ["Built for the", "environments that", "don't forgive mistakes."],
      copy:
        "An independent AI lab shipping proprietary products and bespoke systems for a small number of partners - operated by agents that run without a clock.",
      primaryCta: "Review systems",
      secondaryCta: "How we work",
    },
    positioning: {
      eyebrow: "WHAT WE DO",
      title: "We start from the constraints. Not the capability.",
      paragraphs: [
        "We don't arrive with a pre-built solution. We spend time inside the operational context first - understanding workflows, edge cases, and why things break - then build something that fits. Across compliance, workforce operations, and digital experiences, the approach stays the same.",
        "We help teams decide what should be automated, what should stay guided, and how new capability fits the work people already do. Architecture grounded in real operating conditions means adoption and long-term usability are part of the product - not an afterthought.",
      ],
      quote: "Disciplined process. Systems that last.",
    },
    liveSystems: {
      eyebrow: "AI SYSTEMS PORTFOLIO",
      title: "Four products. Different stages. One standard.",
      description:
        "Some are ours, some are bespoke, all are built to the same bar - clarity, adoption, and systems that hold up after launch.",
    },
    capabilities: {
      eyebrow: "CORE COMPETENCIES",
      title: "Built to hold up in practice.",
      description:
        "How we approach architecture, automation, and interface design across every engagement - consistently and without shortcuts.",
      items: [
        {
          title: "Scoped MVPs that ship",
          body: "We define precise product boundaries early - identifying the highest-value workflows and the clearest path from first build to production without scope drift.",
        },
        {
          title: "Compliant workflow automation",
          body: "We build AI systems around real handoffs, regulatory constraints, and training needs - so new workflows hold up in practice, not just in demos.",
        },
        {
          title: "Interfaces people want to use",
          body: "We design interfaces around the people doing the work: reducing cognitive load, supporting gradual onboarding, and building confidence over time.",
        },
      ],
    },
    engagement: {
      eyebrow: "ENGAGEMENT METHODOLOGY",
      title: "A deliberate path to production.",
      description:
        "A structured methodology from early opportunity framing to a production-ready workflow system.",
      steps: [
        {
          number: "01",
          title: "Discovery & Scoping",
          body: "We start by listening. Every engagement begins with time in the operational context - understanding constraints, failure modes, and what has already been tried.",
        },
        {
          number: "02",
          title: "System Architecture",
          body: "We translate what we learned into data models, enablement flows, compliant automation, and interfaces designed around how people actually work - not how they're supposed to.",
        },
        {
          number: "03",
          title: "Controlled Pilot",
          body: "We deploy a contained build, gather real feedback from the team using it, and refine the workflow before any broader rollout. No soft launches that quietly go unmaintained.",
        },
        {
          number: "04",
          title: "Operational Rollout",
          body: "We move from pilot to production with stable routines, structured enablement, and a clear roadmap - so the system grows with the team instead of aging out of it.",
        },
      ],
    },
    cta: {
      eyebrow: "GET IN TOUCH",
      title: "Most of our best work started with a direct conversation.",
      copy:
        "Tell us what you're working on. We'll be direct about what's possible and whether we're the right team for it.",
      reviewSystemsLabel: "Review our systems",
    },
    leadForm: {
      eyebrow: "Lead intake",
      title: "Tell Teambotics what you are trying to improve.",
      copy:
        "Keep it short. We use this to understand the workflow, team, or product problem you want to discuss.",
      honeypotLabel: "Website",
      fields: {
        name: "Name",
        email: "Email",
        organization: "Organization",
        interestArea: "Interest area",
        message: "Message",
      },
      chooseFocusLabel: "Choose a focus",
      interestAreaLabels: {
        "Workflow strategy": "Workflow strategy",
        "Team enablement": "Team enablement",
        "AI chatbot or assistant": "AI chatbot or assistant",
        "Legal/compliance workflow": "Legal/compliance workflow",
        "Creative or interactive platform": "Creative or interactive platform",
        Other: "Other",
      },
      messageHint: "Outline the problem, timeline, or team context.",
      privacyPrefix:
        "By sending this form, you agree that Teambotics may use your information to respond to your inquiry. See our ",
      privacyLinkLabel: "Privacy Policy",
      privacySuffix: ".",
      submitLabel: "Start a conversation",
      submittingLabel: "Sending...",
      emailLabel: "Prefer email?",
      validationErrorLabel: "Please fix the highlighted fields and try again.",
      spamSuccessLabel: "Thanks. Your note has been received.",
      requestErrorLabel: "Unable to send your message right now.",
      requestEmailFallbackLabel: "Unable to send your message right now. Please try email instead.",
      successLabel: "Thanks. Teambotics will follow up shortly.",
    },
    productPage: {
      allProductsLabel: "All products",
      detailEyebrow: "System Detail",
      detailTitle: "How the product earns trust.",
      detailDescription:
        "Each Teambotics product is framed as a practical system: clear user value, controlled AI behavior, and a path from prototype to operational adoption.",
      evidenceEyebrow: "Evidence",
      evidenceTitle: "What this work demonstrates.",
      buildProfileEyebrow: "Build Profile",
      technologyLabel: "Technology",
      systemCapabilitiesLabel: "System capabilities",
    },
  },
  "fr-CA": {
    header: {
      navLabel: "Navigation principale",
      navItems: [
        { href: "#systems", label: "Systemes" },
        { href: "#capabilities", label: "Capacites" },
        { href: "#engagement", label: "Approche" },
        { href: "#contact", label: "Contact" },
      ],
      ctaLabel: "Commencer une conversation",
      openNavigationLabel: "Ouvrir la navigation",
      closeNavigationLabel: "Fermer la navigation",
      languageLabel: "Langue",
    },
    footer: {
      navLabel: "Pied de page",
      copyright:
        "© 2026 Teambotics. Un laboratoire IA independant - produits proprietaires et systemes sur mesure pour des partenaires selectionnes.",
      privacyLabel: "Confidentialite",
      termsLabel: "Conditions",
      linkedInLabel: "LinkedIn",
    },
    hero: {
      pill: "Laboratoire IA independant · Produits et systemes sur mesure",
      titleLines: ["Concu pour les", "environnements ou", "l'erreur ne pardonne pas."],
      copy:
        "Un laboratoire IA independant qui livre des produits proprietaires et des systemes sur mesure pour un petit nombre de partenaires - operes par des agents qui tournent sans horloge.",
      primaryCta: "Voir les systemes",
      secondaryCta: "Notre approche",
    },
    positioning: {
      eyebrow: "CE QUE NOUS FAISONS",
      title: "Nous partons des contraintes. Pas de la capacite.",
      paragraphs: [
        "Nous n'arrivons pas avec une solution prefabriquee. Nous passons d'abord du temps dans le contexte operationnel - pour comprendre les workflows, les cas limites et les points de rupture - puis nous concevons quelque chose qui s'y adapte. Qu'il s'agisse de conformite, d'operations d'equipe ou d'experiences numeriques, l'approche reste la meme.",
        "Nous aidons les equipes a decider ce qui doit etre automatise, ce qui doit rester guide, et comment une nouvelle capacite s'integre au travail deja en place. Une architecture ancree dans les conditions reelles fait de l'adoption et de la durabilite une partie du produit - pas une reflexion tardive.",
      ],
      quote: "Processus rigoureux. Des systemes qui durent.",
    },
    liveSystems: {
      eyebrow: "PORTEFEUILLE DE SYSTEMES IA",
      title: "Quatre produits. Des stades differents. Une seule exigence.",
      description:
        "Certains sont a nous, d'autres sont sur mesure, mais tous sont construits selon le meme standard - clarte, adoption et tenue dans le temps apres le lancement.",
    },
    capabilities: {
      eyebrow: "COMPETENCES CLES",
      title: "Concu pour tenir dans la pratique.",
      description:
        "Notre approche de l'architecture, de l'automatisation et du design d'interface dans chaque mandat - avec constance et sans raccourci.",
      items: [
        {
          title: "Des MVP cadres qui se rendent en production",
          body: "Nous definissons tot des frontieres produit precises - pour trouver les workflows les plus utiles et le chemin le plus clair entre premiere version et production, sans derive de perimetre.",
        },
        {
          title: "Une automatisation conforme au terrain",
          body: "Nous construisons des systemes IA autour de vrais transferts, des contraintes reglementaires et des besoins de formation - pour que les nouveaux workflows tiennent en pratique, pas seulement en demo.",
        },
        {
          title: "Des interfaces que les equipes ont envie d'utiliser",
          body: "Nous dessinons les interfaces autour des personnes qui font le travail: moins de charge cognitive, une montee en main progressive et une confiance qui se construit avec le temps.",
        },
      ],
    },
    engagement: {
      eyebrow: "METHODOLOGIE D'ENGAGEMENT",
      title: "Un chemin deliberement construit vers la production.",
      description:
        "Une methode structuree, du cadrage initial de l'opportunite jusqu'au systeme de workflow pret pour la production.",
      steps: [
        {
          number: "01",
          title: "Decouverte et cadrage",
          body: "Nous commencons par ecouter. Chaque mandat debute dans le contexte operationnel - pour comprendre les contraintes, les modes d'echec et ce qui a deja ete tente.",
        },
        {
          number: "02",
          title: "Architecture du systeme",
          body: "Nous transformons ces apprentissages en modeles de donnees, parcours d'habilitation, automatisation conforme et interfaces pensees autour du travail reel - pas du travail theorique.",
        },
        {
          number: "03",
          title: "Pilote controle",
          body: "Nous deployons une version contenue, recueillons de vrais retours de l'equipe qui l'utilise, puis affinons le workflow avant tout deploiement plus large. Pas de faux lancements laisses sans suivi.",
        },
        {
          number: "04",
          title: "Passage operationnel",
          body: "Nous passons du pilote a la production avec des routines stables, une habilitation structuree et une feuille de route claire - pour que le systeme grandisse avec l'equipe au lieu de se perimer.",
        },
      ],
    },
    cta: {
      eyebrow: "PARLONS-EN",
      title: "Une grande partie de notre meilleur travail commence par une conversation directe.",
      copy:
        "Expliquez-nous ce que vous construisez. Nous serons directs sur ce qui est possible et sur le fait de savoir si nous sommes la bonne equipe.",
      reviewSystemsLabel: "Voir nos systemes",
    },
    leadForm: {
      eyebrow: "Prise de contact",
      title: "Dites a Teambotics ce que vous cherchez a ameliorer.",
      copy:
        "Restez bref. Nous utilisons ceci pour comprendre le probleme de workflow, d'equipe ou de produit que vous voulez discuter.",
      honeypotLabel: "Site web",
      fields: {
        name: "Nom",
        email: "Courriel",
        organization: "Organisation",
        interestArea: "Sujet d'interet",
        message: "Message",
      },
      chooseFocusLabel: "Choisir un sujet",
      interestAreaLabels: {
        "Workflow strategy": "Strategie de workflow",
        "Team enablement": "Habilitation des equipes",
        "AI chatbot or assistant": "Chatbot ou assistant IA",
        "Legal/compliance workflow": "Workflow legal ou conformite",
        "Creative or interactive platform": "Plateforme creative ou interactive",
        Other: "Autre",
      },
      messageHint: "Decrivez le probleme, l'echeancier ou le contexte de l'equipe.",
      privacyPrefix:
        "En envoyant ce formulaire, vous acceptez que Teambotics utilise vos informations pour repondre a votre demande. Consultez notre ",
      privacyLinkLabel: "Politique de confidentialite",
      privacySuffix: ".",
      submitLabel: "Commencer une conversation",
      submittingLabel: "Envoi...",
      emailLabel: "Preferer le courriel?",
      validationErrorLabel: "Veuillez corriger les champs en surbrillance puis reessayer.",
      spamSuccessLabel: "Merci. Votre message a bien ete recu.",
      requestErrorLabel: "Impossible d'envoyer votre message pour le moment.",
      requestEmailFallbackLabel: "Impossible d'envoyer votre message pour le moment. Essayez plutot par courriel.",
      successLabel: "Merci. Teambotics assurera un suivi sous peu.",
    },
    productPage: {
      allProductsLabel: "Tous les produits",
      detailEyebrow: "Detail du systeme",
      detailTitle: "Comment le produit gagne la confiance.",
      detailDescription:
        "Chaque produit Teambotics est presente comme un systeme concret: une valeur claire pour l'utilisateur, un comportement IA maitrise et un chemin du prototype jusqu'a l'adoption operationnelle.",
      evidenceEyebrow: "Preuves",
      evidenceTitle: "Ce que ce travail demontre.",
      buildProfileEyebrow: "Profil de mise en production",
      technologyLabel: "Technologie",
      systemCapabilitiesLabel: "Capacites du systeme",
    },
  },
  "es-419": {
    header: {
      navLabel: "Navegacion principal",
      navItems: [
        { href: "#systems", label: "Sistemas" },
        { href: "#capabilities", label: "Capacidades" },
        { href: "#engagement", label: "Enfoque" },
        { href: "#contact", label: "Contacto" },
      ],
      ctaLabel: "Iniciar una conversacion",
      openNavigationLabel: "Abrir navegacion",
      closeNavigationLabel: "Cerrar navegacion",
      languageLabel: "Idioma",
    },
    footer: {
      navLabel: "Pie de pagina",
      copyright:
        "© 2026 Teambotics. Un laboratorio independiente de IA - productos propietarios y sistemas a medida para socios seleccionados.",
      privacyLabel: "Privacidad",
      termsLabel: "Terminos",
      linkedInLabel: "LinkedIn",
    },
    hero: {
      pill: "Laboratorio independiente de IA · Productos y sistemas a medida",
      titleLines: ["Disenado para los", "entornos donde", "los errores no se perdonan."],
      copy:
        "Un laboratorio independiente de IA que entrega productos propietarios y sistemas a medida para un grupo reducido de socios - operados por agentes que trabajan sin reloj.",
      primaryCta: "Ver sistemas",
      secondaryCta: "Como trabajamos",
    },
    positioning: {
      eyebrow: "LO QUE HACEMOS",
      title: "Partimos de las restricciones. No de la capacidad.",
      paragraphs: [
        "No llegamos con una solucion prefabricada. Primero nos metemos en el contexto operativo - entendemos workflows, casos limite y por que se rompen las cosas - y despues construimos algo que realmente encaje. Ya sea en cumplimiento, operaciones de equipos o experiencias digitales, el enfoque es el mismo.",
        "Ayudamos a los equipos a decidir que debe automatizarse, que debe seguir siendo guiado y como una nueva capacidad encaja en el trabajo que la gente ya hace. Una arquitectura anclada en condiciones reales hace que la adopcion y la durabilidad formen parte del producto - no una idea tardia.",
      ],
      quote: "Proceso disciplinado. Sistemas que perduran.",
    },
    liveSystems: {
      eyebrow: "PORTAFOLIO DE SISTEMAS DE IA",
      title: "Cuatro productos. Etapas distintas. Un mismo estandar.",
      description:
        "Algunos son propios, otros son a medida, pero todos se construyen con la misma vara - claridad, adopcion y sistemas que se sostienen despues del lanzamiento.",
    },
    capabilities: {
      eyebrow: "CAPACIDADES CLAVE",
      title: "Pensado para sostenerse en la practica.",
      description:
        "Asi abordamos arquitectura, automatizacion y diseno de interfaces en cada compromiso - con consistencia y sin atajos.",
      items: [
        {
          title: "MVP acotados que llegan a produccion",
          body: "Definimos temprano limites de producto precisos - identificando los workflows de mayor valor y el camino mas claro desde la primera version hasta produccion sin deriva de alcance.",
        },
        {
          title: "Automatizacion compatible con el entorno real",
          body: "Construimos sistemas de IA alrededor de transferencias reales, restricciones regulatorias y necesidades de entrenamiento - para que los nuevos workflows funcionen en la practica, no solo en demos.",
        },
        {
          title: "Interfaces que la gente quiere usar",
          body: "Disenamos interfaces alrededor de quienes hacen el trabajo: menos carga cognitiva, incorporacion gradual y una confianza que crece con el tiempo.",
        },
      ],
    },
    engagement: {
      eyebrow: "METODOLOGIA DE TRABAJO",
      title: "Un camino deliberado hacia produccion.",
      description:
        "Una metodologia estructurada, desde la definicion inicial de la oportunidad hasta un sistema de workflow listo para produccion.",
      steps: [
        {
          number: "01",
          title: "Descubrimiento y alcance",
          body: "Empezamos escuchando. Cada compromiso comienza dentro del contexto operativo - entendiendo restricciones, modos de falla y lo que ya se intento.",
        },
        {
          number: "02",
          title: "Arquitectura del sistema",
          body: "Traducimos lo aprendido en modelos de datos, flujos de habilitacion, automatizacion compatible y interfaces disenadas alrededor de como la gente trabaja de verdad - no de como se supone que deberia trabajar.",
        },
        {
          number: "03",
          title: "Piloto controlado",
          body: "Desplegamos una version contenida, reunimos retroalimentacion real del equipo que la usa y refinamos el workflow antes de cualquier despliegue mas amplio. Nada de lanzamientos suaves que queden abandonados.",
        },
        {
          number: "04",
          title: "Despliegue operativo",
          body: "Pasamos del piloto a produccion con rutinas estables, habilitacion estructurada y una hoja de ruta clara - para que el sistema crezca con el equipo en lugar de quedarse viejo.",
        },
      ],
    },
    cta: {
      eyebrow: "HABLEMOS",
      title: "Gran parte de nuestro mejor trabajo empieza con una conversacion directa.",
      copy:
        "Cuentanos en que estas trabajando. Vamos a ser directos sobre lo que es posible y sobre si somos el equipo adecuado para hacerlo.",
      reviewSystemsLabel: "Ver nuestros sistemas",
    },
    leadForm: {
      eyebrow: "Contacto inicial",
      title: "Cuentale a Teambotics lo que quieres mejorar.",
      copy:
        "Hazlo breve. Usamos esto para entender el problema de workflow, equipo o producto que quieres conversar.",
      honeypotLabel: "Sitio web",
      fields: {
        name: "Nombre",
        email: "Correo",
        organization: "Organizacion",
        interestArea: "Area de interes",
        message: "Mensaje",
      },
      chooseFocusLabel: "Elige un enfoque",
      interestAreaLabels: {
        "Workflow strategy": "Estrategia de workflow",
        "Team enablement": "Habilitacion de equipos",
        "AI chatbot or assistant": "Chatbot o asistente de IA",
        "Legal/compliance workflow": "Workflow legal o de cumplimiento",
        "Creative or interactive platform": "Plataforma creativa o interactiva",
        Other: "Otro",
      },
      messageHint: "Resume el problema, el plazo o el contexto del equipo.",
      privacyPrefix:
        "Al enviar este formulario, aceptas que Teambotics use tu informacion para responder a tu consulta. Consulta nuestra ",
      privacyLinkLabel: "Politica de Privacidad",
      privacySuffix: ".",
      submitLabel: "Iniciar una conversacion",
      submittingLabel: "Enviando...",
      emailLabel: "Prefieres correo?",
      validationErrorLabel: "Corrige los campos marcados e intenta de nuevo.",
      spamSuccessLabel: "Gracias. Hemos recibido tu mensaje.",
      requestErrorLabel: "No podemos enviar tu mensaje en este momento.",
      requestEmailFallbackLabel: "No podemos enviar tu mensaje en este momento. Prueba por correo.",
      successLabel: "Gracias. Teambotics te respondera pronto.",
    },
    productPage: {
      allProductsLabel: "Todos los productos",
      detailEyebrow: "Detalle del sistema",
      detailTitle: "Como el producto se gana la confianza.",
      detailDescription:
        "Cada producto de Teambotics se plantea como un sistema practico: valor claro para la persona usuaria, comportamiento de IA controlado y un camino desde el prototipo hasta la adopcion operativa.",
      evidenceEyebrow: "Evidencia",
      evidenceTitle: "Lo que este trabajo demuestra.",
      buildProfileEyebrow: "Perfil de construccion",
      technologyLabel: "Tecnologia",
      systemCapabilitiesLabel: "Capacidades del sistema",
    },
  },
};

export function getSiteMessages(locale: SiteLocale): SiteMessages {
  return siteMessages[locale];
}

export function isSiteLocale(value: string): value is SiteLocale {
  return siteLocales.includes(value as SiteLocale);
}