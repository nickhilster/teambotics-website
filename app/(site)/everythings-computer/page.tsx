import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const ORIGINAL_TRANSCRIPT =
  "https://www.govinfo.gov/content/pkg/DCPD-202500346/html/DCPD-202500346.htm";
const FACTBASE_TRANSCRIPT =
  "https://rollcall.com/factbase/trump/transcript/donald-trump-press-gaggle-tesla-vehicles-white-house-march-11-2025";
const PHOTO_SOURCE =
  "https://commons.wikimedia.org/wiki/File:The_White_House_-_54381083659.jpg";
const PHOTO_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/5/5e/The_White_House_-_54381083659.jpg";

export const metadata: Metadata = {
  title: "Everything's computer. | Sources | Teambotics",
  description:
    "March 11, 2025: an actual presidential quote, the original transcript, an archival photograph, and an unusually thorough set of independent reports.",
  alternates: { canonical: "https://www.teambotics.app/everythings-computer" },
  openGraph: {
    title: "Everything's computer. Yes, there are sources.",
    description:
      "An original transcript, an official White House photograph, and a completely unreasonable number of journalistic receipts.",
    url: "https://www.teambotics.app/everythings-computer",
    siteName: "Teambotics",
    type: "article",
    images: [{ url: PHOTO_IMAGE, width: 3000, height: 2000, alt: "Donald Trump inside a Tesla at the White House, March 11, 2025" }],
  },
};

const quoteRecords = [
  {
    outlet: "U.S. Government Publishing Office",
    category: "Official presidential record",
    title: "Remarks at a Tesla Viewing and an Exchange With Reporters",
    detail: "The government transcript includes the exact phrase, “everything’s computer.”",
    href: ORIGINAL_TRANSCRIPT,
  },
  {
    outlet: "Roll Call · Factba.se",
    category: "Timestamped transcript",
    title: "Tesla photo-op press gaggle, March 11, 2025",
    detail: "The line occurs at 20:32–20:47 in the annotated transcript.",
    href: FACTBASE_TRANSCRIPT,
  },
  {
    outlet: "CNN",
    category: "Broadcast transcript",
    title: "CNN NewsNight, March 11, 2025",
    detail: "The program reproduces the exact sentence in a video excerpt.",
    href: "https://transcripts.cnn.com/show/cnap/date/2025-03-11/segment/01",
  },
] as const;

const reporting = [
  {
    outlet: "Reuters",
    headline: "Trump says he will buy a new Tesla to support Musk",
    href: "https://www.reuters.com/world/us/trump-says-he-will-buy-new-tesla-show-support-musk-2025-03-11/",
    context: "Newswire · March 11, 2025",
  },
  {
    outlet: "Associated Press",
    headline: "Trump shops for a Tesla at the White House",
    href: "https://www.pbs.org/newshour/politics/watch-trump-talks-tesla-shopping-with-musk",
    context: "AP reporting hosted by PBS NewsHour · March 11, 2025",
  },
  {
    outlet: "ABC News",
    headline: "Trump checks out Teslas at White House as Musk's stock sinks",
    href: "https://abcnews.com/Politics/trump-checks-teslas-white-house-musks-auto-company/story?id=119683027",
    context: "News report · March 11, 2025",
  },
  {
    outlet: "CBS News",
    headline: "Government expert on Elon Musk and DOGE's changes",
    href: "https://www.cbsnews.com/news/government-expert-on-elon-musk-and-doges-slash-and-burn-exercise/",
    context: "Report recalling the quote, with slightly different transcription · March 16, 2025",
  },
  {
    outlet: "BBC News",
    headline: "Trump says anti-Tesla protesters will face 'hell'",
    href: "https://www.bbc.com/news/articles/cqjdg4x08ylo",
    context: "News report about the White House event · March 11–12, 2025",
  },
  {
    outlet: "The Guardian",
    headline: "Live coverage of the Tesla display and questions",
    href: "https://www.theguardian.com/us-news/live/2025/mar/11/donald-trump-latest-us-politics-news-live",
    context: "White House coverage · March 11, 2025",
  },
  {
    outlet: "PBS NewsHour",
    headline: "Watch: Trump talks Tesla shopping with Musk",
    href: "https://www.pbs.org/newshour/politics/watch-trump-talks-tesla-shopping-with-musk",
    context: "Video and AP reporting · March 11, 2025",
  },
  {
    outlet: "NPR",
    headline: "Trump buys a Tesla with Elon Musk in tow, at the White House",
    href: "https://www.northcountrypublicradio.org/news/npr/nx-s1-5325306/trump-buys-a-tesla-with-elon-musk-in-tow-at-the-white-house",
    context: "NPR report hosted by North Country Public Radio · March 11, 2025",
  },
  {
    outlet: "Bloomberg",
    headline: "Trump shops for Teslas at White House to back Musk",
    href: "https://www.bloomberg.com/news/articles/2025-03-11/trump-says-he-ll-buy-a-tesla-to-support-musk-after-shares-plunge",
    context: "Business reporting · March 11, 2025",
  },
  {
    outlet: "The Washington Post",
    headline: "A new role for the South Lawn: Tesla car lot",
    href: "https://www.washingtonpost.com/politics/2025/03/11/trump-musk-tesla-white-house/",
    context: "On-scene reporting · March 11, 2025",
  },
  {
    outlet: "Politico",
    headline: "White House prepares high-profile Tesla purchase",
    href: "https://www.politico.com/news/2025/03/11/white-house-trump-purchase-tesla-auto-00224238",
    context: "Event preparations and political context · March 11, 2025",
  },
  {
    outlet: "Axios",
    headline: "Trump floats labeling Tesla dealership violence terrorism",
    href: "https://www.axios.com/2025/03/11/trump-tesla-musk-domestic-terrorism",
    context: "Reporting on remarks at the event · March 11, 2025",
  },
  {
    outlet: "The Independent",
    headline: "Trump reverses his stance on EVs after Musk's support",
    href: "https://www.independent.co.uk/news/world/americas/us-politics/trump-elon-musk-tesla-ev-b2713975.html",
    context: "Event reporting and context · March 12, 2025",
  },
  {
    outlet: "Fox News",
    headline: "Trump buys red Tesla Model S at White House",
    href: "https://www.foxnews.com/politics/corruption-broad-daylight-dems-outraged-rump-playing-car-salesman-tesla",
    context: "Reporting and political reactions · March 11, 2025",
  },
] as const;

