import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FlowText } from "./FlowText";

describe("FlowText", () => {
  it("renders marked semantic anchors while preserving the full sentence", () => {
    const markup = renderToStaticMarkup(
      createElement(FlowText, {
        text: "Start with the work; **choose tools only after the workflow is clear.** Keep the detail.",
      }),
    );

    expect(markup).toContain("Start with the work; ");
    expect(markup).toContain('<strong class="flowwrite-anchor">choose tools only after the workflow is clear.</strong>');
    expect(markup).toContain(" Keep the detail.");
  });

  it("wraps the designated claim as one semantic anchor", () => {
    const markup = renderToStaticMarkup(
      createElement(FlowText, {
        text: "RyFine sits before the model call and gives users control.",
        anchors: ["sits before the model call"],
      }),
    );

    expect(markup).toContain('<strong class="flowwrite-anchor">sits before the model call</strong>');
    expect(markup).toContain("RyFine ");
    expect(markup).toContain(" and gives users control.");
  });

  it("leaves unmatched markers as literal text", () => {
    const markup = renderToStaticMarkup(
      createElement(FlowText, { text: "Literal **marker with no closing delimiter" }),
    );

    expect(markup).toContain("Literal **marker with no closing delimiter");
    expect(markup).not.toContain("<strong");
  });
});
