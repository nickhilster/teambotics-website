"use client";

import { LeadCaptureForm } from "@/components/home/LeadCaptureForm";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
import styles from "./ConsultancyHome.module.css";

const copy = {
  en: {
    eyebrow: "AI consultancy · from workflow to working system",
    title: "Make AI useful where the work happens.",
    intro: "Teambotics works alongside teams to understand the real task, put existing AI tools to work, and build the missing bridge when the workflow needs one.",
    discuss: "Discuss your workflow",
    seeMethod: "See how we work",
    methodLabel: "The method",
    methodTitle: "Start with the work, then choose the tools.",
    methodIntro: "A useful system begins with a clear handoff between people and agents. We map that handoff before proposing a build.",
    steps: ["Human intent", "Scoped context", "Agent work", "Human review", "Usable output", "Next-run lessons"],
    methodNote: "Existing tools stay in the loop when they fit. We design a focused bridge for the gap they leave.",
    proofLabel: "Selected work",
    proofTitle: "Ideas you can inspect. Claims you can place.",
    proofIntro: "These are different kinds of evidence: published products, submitted proposals, and paid prototypes. Their labels describe the relationship accurately.",
    proposals: "Submitted proposals",
    products: "Published products and MVPs",
    prototypes: "Paid prototype work",
    open: "View project",
    privateNote: "Case study preview · sanitized visuals in preparation",
    pilotLabel: "A possible starting format",
    pilotTitle: "One team. One workflow. One agreed bridge.",
    pilotIntro: "A two-week pilot can be a useful starting point. We scope access, deliverables, acceptance criteria, and support with each team before work begins.",
    weekOne: "Week 1 · Understand and enable",
    weekOneCopy: "Map the task, handoffs, constraints, and tools already available.",
    weekTwo: "Week 2 · Build the bridge",
    weekTwoCopy: "Prototype one agreed gap and review the result with the people who will use it.",
    credibilityLabel: "Perspective",
    credibilityTitle: "Grounded in the work behind the workflow.",
    credibilityCopy: "Nikhil Khedkar's experience spans customer service supporting Rogers Wireless through Gemma Communications, frontline team leadership at Best Buy Canada, and platform enablement at RBH. These are prior roles and account experience, not Teambotics client engagements.",
    contactLabel: "Start a conversation",
    contactTitle: "What work should AI make easier for your team?",
    contactCopy: "Tell us where the task stalls, what tools you already use, and what a useful first result would look like. A booking link is coming; the brief form and email are available now.",
  },
  "fr-CA": {
    eyebrow: "Conseil en IA · du processus au système utilisable",
    title: "Rendre l’IA utile là où le travail se fait.",
    intro: "Teambotics travaille avec les équipes pour comprendre la tâche réelle, mettre à profit les outils d’IA existants et créer le lien manquant lorsque le processus en a besoin.",
    discuss: "Parlons de votre processus",
    seeMethod: "Voir notre approche",
    methodLabel: "La méthode",
    methodTitle: "Commencer par le travail, puis choisir les outils.",
    methodIntro: "Un système utile repose sur un transfert clair entre les personnes et les agents. Nous définissons ce transfert avant de proposer une solution.",
    steps: ["Intention humaine", "Contexte délimité", "Travail de l’agent", "Révision humaine", "Résultat utilisable", "Leçons pour la suite"],
    methodNote: "Nous conservons les outils existants lorsqu’ils conviennent et concevons un lien ciblé pour combler l’écart.",
    proofLabel: "Travaux sélectionnés",
    proofTitle: "Des idées à examiner. Des réalisations bien situées.",
    proofIntro: "Ces exemples représentent différents types de preuves : produits publiés, propositions soumises et prototypes rémunérés.",
    proposals: "Propositions soumises",
    products: "Produits publiés et MVP",
    prototypes: "Prototypes rémunérés",
    open: "Voir le projet",
    privateNote: "Aperçu de l’étude de cas · visuels anonymisés en préparation",
    pilotLabel: "Un point de départ possible",
    pilotTitle: "Une équipe. Un processus. Un lien convenu.",
    pilotIntro: "Un pilote de deux semaines peut être un bon départ. Nous définissons l’accès, les livrables, les critères d’acceptation et le soutien avec chaque équipe.",
    weekOne: "Semaine 1 · Comprendre et outiller",
    weekOneCopy: "Cartographier la tâche, les transferts, les contraintes et les outils disponibles.",
    weekTwo: "Semaine 2 · Créer le lien",
    weekTwoCopy: "Prototyper une lacune convenue et examiner le résultat avec les personnes concernées.",
    credibilityLabel: "Expérience",
    credibilityTitle: "Une perspective ancrée dans le travail réel.",
    credibilityCopy: "L’expérience de Nikhil Khedkar comprend le service à la clientèle pour Rogers Wireless par l’entremise de Gemma Communications, la direction d’une équipe de première ligne chez Best Buy Canada et l’habilitation de plateformes chez RBH. Il s’agit d’expériences professionnelles antérieures, et non de mandats clients de Teambotics.",
    contactLabel: "Entamons la conversation",
    contactTitle: "Quel travail l’IA devrait-elle faciliter pour votre équipe?",
    contactCopy: "Décrivez le point de blocage, vos outils actuels et le premier résultat utile. Un lien de réservation suivra; le formulaire et le courriel sont disponibles dès maintenant.",
  },
  "es-419": {
    eyebrow: "Consultoría de IA · del flujo de trabajo al sistema útil",
    title: "Hacer que la IA sirva donde ocurre el trabajo.",
    intro: "Teambotics trabaja con los equipos para entender la tarea real, aprovechar las herramientas de IA existentes y construir el enlace que falta cuando el flujo lo necesita.",
    discuss: "Hablemos de tu flujo de trabajo",
    seeMethod: "Conoce nuestro método",
    methodLabel: "El método",
    methodTitle: "Empezar por el trabajo y luego elegir las herramientas.",
    methodIntro: "Un sistema útil empieza con un traspaso claro entre personas y agentes. Definimos ese traspaso antes de proponer una solución.",
    steps: ["Intención humana", "Contexto delimitado", "Trabajo del agente", "Revisión humana", "Resultado útil", "Aprendizaje para la siguiente vez"],
    methodNote: "Mantenemos las herramientas existentes cuando funcionan y diseñamos un enlace específico para cubrir lo que falta.",
    proofLabel: "Trabajo seleccionado",
    proofTitle: "Ideas que puedes explorar. Resultados con contexto.",
    proofIntro: "Estos ejemplos son distintos tipos de evidencia: productos publicados, propuestas presentadas y prototipos remunerados.",
    proposals: "Propuestas presentadas",
    products: "Productos publicados y MVP",
    prototypes: "Prototipos remunerados",
    open: "Ver proyecto",
    privateNote: "Avance del caso · imágenes depuradas en preparación",
    pilotLabel: "Un posible punto de partida",
    pilotTitle: "Un equipo. Un flujo. Un enlace acordado.",
    pilotIntro: "Un piloto de dos semanas puede ser un buen comienzo. Definimos acceso, entregables, criterios de aceptación y soporte con cada equipo.",
    weekOne: "Semana 1 · Comprender y habilitar",
    weekOneCopy: "Mapear la tarea, los traspasos, las limitaciones y las herramientas disponibles.",
    weekTwo: "Semana 2 · Construir el enlace",
    weekTwoCopy: "Crear un prototipo para una brecha acordada y revisar el resultado con quienes lo usarán.",
    credibilityLabel: "Experiencia",
    credibilityTitle: "Una perspectiva basada en el trabajo real.",
    credibilityCopy: "La experiencia de Nikhil Khedkar incluye atención al cliente para Rogers Wireless a través de Gemma Communications, liderazgo de primera línea en Best Buy Canada y habilitación de plataformas en RBH. Son empleos y experiencia previos, no proyectos de clientes de Teambotics.",
    contactLabel: "Iniciemos la conversación",
    contactTitle: "¿Qué trabajo debería facilitar la IA para tu equipo?",
    contactCopy: "Cuéntanos dónde se detiene la tarea, qué herramientas usan y cómo sería un primer resultado útil. Pronto habrá un enlace para reservar; el formulario y el correo ya están disponibles.",
  },
} as const;

