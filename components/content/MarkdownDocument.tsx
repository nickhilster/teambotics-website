import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/layout/Container";

type MarkdownDocumentProps = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  markdown: string;
};

function renderMarkdownLink({ href, children, ...props }: ComponentPropsWithoutRef<"a"> & { children?: ReactNode }) {
  if (!href) {
    return <span>{children}</span>;
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );
  }

  return <span>{children}</span>;
}

export function MarkdownDocument({ eyebrow, title, description, lastUpdated, markdown }: MarkdownDocumentProps) {
  return (
    <>
      <section className="section section--border">
        <Container className="legal-document__hero">
          <p className="section-eyebrow">{eyebrow}</p>
          <h1 className="section-title">{title}</h1>
          <p className="section-copy">{description}</p>
          <p className="legal-document__updated">Last updated {lastUpdated}</p>
        </Container>
      </section>

      <section className="section section--border">
        <Container>
          <div className="legal-markdown">
            <ReactMarkdown
              components={{
                a: renderMarkdownLink,
                h2: ({ children }) => <h2>{children}</h2>,
                h3: ({ children }) => <h3>{children}</h3>,
                p: ({ children }) => <p>{children}</p>,
                ul: ({ children }) => <ul>{children}</ul>,
                ol: ({ children }) => <ol>{children}</ol>,
                table: ({ children }) => <table>{children}</table>,
                thead: ({ children }) => <thead>{children}</thead>,
                tbody: ({ children }) => <tbody>{children}</tbody>,
                tr: ({ children }) => <tr>{children}</tr>,
                th: ({ children }) => <th>{children}</th>,
                td: ({ children }) => <td>{children}</td>,
                hr: () => <hr aria-hidden="true" />,
              }}
              remarkPlugins={[remarkGfm]}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </Container>
      </section>
    </>
  );
}