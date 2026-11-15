"use client";

import { LeadCaptureForm } from "@/components/home/LeadCaptureForm";
import { useSiteLocale } from "@/components/theme/LocaleProvider";
import { siteConfig } from "@/lib/config";
import { Tagline } from "@/components/layout/Tagline";
import styles from "./ConsultancyHome.module.css";

const copy = {
  en: {
    eyebrow: "AI consultancy · from workflow to working system",
    title: "Make AI useful where the work happens.",
    intro: "Teambotics works with teams to find the real task, put the AI tools they already have on it, and build the one missing piece when the workflow needs it. Frontline customer service is where we do this most.",
    discuss: "Discuss your workflow",
    seeMethod: "See how we work",
    methodLabel: "The method",
    methodTitle: "Map the task before choosing the tool.",
    methodIntro: "Every system we ship starts as a handoff — what the person does, what the agent does, who reviews it. We map that before proposing a build.",
    steps: ["State the goal", "Provide approved context", "Agent drafts the work", "A person reviews it", "Deliver the result", "Record what should change"],
    methodNote: "Existing tools stay in the loop when they fit. We design only the piece that is missing.",
    methodExampleLabel: "A possible handoff, not a client result",
    methodExample: "For a frontline service question: approved policy context → agent draft → human review → corrections that inform the next run.",
    proofLabel: "Selected work",
    proofTitle: "Selected work.",
    proposals: "Proposals",
    products: "Published products and early access",
    prototypes: "Submitted and delivered prototypes",
    open: "View project",
    pilotLabel: "A possible starting format",
    pilotTitle: "Start with one workflow.",
    pilotIntro: "Start with a two-week pilot. Before work begins we agree on access, deliverables, acceptance criteria, and support — in writing.",
    weekOne: "Week 1 · Understand and enable",
    weekOneCopy: "Map the task, handoffs, constraints, and tools already available.",
    weekTwo: "Week 2 · Build the bridge",
    weekTwoCopy: "Prototype one agreed gap and review the result with the people who will use it.",
    contactLabel: "Start a conversation",
    contactTitle: "What work should AI make easier for your team?",
    contactCopy: "Tell us where the task stalls, what tools you already use, and what a useful first result would look like. Send a brief or email us to start the conversation.",
  },
  "fr-CA": {
    eyebrow: "Conseil en IA · du processus au système utilisable",
    title: "Rendre l’IA utile là où le travail se fait.",
    intro: "Teambotics travaille avec les équipes pour cerner la tâche réelle, mettre les outils d’IA qu’elles ont déjà sur cette tâche, et construire la pièce manquante lorsque le processus en a besoin. Le service à la clientèle de première ligne est le domaine où nous appliquons le plus cette méthode.",
    discuss: "Parlons de votre processus",
    seeMethod: "Voir notre approche",
    methodLabel: "La méthode",
    methodTitle: "Commencer par le travail, puis choisir les outils.",
    methodIntro: "Chaque système que nous livrons commence par un transfert : ce que fait la personne, ce que fait l’agent, qui révise. Nous définissons ce transfert avant de proposer quoi que ce soit.",
    steps: ["Intention humaine", "Contexte délimité", "Travail de l’agent", "Révision humaine", "Résultat utilisable", "Leçons pour la suite"],
    methodNote: "Nous conservons les outils existants lorsqu’ils conviennent et concevons un lien ciblé pour combler l’écart.",
    methodExampleLabel: "Exemple de transfert, pas un résultat client",
    methodExample: "Pour une question de service : contexte approuvé → brouillon de l’agent → révision humaine → corrections pour la prochaine exécution.",
    proofLabel: "Travaux sélectionnés",
    proofTitle: "Travaux sélectionnés.",
    proposals: "Propositions",
    products: "Produits publiés et accès anticipé",
    prototypes: "Prototypes soumis et livrés",
    open: "Voir le projet",
    pilotLabel: "Un point de départ possible",
    pilotTitle: "Une équipe. Un processus. Un lien convenu.",
    pilotIntro: "Commencez par un pilote de deux semaines. Avant le début des travaux, nous convenons par écrit de l’accès, des livrables, des critères d’acceptation et du soutien.",
    weekOne: "Semaine 1 · Comprendre et outiller",
    weekOneCopy: "Cartographier la tâche, les transferts, les contraintes et les outils disponibles.",
    weekTwo: "Semaine 2 · Créer le lien",
    weekTwoCopy: "Prototyper une lacune convenue et examiner le résultat avec les personnes concernées.",
    contactLabel: "Entamons la conversation",
    contactTitle: "Quel travail l’IA devrait-elle faciliter pour votre équipe?",
    contactCopy: "Décrivez le point de blocage, vos outils actuels et le premier résultat utile. Envoyez un bref descriptif ou écrivez-nous pour entamer la conversation.",
  },
  "es-419": {
    eyebrow: "Consultoría de IA · del flujo de trabajo al sistema útil",
    title: "Hacer que la IA sirva donde ocurre el trabajo.",
    intro: "Teambotics trabaja con los equipos para encontrar la tarea real, poner las herramientas de IA que ya tienen sobre esa tarea y construir la pieza que falta cuando el flujo la necesita. La atención al cliente de primera línea es donde más aplicamos este método.",
    discuss: "Hablemos de tu flujo de trabajo",
    seeMethod: "Conoce nuestro método",
    methodLabel: "El método",
    methodTitle: "Empezar por el trabajo y luego elegir las herramientas.",
    methodIntro: "Cada sistema que entregamos empieza como un traspaso: qué hace la persona, qué hace el agente, quién lo revisa. Definimos ese traspaso antes de proponer cualquier construcción.",
    steps: ["Intención humana", "Contexto delimitado", "Trabajo del agente", "Revisión humana", "Resultado útil", "Aprendizaje para la siguiente vez"],
    methodNote: "Mantenemos las herramientas existentes cuando funcionan y diseñamos un enlace específico para cubrir lo que falta.",
    methodExampleLabel: "Ejemplo de traspaso, no un resultado de cliente",
    methodExample: "Para una consulta de atención: contexto aprobado → borrador del agente → revisión humana → correcciones para la siguiente ejecución.",
    proofLabel: "Trabajo seleccionado",
    proofTitle: "Trabajo seleccionado.",
    proposals: "Propuestas",
    products: "Productos publicados y acceso anticipado",
    prototypes: "Prototipos presentados y entregados",
    open: "Ver proyecto",
    pilotLabel: "Un posible punto de partida",
    pilotTitle: "Un equipo. Un flujo. Un enlace acordado.",
    pilotIntro: "Empieza con un piloto de dos semanas. Antes de comenzar, acordamos por escrito el acceso, los entregables, los criterios de aceptación y el soporte.",
    weekOne: "Semana 1 · Comprender y habilitar",
    weekOneCopy: "Mapear la tarea, los traspasos, las limitaciones y las herramientas disponibles.",
    weekTwo: "Semana 2 · Construir el enlace",
    weekTwoCopy: "Crear un prototipo para una brecha acordada y revisar el resultado con quienes lo usarán.",
    contactLabel: "Iniciemos la conversación",
    contactTitle: "¿Qué trabajo debería facilitar la IA para tu equipo?",
    contactCopy: "Cuéntanos dónde se detiene la tarea, qué herramientas usan y cómo sería un primer resultado útil. Envía un resumen o escríbenos para iniciar la conversación.",
  },
} as const;

