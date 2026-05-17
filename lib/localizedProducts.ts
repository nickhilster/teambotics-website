import {
  getProductBySlug,
  products as baseProducts,
  type ProductCaseStudy,
  type ProductDetailSection,
  type ProductFocusPoint,
} from "@/lib/products";
import { withLocalePath, type SiteLocale } from "@/lib/siteLocale";

type ProductTranslation = Partial<Pick<
  ProductCaseStudy,
  | "title"
  | "label"
  | "stage"
  | "statusLabel"
  | "market"
  | "tagline"
  | "description"
  | "summary"
  | "heroSummary"
  | "impact"
  | "tags"
  | "techStack"
  | "aiCapabilities"
  | "externalLabel"
  | "supportLabel"
>> & {
  ctaLabel?: string;
  focusPoints?: ProductFocusPoint[];
  proofPoints?: string[];
  detailSections?: ProductDetailSection[];
};

const localizedProductTranslations: Partial<Record<Exclude<SiteLocale, "en">, Record<string, ProductTranslation>>> = {
  "fr-CA": {
    code2motion: {
      title: "Plateforme d'art generatif interactif",
      label: "Acces anticipe",
      stage: "En acces anticipe",
      statusLabel: "ACCES ANTICIPE",
      market: "Technologie creative / Marques experience",
      tagline:
        "Un ecosysteme creatif natif du navigateur qui transforme le code, le mouvement et l'interaction generative en experiences numeriques jouables.",
      description:
        "Un ecosysteme double face qui transforme le code en experiences interactives. Decouvrez les c2merses dans le PlayRoom et creez des experiences web progressives sans expertise WebGL complexe dans ToyMaker.",
      summary:
        "Code2Motion represente le versant technologie creative de Teambotics. Il transforme le mouvement generatif, l'interaction ludique et la diffusion en PWA en une plateforme d'experiences web expressives.",
      heroSummary:
        "Mouvement, code et atmosphere generative reunis dans une plateforme creative vivante.",
      impact:
        "Demontre la capacite de Teambotics a livrer des systemes interactifs expressifs, natifs du navigateur, au-dela des outils operationnels et tableaux de bord conventionnels.",
      tags: ["Art generatif", "PWA", "Mouvement interactif"],
      techStack: ["React", "Canvas", "PWA", "Mouvement generatif"],
      aiCapabilities: [
        "Workflows creatifs du prompt vers l'experience",
        "Structure d'interaction generative",
        "Iteration du systeme de mouvement",
      ],
      focusPoints: [
        {
          label: "PlayRoom",
          value:
            "Une couche de decouverte pour les c2merses interactifs, les etudes de mouvement et les outils creatifs natifs du navigateur.",
        },
        {
          label: "ToyMaker",
          value:
            "Une surface de creation pour construire des experiences web progressives sans imposer a chaque createur la complexite graphique de bas niveau.",
        },
        {
          label: "Signal plateforme",
          value:
            "Le projet prouve que Teambotics peut marier rigueur produit et design d'interaction expressif, riche en atmosphere.",
        },
      ],
      proofPoints: [
        "Construit autour d'experiences interactives natives du navigateur plutot qu'autour d'actifs de galerie statiques.",
        "Soutient un workflow creatif produit, de la decouverte a la creation.",
        "La direction de la plateforme cree des modeles reutilisables pour le mouvement, les visuels generatifs et la diffusion en PWA.",
        "Sa surface ludique complete les produits operationnels de Teambotics en montrant l'etendue et l'ambition de l'interface.",
      ],
      detailSections: [
        {
          title: "Systeme creatif",
          body:
            "Code2Motion traite l'art generatif comme un systeme produit reutilisable. Le but est de rendre le mouvement interactif explorable, remixable et deployable.",
        },
        {
          title: "Design d'experience",
          body:
            "La plateforme equilibre atmosphere et utilite en donnant un retour visuel immediat tout en gardant le modele de creation accessible.",
        },
        {
          title: "Role strategique",
          body:
            "Pour Teambotics, Code2Motion montre que la meme discipline d'ingenierie qui soutient les workflows peut aussi porter des experiences creatives et de marque memorables.",
        },
      ],
      externalLabel: "Ouvrir la plateforme",
      supportLabel: "Parler de Code2Motion",
      ctaLabel: "Lire l'etude de cas",
    },
    "ltb-buddy": {
      title: "Assistant guide d intake juridique",
      label: "Beta publique",
      stage: "Beta publique",
      statusLabel: "EN BETA",
      market: "Legal tech / Conformite / Operations",
      tagline:
        "Un assistant conversationnel de depot qui aide les locataires ontariens a passer d'une description en langage clair a une demande plus propre et plus complete.",
      description:
        "Une interface conversationnelle vocale qui simplifie les demandes a la Commission de la location immobiliere de l'Ontario. Elle reduit la complexite et structure les donnees sensibles avec une securite solide.",
      summary:
        "LTB Buddy transforme un workflow juridique stressant en une experience d'intake guidee. Il capte les problemes des locataires en langage clair, organise les details requis et facilite un parcours de depot plus confiant sans exiger la comprehension prealable des formulaires juridiques.",
      heroSummary:
        "D'une plainte a un soutien de depot structure, concu pour la clarte sous pression.",
      impact:
        "Concu pour reduire la friction de depot, ameliorer l'exhaustivite des demandes et rendre l'intake juridique plus facile pour des personnes non expertes.",
      tags: ["Legal tech", "Intake guide", "Conformite"],
      techStack: ["OpenAI", "Vercel", "Intake structure", "Workflow securise"],
      aiCapabilities: [
        "Capture des problemes en langage clair",
        "Flux conversationnel d'intake",
        "Extraction structuree des donnees de demande",
        "Guidage de workflow pour des formulaires complexes",
      ],
      focusPoints: [
        {
          label: "Le defi",
          value:
            "En Ontario, plusieurs locataires abandonnent des demandes legitimes parce que le processus est technique, stressant et difficile a mener sans contexte juridique.",
        },
        {
          label: "Le systeme",
          value:
            "Le produit resserre le workflow autour de questions guidees, de reponses structurees et d'etapes pratiques qui preservent l'intention de la personne utilisatrice.",
        },
        {
          label: "Le standard",
          value:
            "L'experience est construite autour de la clarte, de limites soigneusement posees et d'une confiance operationnelle plutot que de reponses generiques de chatbot.",
        },
      ],
      proofPoints: [
        "L'intake vocale reduit le probleme de la page blanche lorsque les locataires doivent decrire des situations difficiles.",
        "La capture structuree des donnees cree un pont plus clair entre la conversation et le remplissage du formulaire.",
        "Une redaction compatible avec la conformite aide sans surevaluer l'autorite juridique du produit.",
        "Le workflow est concu pour un contexte sensible et a enjeux eleves ou la confiance est centrale.",
      ],
      detailSections: [
        {
          title: "Cadre produit",
          body:
            "LTB Buddy n'est pas qu'une surface de clavardage. C'est un produit de workflow qui transforme des recits brouillons en donnees d'intake plus propres, sans sacrifier l'accessibilite de l'experience.",
        },
        {
          title: "Design d'experience",
          body:
            "L'interface privilegie une progression guidee, un langage simple et des retours qui renforcent la confiance afin que les personnes comprennent ce qui est saisi et pourquoi.",
        },
        {
          title: "Adequation operationnelle",
          body:
            "Le systeme est concu pour un workflow reglemente et fortement documente, ou la tracabilite, la retenue et la constance valent davantage que la nouveaute.",
        },
      ],
      externalLabel: "Ouvrir la beta",
      supportLabel: "Parler de LTB Buddy",
      ctaLabel: "Lire l'etude de cas",
    },
    easybuddy: {
      title: "Habilitation conversationnelle et integration",
      label: "MVP sur mesure",
      stage: "MVP sur mesure, en production",
      statusLabel: "MVP SUR MESURE",
      market: "Service automobile / Habilitation de workflow",
      tagline:
        "Un environnement de pratique alimente par l'IA pour les equipes de service qui ont besoin d'une integration plus rapide, de scenarios clients realistes et d'un rappel de workflow plus confiant.",
      description:
        "Un assistant IA concu pour les centres de service et concessions. Il simule de vraies interactions client pour guider les equipes dans des scenarios concrets et les flux de bons de reparation.",
      summary:
        "EasyBuddy aide les equipes de premiere ligne a se preparer avant les interactions reelles avec les clients. Il combine simulations, soutien de type politique interne et accompagnement adapte au ton pour que le personnel puisse pratiquer les moments difficiles avant qu'ils n'arrivent.",
      heroSummary:
        "Une preparation alimentee par l'IA pour les equipes de service avant que le client n'arrive.",
      impact:
        "Construit pour reduire la friction d'integration a travers les conversations client, le rappel des politiques et la preparation aux workflows de bon de reparation.",
      tags: ["Integration", "Simulation IA", "Operations"],
      techStack: ["OpenAI", "Conception de scenarios", "RAG", "Vercel"],
      aiCapabilities: [
        "Simulations de service a la clientele",
        "Coaching de jeux de role",
        "Recherche de politiques et de processus",
        "Prompts de preparation au quart",
      ],
      focusPoints: [
        {
          label: "Simulation",
          value:
            "Le personnel peut pratiquer de vraies situations client, des explications de service courantes jusqu'aux conversations tendues ou ambiguës.",
        },
        {
          label: "Habilitation",
          value:
            "L'assistant fait remonter la connaissance operationnelle au moment opportun plutot que de l'enfouir dans du materiel d'integration statique.",
        },
        {
          label: "Adoption",
          value:
            "Le produit est pense autour de la confiance et de la repetition, en faisant de l'IA un coach concret plutot qu'un substitut au jugement de premiere ligne.",
        },
      ],
      proofPoints: [
        "La pratique basee sur des scenarios soutient la preparation avant que le personnel entre dans des environnements de service reels.",
        "Les retours sensibles au ton aident a uniformiser l'experience client sans aplatir la communication humaine.",
        "La recherche de connaissances peut garder politiques, procedures et details de service au plus pres de la conversation.",
        "Le produit vise des environnements a fort roulement ou la rapidite d'integration et la constance sont critiques.",
      ],
      detailSections: [
        {
          title: "Cadre produit",
          body:
            "EasyBuddy traite l'integration comme une boucle active de pratique. La valeur centrale est d'aider les equipes a repeter decisions, langage et workflows avant que les enjeux soient reels.",
        },
        {
          title: "Approche interface",
          body:
            "L'experience est conversationnelle, mais sa conception est operationnelle: les scenarios, les politiques, le coaching et les suivis sont structures autour de la preparation au travail.",
        },
        {
          title: "Adequation d'affaires",
          body:
            "Le systeme convient bien aux organisations de service distribuees ou les gestionnaires ont besoin d'une qualite de formation coherente entre de nombreux sites et equipes changeantes.",
        },
      ],
      externalLabel: "Ouvrir le produit",
      supportLabel: "Parler d'EasyBuddy",
      ctaLabel: "Lire l'etude de cas",
    },
    storytellr: {
      title: "Graphe narratif oriente client",
      label: "Bientot",
      stage: "Apercus prives en cours",
      statusLabel: "BIENTOT",
      market: "Marques personnelles / Positionnement fondateur / Narration d'equipe",
      tagline:
        "Un graphe narratif oriente client qui aide les personnes a montrer qui elles sont, ce qu'elles ont bati et pourquoi cela compte.",
      description:
        "Une surface narrative interactive qui relie themes, etapes, relations et preuves afin que clients et collaborateurs comprennent un travail complexe plus vite qu'avec un profil statique.",
      summary:
        "Storytellr est en cours de construction comme une experience de graphe publique pour les parcours difficiles a expliquer dans une simple chronologie. Il relie decisions, projets, collaborateurs et resultats dans une vue lisible ou la capacite et la credibilite se comprennent plus vite.",
      heroSummary:
        "Une narration en graphe interactive pour les parcours professionnels complexes.",
      impact:
        "Concu pour les marques personnelles, les fondatrices et fondateurs, ainsi que les equipes qui ont besoin d'une surface narrative plus forte qu'un CV, une grille portfolio ou une page profil statique.",
      tags: ["Graphe narratif", "Positionnement", "Habilitation client"],
      techStack: ["Interface graphe interactive", "Curation narrative", "Controles de publication", "Flux d'onboarding"],
      aiCapabilities: [
        "Structuration narrative",
        "Cartographie des relations",
        "Curation de recit guidee",
        "Resumes orientes parties prenantes",
      ],
      focusPoints: [
        {
          label: "Contexte",
          value:
            "La plupart des pages profil montrent une suite de roles, mais elles ratent la maniere dont decisions, projets, collaborateurs et resultats se relient reellement.",
        },
        {
          label: "Graphe narratif",
          value:
            "Storytellr transforme ce contexte manquant en une experience de graphe lisible, organisee autour de themes, d'etapes et de relations plutot que d'une simple chronologie.",
        },
        {
          label: "Priorite de lancement",
          value:
            "La version actuelle se concentre sur un positionnement oriente client, avec un onboarding plus propre, des controles de curation legers et une publication publique soignee.",
        },
      ],
      proofPoints: [
        "Les parcours publics en graphe sont concus pour rendre un travail complexe plus facile a expliquer a des clients et parties prenantes.",
        "La structure du recit s'organise autour de themes, d'etapes et de relations plutot qu'autour d'un profil lineaire.",
        "Le travail de lancement se concentre sur un onboarding plus fluide et une mise en place plus simple pour les premieres utilisations.",
        "Les controles de publication sont penses pour garder la vue publique polie et intentionnelle.",
      ],
      detailSections: [
        {
          title: "Cadre produit",
          body:
            "Storytellr est une surface narrative orientee client pour les personnes qui ont besoin de plus qu'un profil statique. Sa valeur est la comprehension acceleree: qui est quelqu'un, ce qu'il ou elle a bati et pourquoi cela compte.",
        },
        {
          title: "Orientation de lancement",
          body:
            "La prochaine version se concentre sur une experience de graphe publique epuree, des controles legers pour organiser l'histoire et un onboarding qui aide les nouvelles utilisations a publier avec moins de friction.",
        },
        {
          title: "Pourquoi cela compte",
          body:
            "Le travail complexe perd de son sens lorsqu'il est aplati en roles ou cartes de projet deconnectes. Storytellr garde les elements relies ensemble afin que clients, collaborateurs et equipes de recrutement puissent suivre le recit avec son contexte.",
        },
      ],
      externalLabel: "Ouvrir l'apercu",
      supportLabel: "Parler de Storytellr",
      ctaLabel: "Lire l'etude de cas",
    },
  },
  "es-419": {
    code2motion: {
      title: "Plataforma interactiva de arte generativo",
      label: "Acceso anticipado",
      stage: "En acceso anticipado",
      statusLabel: "ACCESO ANTICIPADO",
      market: "Tecnologia creativa / Marcas orientadas a experiencias",
      tagline:
        "Un ecosistema creativo nativo del navegador que convierte codigo, movimiento e interaccion generativa en experiencias digitales jugables.",
      description:
        "Un ecosistema de doble cara que convierte codigo en experiencias interactivas. Descubre c2merses en el PlayRoom y crea experiencias web progresivas sin necesitar conocimiento complejo de WebGL en ToyMaker.",
      summary:
        "Code2Motion representa el borde creativo-tecnologico de Teambotics. Convierte movimiento generativo, interaccion ludica y despliegue listo para PWA en una plataforma para experiencias web expresivas.",
      heroSummary:
        "Movimiento, codigo y atmosfera generativa empaquetados en una plataforma creativa viva.",
      impact:
        "Demuestra la capacidad de Teambotics para lanzar sistemas interactivos expresivos, nativos del navegador, mas alla de herramientas operativas y tableros convencionales.",
      tags: ["Arte generativo", "PWA", "Movimiento interactivo"],
      techStack: ["React", "Canvas", "PWA", "Movimiento generativo"],
      aiCapabilities: [
        "Workflows creativos del prompt a la experiencia",
        "Andamiaje de interaccion generativa",
        "Iteracion del sistema de movimiento",
      ],
      focusPoints: [
        {
          label: "PlayRoom",
          value:
            "Una capa de descubrimiento para c2merses interactivos, estudios de movimiento y herramientas creativas nativas del navegador.",
        },
        {
          label: "ToyMaker",
          value:
            "Una superficie de creacion para construir experiencias web progresivas sin obligar a cada creador a entrar en complejidad grafica de bajo nivel.",
        },
        {
          label: "Senal de plataforma",
          value:
            "El proyecto demuestra que Teambotics puede combinar rigor de producto con un diseno de interaccion expresivo y con mucha atmosfera.",
        },
      ],
      proofPoints: [
        "Se construye alrededor de experiencias interactivas nativas del navegador, no alrededor de piezas estaticas de galeria.",
        "Sostiene un workflow creativo de producto desde el descubrimiento hasta la creacion.",
        "La direccion de la plataforma genera patrones reutilizables para movimiento, visuales generativos y despliegue como PWA.",
        "Su superficie ludica complementa los productos operativos de Teambotics al mostrar alcance y ambicion de interfaz.",
      ],
      detailSections: [
        {
          title: "Sistema creativo",
          body:
            "Code2Motion trata el arte generativo como un sistema de producto reutilizable. La meta es hacer que el movimiento interactivo sea explorable, remezclable y desplegable.",
        },
        {
          title: "Diseno de experiencia",
          body:
            "La plataforma equilibra atmosfera y usabilidad al ofrecer retroalimentacion visual inmediata mientras mantiene el modelo de creacion accesible.",
        },
        {
          title: "Rol estrategico",
          body:
            "Para Teambotics, Code2Motion demuestra que la misma disciplina de ingenieria usada en workflows operativos tambien puede impulsar experiencias creativas y de marca memorables.",
        },
      ],
      externalLabel: "Abrir plataforma",
      supportLabel: "Hablar de Code2Motion",
      ctaLabel: "Leer caso",
    },
    "ltb-buddy": {
      title: "Asistente guiado para intake legal",
      label: "Beta publica",
      stage: "Beta publica",
      statusLabel: "EN BETA",
      market: "Legal tech / Cumplimiento / Operaciones",
      tagline:
        "Un asistente conversacional de presentacion que ayuda a personas inquilinas de Ontario a pasar de una descripcion en lenguaje claro a una solicitud mas limpia y completa.",
      description:
        "Una interfaz conversacional por voz que agiliza solicitudes ante la Junta de Arrendamiento y Vivienda de Ontario. Reduce la complejidad y estructura datos sensibles con una seguridad robusta.",
      summary:
        "LTB Buddy convierte un workflow legal estresante en una experiencia de intake guiada. Captura problemas de inquilinos en lenguaje claro, organiza los detalles necesarios y apoya un camino de presentacion mas seguro sin exigir que la persona usuaria entienda primero los formularios legales.",
      heroSummary:
        "De la queja a un apoyo de presentacion estructurado, disenado para la claridad bajo presion.",
      impact:
        "Disenado para reducir la friccion al presentar, mejorar la integridad de las solicitudes y facilitar el intake legal para personas no expertas.",
      tags: ["Legal tech", "Intake guiado", "Cumplimiento"],
      techStack: ["OpenAI", "Vercel", "Intake estructurado", "Diseno de workflow seguro"],
      aiCapabilities: [
        "Captura de problemas en lenguaje claro",
        "Flujo conversacional de intake",
        "Extraccion estructurada de datos de solicitud",
        "Guia de workflow para formularios complejos",
      ],
      focusPoints: [
        {
          label: "El reto",
          value:
            "En Ontario, muchas personas inquilinas abandonan reclamos legitimos porque el proceso es tecnico, estresante y dificil de completar sin contexto legal.",
        },
        {
          label: "El sistema",
          value:
            "El producto reduce el workflow a preguntas guiadas, respuestas estructuradas y pasos practicos que conservan la intencion de la persona usuaria.",
        },
        {
          label: "El estandar",
          value:
            "La experiencia esta enmarcada alrededor de claridad, limites cuidadosos y confianza operativa, no respuestas genericas de chatbot.",
        },
      ],
      proofPoints: [
        "El intake por voz reduce el problema de la hoja en blanco cuando las personas describen situaciones dificiles de vivienda.",
        "La captura estructurada de datos crea un puente mas claro entre la conversacion y el llenado del formulario.",
        "La redaccion sensible al cumplimiento mantiene el producto util sin exagerar autoridad legal.",
        "El workflow esta disenado para un contexto sensible y de alto riesgo donde la confianza importa.",
      ],
      detailSections: [
        {
          title: "Enfoque de producto",
          body:
            "LTB Buddy no es solo una interfaz de chat. Es un producto de workflow para convertir narrativas desordenadas en datos de intake mas limpios sin perder cercania en la experiencia.",
        },
        {
          title: "Diseno de experiencia",
          body:
            "La interfaz prioriza progresion guiada, lenguaje claro y retroalimentacion que construye confianza para que la persona entienda que se esta capturando y por que.",
        },
        {
          title: "Encaje operativo",
          body:
            "El sistema esta disenado para un workflow regulado y cargado de documentos donde la trazabilidad, la moderacion y la consistencia importan mas que la novedad.",
        },
      ],
      externalLabel: "Abrir beta",
      supportLabel: "Hablar de LTB Buddy",
      ctaLabel: "Leer caso",
    },
    easybuddy: {
      title: "Habilitacion conversacional e incorporacion",
      label: "MVP a medida",
      stage: "MVP a medida, en produccion",
      statusLabel: "MVP A MEDIDA",
      market: "Servicio automotriz / Habilitacion de workflow",
      tagline:
        "Un entorno de practica impulsado por IA para equipos de servicio que necesitan incorporacion mas rapida, escenarios realistas con clientes y mejor recuerdo del workflow.",
      description:
        "Asistente de IA creado para centros de servicio y concesionarios. Simula interacciones reales con clientes para guiar al personal a traves de escenarios concretos y workflows de ordenes de reparacion.",
      summary:
        "EasyBuddy ayuda a los equipos de primera linea a prepararse antes de las interacciones reales con clientes. Combina simulaciones, soporte tipo politica interna y coaching sensible al tono para que el personal practique momentos dificiles antes de que ocurran.",
      heroSummary:
        "Preparacion impulsada por IA para equipos de servicio antes de que el cliente este enfrente.",
      impact:
        "Creado para reducir la friccion de incorporacion en conversaciones con clientes, recuerdo de politicas y preparacion para workflows de ordenes de reparacion.",
      tags: ["Incorporacion", "Simulacion IA", "Operaciones"],
      techStack: ["OpenAI", "Diseno de escenarios", "RAG", "Vercel"],
      aiCapabilities: [
        "Simulaciones de atencion al cliente",
        "Coaching de role-play",
        "Consulta de politicas y procesos",
        "Prompts de preparacion para el turno",
      ],
      focusPoints: [
        {
          label: "Simulacion",
          value:
            "El personal puede practicar situaciones reales con clientes, desde explicaciones rutinarias de servicio hasta conversaciones tensas o ambiguas.",
        },
        {
          label: "Habilitacion",
          value:
            "El asistente muestra conocimiento operativo en el momento de necesidad en lugar de enterrarlo en material estatico de incorporacion.",
        },
        {
          label: "Adopcion",
          value:
            "El producto esta moldeado alrededor de confianza y repeticion, haciendo de la IA un coach practico y no un reemplazo del criterio de primera linea.",
        },
      ],
      proofPoints: [
        "La practica basada en escenarios apoya la preparacion antes de que el personal entre a entornos reales de servicio.",
        "La retroalimentacion sensible al tono ayuda a estandarizar la experiencia del cliente sin aplanar la comunicacion humana.",
        "La recuperacion de conocimiento puede mantener politicas, procesos y detalles de servicio cerca de la conversacion.",
        "El producto apunta a entornos de alta rotacion donde la velocidad y consistencia de incorporacion son criticas.",
      ],
      detailSections: [
        {
          title: "Enfoque de producto",
          body:
            "EasyBuddy trata la incorporacion como un ciclo activo de practica. Su valor central es ayudar a los equipos a ensayar decisiones, lenguaje y workflows antes de que haya consecuencias reales.",
        },
        {
          title: "Enfoque de interfaz",
          body:
            "La experiencia es conversacional, pero el diseno subyacente es operativo: escenarios, politicas, coaching y seguimientos estan estructurados alrededor de la preparacion para el trabajo.",
        },
        {
          title: "Encaje de negocio",
          body:
            "El sistema encaja bien en organizaciones de servicio distribuidas donde la gerencia necesita calidad de entrenamiento consistente a traves de muchos sitios y equipos cambiantes.",
        },
      ],
      externalLabel: "Abrir producto",
      supportLabel: "Hablar de EasyBuddy",
      ctaLabel: "Leer caso",
    },
    storytellr: {
      title: "Grafo narrativo orientado al cliente",
      label: "Proximamente",
      stage: "Vistas previas privadas en curso",
      statusLabel: "PROXIMAMENTE",
      market: "Marcas personales / Posicionamiento de fundadores / Narrativa de equipos",
      tagline:
        "Un grafo narrativo orientado al cliente que ayuda a mostrar quien es una persona, que ha construido y por que importa.",
      description:
        "Una superficie narrativa interactiva que conecta temas, hitos, relaciones y evidencia para que clientes y colaboradores entiendan trabajo complejo mas rapido que con un perfil estatico.",
      summary:
        "Storytellr se esta construyendo como una experiencia publica de grafo para trabajos dificiles de explicar en una sola linea de tiempo. Conecta decisiones, proyectos, colaboradores y resultados en una vista legible donde la capacidad y la credibilidad se entienden con mayor rapidez.",
      heroSummary:
        "Narrativa en grafo interactiva para trayectorias profesionales complejas.",
      impact:
        "Creado para marcas personales, personas fundadoras y equipos que necesitan una superficie narrativa mas fuerte que un CV, una cuadricula de portafolio o una pagina de perfil estatica.",
      tags: ["Grafo narrativo", "Posicionamiento", "Habilitacion para clientes"],
      techStack: ["UI de grafo interactivo", "Curaduria narrativa", "Controles de publicacion", "Flujo de onboarding"],
      aiCapabilities: [
        "Estructuracion narrativa",
        "Mapeo de relaciones",
        "Curaduria guiada de historias",
        "Resumenes para partes interesadas",
      ],
      focusPoints: [
        {
          label: "Contexto",
          value:
            "La mayoria de las paginas de perfil muestran una secuencia de roles, pero no como se conectan realmente decisiones, proyectos, colaboradores y resultados.",
        },
        {
          label: "Grafo narrativo",
          value:
            "Storytellr convierte ese contexto ausente en una experiencia de grafo legible organizada alrededor de temas, hitos y relaciones en lugar de una linea de tiempo plana.",
        },
        {
          label: "Foco de lanzamiento",
          value:
            "La version actual se concentra en posicionamiento orientado a clientes, onboarding mas limpio, controles ligeros de curaduria y una publicacion publica cuidada.",
        },
      ],
      proofPoints: [
        "Los recorridos publicos en grafo estan pensados para explicar trabajo complejo con mayor claridad a clientes y partes interesadas.",
        "La estructura de la historia se organiza alrededor de temas, hitos y relaciones, no de un solo perfil lineal.",
        "El trabajo de lanzamiento esta centrado en un onboarding mas fluido y una configuracion mas sencilla para quienes usan el producto por primera vez.",
        "Los controles de publicacion se estan moldeando para mantener la vista publica pulida e intencional.",
      ],
      detailSections: [
        {
          title: "Enfoque de producto",
          body:
            "Storytellr es una superficie narrativa orientada a clientes para personas que necesitan algo mas que un perfil estatico. Su valor es acelerar la comprension: quien es alguien, que ha construido y por que importa.",
        },
        {
          title: "Direccion de lanzamiento",
          body:
            "La proxima version se centra en una experiencia publica de grafo limpia, controles ligeros para curar la historia y un onboarding que ayude a publicar con menos friccion.",
        },
        {
          title: "Por que importa",
          body:
            "El trabajo complejo pierde sentido cuando se aplana en roles o tarjetas de proyecto desconectadas. Storytellr mantiene el trabajo relacionado unido para que clientes, colaboradores y equipos de contratacion puedan seguir la historia con contexto.",
        },
      ],
      externalLabel: "Abrir vista previa",
      supportLabel: "Hablar de Storytellr",
      ctaLabel: "Leer caso",
    },
  },
};

