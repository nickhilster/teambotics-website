import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { FlowText } from "@/components/content/FlowText";
import { Container } from "@/components/layout/Container";
import { getCaseStudyBySlug } from "@/lib/caseStudies";
import styles from "./CaseStudyContent.module.css";

export function CaseStudyContent({ slug }: { slug: string }) {
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return null;
  }

  return (
    <article className={styles.page}>
      <section className={styles.hero}>
        <Container className={styles.heroInner}>
          <Link className={styles.backLink} href="/#capabilities">
            <ChevronLeft aria-hidden="true" size={16} />
            <span>Back to Teambotics</span>
          </Link>
          <div className={`${styles.heroGrid}${study.images?.[0] ? "" : ` ${styles.heroGridSolo}`}`}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrowRow}>
                <span className={styles.label}>{study.label}</span>
                <span className={styles.status}>{study.status}</span>
              </div>
              <h1 className={styles.title}>{study.title}</h1>
              <p className={styles.summary}><FlowText text={study.summary} /></p>
              {study.externalUrl && study.externalLabel ? (
                <a
                  className={styles.externalLink}
                  href={study.externalUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>{study.externalLabel}</span>
                  <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} />
                </a>
              ) : null}
            </div>
            {study.images?.[0] ? (
              <figure className={styles.heroFigure}>
                <Image
                  alt={study.images[0].alt}
                  className={styles.heroImage}
                  height={study.images[0].height}
                  priority
                  src={study.images[0].src}
                  width={study.images[0].width}
                />
                <figcaption>{study.images[0].caption}</figcaption>
              </figure>
            ) : null}
          </div>
        </Container>
      </section>

      {study.sections?.length ? (
        <>
          <section className={`section section--border ${styles.storySection}`}>
            <Container>
              <div className={styles.storyIntro}>
                <p className={styles.sectionEyebrow}>The experience</p>
                <h2 className={styles.sectionTitle}>
                  {study.storyHeading ?? "A clearer path into technical information."}
                </h2>
              </div>
              <div className={styles.storyList}>
                {study.sections.map((section) => (
                  <section className={styles.storyRow} key={section.eyebrow}>
                    <p className={styles.storyEyebrow}>{section.eyebrow}</p>
                    <div>
                      <h3>{section.title}</h3>
                      <p className={styles.storyBody}><FlowText text={section.body} /></p>
                      {section.bullets?.length ? (
                        <ul className={styles.featureList}>
                          {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                        </ul>
                      ) : null}
                    </div>
                  </section>
                ))}
              </div>
            </Container>
          </section>

          {study.images && study.images.length > 1 ? (
            <section className={`section section--border ${styles.gallerySection}`}>
              <Container>
                <div className={styles.galleryHeading}>
                  <p className={styles.sectionEyebrow}>Screens from the prototype</p>
                  <h2 className={styles.sectionTitle}>Browse, then ask.</h2>
                </div>
                <div className={styles.gallery}>
                  {study.images.slice(1).map((image, index) => (
                    <figure className={styles.galleryFigure} key={image.src}>
                      <Image
                        alt={image.alt}
                        className={styles.galleryImage}
                        height={image.height}
                        src={image.src}
                        width={image.width}
                        sizes={index === 0 ? "(max-width: 760px) 100vw, 50vw" : "100vw"}
                      />
                      <figcaption>{image.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </Container>
            </section>
          ) : null}

          {study.disclaimer ? (
            <section className={`section section--border ${styles.disclaimerSection}`}>
              <Container>
                <p className={styles.disclaimer}><FlowText text={study.disclaimer} /></p>
              </Container>
            </section>
          ) : null}
        </>
      ) : null}
    </article>
  );
}
