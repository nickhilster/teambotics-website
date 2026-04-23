export const motionTokens = {
  duration: {
    fast: 0.18,
    reveal: 0.5,
    text: 0.75,
    page: 0.35,
  },
  stagger: {
    tight: 0.09,
    section: 0.08,
  },
  ease: {
    standard: [0.16, 1, 0.3, 1] as const,
  },
};