const evidence = {
  en: {
    proposals: [
      { name: "Instinct", detail: "Trust, visible review states, and voices in an agent-assisted product concept.", href: "https://instinct.teambotics.app/" },
      { name: "Muse", detail: "A product-design proposal for legible agent work, trust, and identity.", href: "https://muse.teambotics.app/" },
    ],
    products: [
      { name: "LTB Buddy", status: "Public beta", detail: "Guided Ontario tenant intake and filing support.", href: "https://ltbbuddy.ca/" },
      { name: "RyFine", status: "Live product", detail: "A clearer workflow for writing and refining AI instructions.", href: "https://ryfine.app/" },
      { name: "Code2Motion", status: "MVP", detail: "Create, preview, and publish interactive motion work.", href: "https://code2motion.app/" },
    ],
    prototypes: [
      { name: "RBH Marketer Agent", status: "Paid submitted prototype", detail: "A campaign-drafting concept built after Nikhil’s RBH role and submitted to RBH. Drafts require human compliance review." },
      { name: "IKOKI", status: "Paid pilot prototype", detail: "A guided, role-aware knowledge access concept. IKO paid for the pilot and received the HTML prototype." },
    ],
  },
  "fr-CA": {
    proposals: [
      { name: "Instinct", detail: "Une proposition de produit assisté par agent axée sur la confiance, les étapes de révision visibles et les voix.", href: "https://instinct.teambotics.app/" },
      { name: "Muse", detail: "Une proposition de design pour rendre le travail des agents, la confiance et l’identité plus lisibles.", href: "https://muse.teambotics.app/" },
    ],
    products: [
      { name: "LTB Buddy", status: "Bêta publique", detail: "Accompagnement des locataires ontariens pour l’accueil et les demandes au Tribunal.", href: "https://ltbbuddy.ca/" },
      { name: "RyFine", status: "Produit en ligne", detail: "Un processus plus clair pour rédiger et améliorer les instructions destinées à l’IA.", href: "https://ryfine.app/" },
      { name: "Code2Motion", status: "MVP", detail: "Créer, prévisualiser et publier des projets de mouvement interactifs.", href: "https://code2motion.app/" },
    ],
    prototypes: [
      { name: "RBH Marketer Agent", status: "Prototype rémunéré soumis", detail: "Un concept de rédaction de campagnes créé après le poste de Nikhil chez RBH et soumis à RBH. Les brouillons exigent une révision humaine de conformité." },
      { name: "IKOKI", status: "Prototype pilote rémunéré", detail: "Un concept d’accès guidé aux connaissances selon les rôles. IKO a rémunéré le pilote et reçu le prototype HTML." },
    ],
  },
  "es-419": {
    proposals: [
      { name: "Instinct", detail: "Una propuesta de producto asistido por agentes sobre confianza, estados visibles de revisión y voces.", href: "https://instinct.teambotics.app/" },
      { name: "Muse", detail: "Una propuesta de diseño para hacer más legible el trabajo de agentes, la confianza y la identidad.", href: "https://muse.teambotics.app/" },
    ],
    products: [
      { name: "LTB Buddy", status: "Beta pública", detail: "Orientación para inquilinos de Ontario sobre admisión y solicitudes al tribunal.", href: "https://ltbbuddy.ca/" },
      { name: "RyFine", status: "Producto disponible", detail: "Un proceso más claro para escribir y mejorar instrucciones para IA.", href: "https://ryfine.app/" },
      { name: "Code2Motion", status: "MVP", detail: "Crear, previsualizar y publicar trabajo de movimiento interactivo.", href: "https://code2motion.app/" },
    ],
    prototypes: [
      { name: "RBH Marketer Agent", status: "Prototipo remunerado presentado", detail: "Un concepto de redacción de campañas creado después del empleo de Nikhil en RBH y presentado a RBH. Los borradores requieren revisión humana de cumplimiento." },
      { name: "IKOKI", status: "Prototipo de piloto remunerado", detail: "Un concepto de acceso guiado al conocimiento según el rol. IKO pagó el piloto y recibió el prototipo HTML." },
    ],
  },
} as const;