const evidence = {
  en: {
    proposals: [
      { name: "Instinct", detail: "A product concept where you can always see what state a review is in — and every agent voice has one distinct job.", href: "https://instinct.teambotics.app/" },
      { name: "Muse", detail: "A proposal for showing what Muse is doing, which sources it used, and when it needs a person's approval.", href: "https://muse.teambotics.app/" },
    ],
    products: [
      { name: "LTB Buddy", status: "Public beta", detail: "Free help for Ontario tenants — know your rights, prepare your filing, and walk into the hearing ready.", href: "https://ltbbuddy.ca/" },
      { name: "RyFine", status: "Live product", detail: "Draft an instruction, test it against real cases, and revise what fails.", href: "https://ryfine.app/" },
      { name: "Code2Motion", status: "Early access", detail: "Two browser-based creative tools: PlayRoom and ToyMaker.", href: "https://code2motion.app/" },
      { name: "Claim Checker", status: "Live product", detail: "An open, auditable claim-verification method — point your agent at a public claim, get back an audit with its sources.", href: "https://claimchecker.teambotics.app/" },
    ],
    prototypes: [
      { name: "RBH Marketer Agent", status: "Submitted prototype", detail: "A campaign-drafting agent built for a regulated brand. It drafts; a person reviews every draft for compliance before anything ships.", href: "https://rbh.teambotics.app/" },
      { name: "IKOKI", status: "Prototype delivered", detail: "A rooftop knowledge chatbot for IKO — installers and reps ask, and it answers from IKO's own product documents.", href: "https://ikoki.teambotics.app/" },
    ],
  },
  "fr-CA": {
    proposals: [
      { name: "Instinct", detail: "Un concept de produit où l’on voit toujours à quelle étape se trouve une révision — et où chaque voix d’agent a un rôle distinct.", href: "https://instinct.teambotics.app/" },
      { name: "Muse", detail: "Une proposition de design pour rendre le travail des agents, la confiance et l’identité plus lisibles.", href: "https://muse.teambotics.app/" },
    ],
    products: [
      { name: "LTB Buddy", status: "Bêta publique", detail: "Une aide gratuite pour les locataires ontariens — connaissez vos droits, préparez votre demande et arrivez prêt à l’audience.", href: "https://ltbbuddy.ca/" },
      { name: "RyFine", status: "Produit en ligne", detail: "Un processus plus clair pour rédiger et améliorer les instructions destinées à l’IA.", href: "https://ryfine.app/" },
      { name: "Code2Motion", status: "Accès anticipé", detail: "Explorer PlayRoom et ToyMaker pour des expériences créatives natives du navigateur.", href: "https://code2motion.app/" },
      { name: "Claim Checker", status: "Produit en ligne", detail: "Une méthode ouverte et vérifiable de vérification des affirmations — confiez une affirmation publique à votre agent et recevez un audit avec ses sources.", href: "https://claimchecker.teambotics.app/" },
    ],
    prototypes: [
      { name: "RBH Marketer Agent", status: "Prototype soumis", detail: "Un agent de rédaction de campagnes conçu pour une marque réglementée. Il rédige; une personne révise chaque brouillon pour conformité avant tout envoi.", href: "https://rbh.teambotics.app/" },
      { name: "IKOKI", status: "Prototype livré", detail: "Un robot de connaissances sur les toitures pour IKO — les installateurs et les représentants posent leurs questions, et il répond à partir des documents produits d’IKO.", href: "https://ikoki.teambotics.app/" },
    ],
  },
  "es-419": {
    proposals: [
      { name: "Instinct", detail: "Un concepto de producto donde siempre se ve en qué estado está una revisión, y cada voz de agente tiene un trabajo distinto.", href: "https://instinct.teambotics.app/" },
      { name: "Muse", detail: "Una propuesta de diseño para hacer más legible el trabajo de agentes, la confianza y la identidad.", href: "https://muse.teambotics.app/" },
    ],
    products: [
      { name: "LTB Buddy", status: "Beta pública", detail: "Ayuda gratuita para inquilinos de Ontario: conoce tus derechos, prepara tu solicitud y llega listo a la audiencia.", href: "https://ltbbuddy.ca/" },
      { name: "RyFine", status: "Producto disponible", detail: "Un proceso más claro para escribir y mejorar instrucciones para IA.", href: "https://ryfine.app/" },
      { name: "Code2Motion", status: "Acceso anticipado", detail: "Explora PlayRoom y ToyMaker para experiencias creativas nativas del navegador.", href: "https://code2motion.app/" },
      { name: "Claim Checker", status: "Producto disponible", detail: "Un método abierto y auditable de verificación de afirmaciones: entrega una afirmación pública a tu agente y recibe una auditoría con sus fuentes.", href: "https://claimchecker.teambotics.app/" },
    ],
    prototypes: [
      { name: "RBH Marketer Agent", status: "Prototipo presentado", detail: "Un agente de redacción de campañas creado para una marca regulada. Redacta borradores; una persona revisa cada borrador por cumplimiento antes de que salga.", href: "https://rbh.teambotics.app/" },
      { name: "IKOKI", status: "Prototipo entregado", detail: "Un chatbot de conocimiento sobre techos para IKO: instaladores y representantes preguntan, y responde desde los documentos de producto de IKO.", href: "https://ikoki.teambotics.app/" },
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
          <p className={styles.brandTagline}><Tagline /></p>
          <h1 id="home-title">{t.title}</h1>
          <p className={styles.lede}>{t.intro}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#contact">{t.discuss} <span aria-hidden="true">↗</span></a>
            <a className={styles.secondary} href="#systems">{t.seeMethod} <span aria-hidden="true">↓</span></a>
          </div>
        </div>
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
          <div className={styles.methodExample}><span>{t.methodExampleLabel}</span><p>{t.methodExample}</p></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.proof}`} id="capabilities" aria-labelledby="proof-title">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>{t.proofLabel} / 02</p>
          <div className={styles.sectionHead}>
            <h2 id="proof-title">{t.proofTitle}</h2>
          </div>
          <h3 className={styles.groupTitle}>{t.products}</h3>
          <div className={styles.grid}>
            {work.products.map((item) => <article className={styles.card} key={item.name}><span className={styles.tag}>{item.status}</span><h4>{item.name}</h4><p>{item.detail}</p><a href={item.href} target="_blank" rel="noopener noreferrer">{t.open} ↗</a></article>)}
          </div>
          <h3 className={styles.groupTitle}>{t.prototypes}</h3>
          <div className={styles.grid}>
            {work.prototypes.map((item) => <article className={styles.card} key={item.name}><span className={styles.tag}>{item.status}</span><h4>{item.name}</h4><p>{item.detail}</p><a href={item.href} target="_blank" rel="noopener noreferrer">{t.open} ↗</a></article>)}
          </div>
          <h3 className={styles.groupTitle}>{t.proposals}</h3>
          <div className={styles.grid}>
            {work.proposals.map((item) => <article className={styles.card} key={item.name}><span className={styles.tag}>{t.proposals}</span><h4>{item.name}</h4><p>{item.detail}</p><a href={item.href} target="_blank" rel="noopener noreferrer">{t.open} ↗</a></article>)}
          </div>
        </div>
      </section>

      <section className={styles.section} id="engagement" aria-labelledby="pilot-title">
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>{t.pilotLabel} / 03</p>
          <div className={styles.sectionHead}><h2 id="pilot-title">{t.pilotTitle}</h2><p>{t.pilotIntro}</p></div>
          <div className={styles.weeks}><div><span>01</span><h3>{t.weekOne}</h3><p>{t.weekOneCopy}</p></div><div><span>02</span><h3>{t.weekTwo}</h3><p>{t.weekTwoCopy}</p></div></div>
          <a className={styles.textLink} href="#contact">{t.discuss} ↗</a>
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