export default function EverythingsComputerPage() {
  return (
    <article className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.topline}>
          <Link href="/" className={styles.back}>← Teambotics</Link>
          <span>Evidence archive / March 11, 2025</span>
        </div>

        <header className={styles.intro}>
          <p className={styles.kicker}>A presidential quotation. Several receipts.</p>
          <h1>“Everything’s computer.”</h1>
          <p className={styles.attribution}>— President of the United States of America, 2025</p>
          <p className={styles.lede}>
            Yes. This happened. And yes, we have gathered a frankly unreasonable
            amount of journalism to establish it.
          </p>
        </header>

        <figure className={styles.heroPhoto}>
          <Image
            unoptimized
            src={PHOTO_IMAGE}
            alt="President Donald Trump seated behind the wheel of a red Tesla with Elon Musk beside him on the White House South Lawn, March 11, 2025."
            width={3000}
            height={2000}
            priority
            sizes="(max-width: 800px) 100vw, 1100px"
          />
          <figcaption>
            <span>March 11, 2025 · White House South Lawn</span>
            <span>
              Official White House photograph by <a href={PHOTO_SOURCE} target="_blank" rel="noopener noreferrer">
                Daniel Torok / The White House ↗
              </a>
            </span>
          </figcaption>
        </figure>

        <section className={styles.context} aria-labelledby="what-happened">
          <div>
            <p className={styles.overline}>The extraordinarily brief explanation</p>
            <h2 id="what-happened">He sat in the Tesla. He looked at the controls. He said it.</h2>
          </div>
          <div>
            <p>
              On March 11, 2025, Donald Trump examined a Tesla Model S during an event
              with Elon Musk on the White House South Lawn. The official government
              record transcribes the phrase <strong>“everything’s computer.”</strong>
            </p>
            <p>
              The links below have deliberately separate jobs: some record the
              <em> exact words</em>; others report on the <em>event and context</em>.
              Coverage of the occasion is not automatically a verbatim transcript.
            </p>
          </div>
        </section>

        <section className={styles.recordSection} aria-labelledby="verbatim-sources">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.overline}>01 / The actual words</p>
              <h2 id="verbatim-sources">Primary records &amp; transcripts</h2>
            </div>
            <span>{String(quoteRecords.length).padStart(2, "0")} records</span>
          </div>
          <div className={styles.records}>
            {quoteRecords.map((source, index) => (
              <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className={styles.record}>
                <span className={styles.ordinal}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.recordBody}>
                  <span className={styles.outlet}>{source.outlet}</span>
                  <span className={styles.recordTitle}>{source.title}</span>
                  <span className={styles.sourceDetail}>{source.detail}</span>
                </span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.reportingSection} aria-labelledby="reporting-sources">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.overline}>02 / The broader event</p>
              <h2 id="reporting-sources">Journalism. Rather a lot of it.</h2>
            </div>
            <span>{String(reporting.length).padStart(2, "0")} reports</span>
          </div>
          <p className={styles.reportingNote}>
            Independently reported coverage and newswire reporting about the March 11
            White House Tesla event. These links document the occasion, not necessarily
            the exact wording. Some stories are syndicated or behind subscriptions.
          </p>
          <div className={styles.reportingGrid}>
            {reporting.map((source, index) => (
              <a className={styles.report} key={source.outlet} href={source.href} target="_blank" rel="noopener noreferrer">
                <span className={styles.reportTop}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true">↗</span>
                </span>
                <strong>{source.outlet}</strong>
                <span className={styles.headline}>{source.headline}</span>
                <span className={styles.reportContext}>{source.context}</span>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.response} aria-labelledby="the-reply">
          <p className={styles.overline}>03 / A response from the future (sort of)</p>
          <h2 id="the-reply">“Everything’s AI.”</h2>
          <p>
            — <a href="https://nikdesign.ca" target="_blank" rel="noopener noreferrer">Teambotics, 2026 ↗</a>
          </p>
          <p className={styles.afterthought}>
            Yes, that source leads to the founder’s website. We said what we said.
          </p>
        </section>

        <footer className={styles.notes}>
          <p>
            <strong>Image and attribution:</strong> Official White House photograph by Daniel Torok,
            shown unaltered as an archival record of this event.
            <a href={PHOTO_SOURCE} target="_blank" rel="noopener noreferrer"> View image source and rights notice ↗</a>.
            Wikimedia Commons classifies this federal-government photo as U.S. public domain;
            its metadata also carries White House conditions against promotional or endorsement-implying uses.
            This independent archival page does not imply endorsement by any pictured person,
            photographer, publisher, or government entity.
          </p>
          <p>
            The existence of media coverage is not an endorsement of this page by any listed outlet.
            Article titles and links were checked on October 26, 2026. External links may change.
          </p>
        </footer>
      </div>
    </article>
  );
}