export function ConsultancyHome() {
  const { locale } = useSiteLocale();
  const t = copy[locale];
  const work = evidence[locale];

  return (
    <div className={`${styles.home} consultancy-home`}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h1 id="home-title">{t.title}</h1>
          <p className={styles.lede}>{t.intro}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#contact">{t.discuss} <span aria-hidden="true">↗</span></a>
            <a className={styles.secondary} href="#systems">{t.seeMethod} <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className={styles.heroIndex} aria-hidden="true">01 / 04&nbsp;&nbsp; HUMAN + AGENT WORKFLOWS</div>
      </section>

      <section className={styles.section} id="systems" aria-labelledby="method-title">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>{t.methodLabel} / 01</p>
          <div className={styles.sectionHead}>
            <h2 id="method-title">{t.methodTitle}</h2>
            <p>{t.methodIntro}</p>
          </div>
          <ol className={styles.flow}>
            {t.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}
          </ol>
          <p className={styles.methodNote}>{t.methodNote}</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.proof}`} id="capabilities" aria-labelledby="proof-title">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>{t.proofLabel} / 02</p>
          <div className={styles.sectionHead}>
            <h2 id="proof-title">{t.proofTitle}</h2>
            <p>{t.proofIntro}</p>
          </div>
          <h3 className={styles.groupTitle}>{t.proposals}</h3>
          <div className={styles.grid}>
            {work.proposals.map((item) => <article className={styles.card} key={item.name}><span className={styles.tag}>{t.proposals}</span><h4>{item.name}</h4><p>{item.detail}</p><a href={item.href} target="_blank" rel="noopener noreferrer">{t.open} ↗</a></article>)}
          </div>
          <h3 className={styles.groupTitle}>{t.products}</h3>
          <div className={styles.grid}>
            {work.products.map((item) => <article className={styles.card} key={item.name}><span className={styles.tag}>{item.status}</span><h4>{item.name}</h4><p>{item.detail}</p><a href={item.href} target="_blank" rel="noopener noreferrer">{t.open} ↗</a></article>)}
          </div>
          <h3 className={styles.groupTitle}>{t.prototypes}</h3>
          <div className={styles.grid}>
            {work.prototypes.map((item) => <article className={styles.card} key={item.name}><span className={styles.tag}>{item.status}</span><h4>{item.name}</h4><p>{item.detail}</p><span className={styles.privateNote}>{t.privateNote}</span></article>)}
          </div>
        </div>
      </section>

      <section className={styles.section} id="engagement" aria-labelledby="pilot-title">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>{t.pilotLabel} / 03</p>
          <div className={styles.sectionHead}><h2 id="pilot-title">{t.pilotTitle}</h2><p>{t.pilotIntro}</p></div>
          <div className={styles.weeks}><div><span>01</span><h3>{t.weekOne}</h3><p>{t.weekOneCopy}</p></div><div><span>02</span><h3>{t.weekTwo}</h3><p>{t.weekTwoCopy}</p></div></div>
          <a className={styles.textLink} href="#contact">{t.discuss} ↗</a>
          <div className={styles.credibility}><p className={styles.eyebrow}>{t.credibilityLabel}</p><h3>{t.credibilityTitle}</h3><p>{t.credibilityCopy}</p></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.contact}`} id="contact" aria-labelledby="contact-title">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>{t.contactLabel} / 04</p>
          <div className={styles.sectionHead}><h2 id="contact-title">{t.contactTitle}</h2><p>{t.contactCopy}</p></div>
          <LeadCaptureForm />
        </div>
      </section>
    </div>
  );
}