export function getLocalizedProductBySlug(slug: string, locale: SiteLocale) {
  const product = getProductBySlug(slug);

  if (!product || locale === "en") {
    return product;
  }

  const translation = localizedProductTranslations[locale]?.[slug];
  if (!translation) {
    return product;
  }

  return {
    ...product,
    ...translation,
    tags: translation.tags ?? product.tags,
    techStack: translation.techStack ?? product.techStack,
    aiCapabilities: translation.aiCapabilities ?? product.aiCapabilities,
    focusPoints: translation.focusPoints ?? product.focusPoints,
    proofPoints: translation.proofPoints ?? product.proofPoints,
    detailSections: translation.detailSections ?? product.detailSections,
  };
}

export function getLocalizedProducts(locale: SiteLocale) {
  return baseProducts.map((product) => {
    const slug = product.href.split("/").at(-1);
    const localizedProduct = slug ? getLocalizedProductBySlug(slug, locale) : null;
    const translation = slug && locale !== "en" ? localizedProductTranslations[locale]?.[slug] : undefined;

    return {
      ...product,
      href: slug ? withLocalePath(locale, `/products/${slug}`) : product.href,
      title: localizedProduct?.title ?? product.title,
      description: localizedProduct?.description ?? product.description,
      statusLabel: localizedProduct?.statusLabel ?? product.statusLabel,
      externalLabel: localizedProduct?.externalLabel ?? product.externalLabel,
      tags: localizedProduct?.tags ?? product.tags,
      ctaLabel: translation?.ctaLabel ?? product.ctaLabel,
    };
  });
}
