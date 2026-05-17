"use client";

import dynamic from "next/dynamic";

const NotFoundTetris = dynamic(
  () => import("@/components/content/NotFoundTetris").then((module) => module.NotFoundTetris),
  {
    ssr: false,
    loading: () => (
      <section className="not-found-console" aria-label="Loading recovery display">
        <div className="not-found-console__shell not-found-console__shell--loading">
          <div className="not-found-console__header">
            <div className="not-found-console__header-copy">
              <p className="not-found-console__eyebrow">Recovery display</p>
              <p className="not-found-console__model">FC-404 signal board</p>
            </div>
            <span className="not-found-console__live">loading</span>
          </div>
          <div className="not-found-console__screen-wrap">
            <div className="not-found-console__screen not-found-console__screen--loading" />
          </div>
        </div>
      </section>
    ),
  },
);

export function NotFoundTetrisSlot() {
  return <NotFoundTetris />;
}