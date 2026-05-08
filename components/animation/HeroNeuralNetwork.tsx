export function HeroNeuralNetwork() {
  const strands = [
    "hero-network__strand--blue hero-network__strand--w6 hero-network__strand--speed-2",
    "hero-network__strand--violet hero-network__strand--w5 hero-network__strand--speed-1",
    "hero-network__strand--ice hero-network__strand--w4 hero-network__strand--speed-3",
    "hero-network__strand--blue hero-network__strand--w5 hero-network__strand--speed-4",
    "hero-network__strand--blue hero-network__strand--w5 hero-network__strand--speed-2",
    "hero-network__strand--violet hero-network__strand--w6 hero-network__strand--speed-1",
    "hero-network__strand--ice hero-network__strand--w4 hero-network__strand--speed-3",
    "hero-network__strand--ice hero-network__strand--w5 hero-network__strand--speed-2",
    "hero-network__strand--blue hero-network__strand--w6 hero-network__strand--speed-4",
    "hero-network__strand--blue hero-network__strand--w7 hero-network__strand--speed-1",
    "hero-network__strand--violet hero-network__strand--w4 hero-network__strand--speed-3",
    "hero-network__strand--violet hero-network__strand--w5 hero-network__strand--speed-2",
    "hero-network__strand--ice hero-network__strand--w4 hero-network__strand--speed-4",
    "hero-network__strand--ice hero-network__strand--w6 hero-network__strand--speed-1",
    "hero-network__strand--blue hero-network__strand--w5 hero-network__strand--speed-2",
    "hero-network__strand--blue hero-network__strand--w5 hero-network__strand--speed-4",
    "hero-network__strand--violet hero-network__strand--w4 hero-network__strand--speed-1",
    "hero-network__strand--violet hero-network__strand--w4 hero-network__strand--speed-3",
    "hero-network__strand--ice hero-network__strand--w4 hero-network__strand--speed-2",
    "hero-network__strand--ice hero-network__strand--w5 hero-network__strand--speed-4",
    "hero-network__strand--blue hero-network__strand--w4 hero-network__strand--speed-1",
  ];

  const strandPaths = [
    "M -164 56 C 74 100, 310 194, 600 380",
    "M 154 -102 C 314 26, 444 184, 600 380",
    "M 626 -168 C 630 48, 620 212, 600 380",
    "M 878 -128 C 778 46, 694 200, 600 380",
    "M 1096 -78 C 914 84, 760 222, 600 380",
    "M 1386 36 C 1088 164, 838 262, 600 380",
    "M 1438 212 C 1112 266, 862 314, 600 380",
    "M 1460 382 C 1120 372, 860 372, 600 380",
    "M 1424 560 C 1080 510, 844 454, 600 380",
    "M 1332 786 C 1038 640, 810 518, 600 380",
    "M 948 918 C 810 704, 708 556, 600 380",
    "M 714 970 C 672 754, 638 592, 600 380",
    "M 520 952 C 552 734, 578 584, 600 380",
    "M 302 936 C 420 730, 506 578, 600 380",
    "M 86 942 C 246 740, 412 566, 600 380",
    "M -128 822 C 192 660, 386 534, 600 380",
    "M -190 620 C 124 548, 352 474, 600 380",
    "M -230 414 C 88 430, 344 420, 600 380",
    "M -198 238 C 116 286, 352 332, 600 380",
    "M -154 74 C 104 144, 336 234, 600 380",
    "M 354 -166 C 438 -4, 516 176, 600 380",
  ];

  return (
    <div aria-hidden="true" className="hero-network">
      <svg
        className="hero-network__svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 760"
      >
        <defs>
          <linearGradient id="strand-blue" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="var(--hero-strand-blue-start)" />
            <stop offset="38%" stopColor="var(--hero-strand-blue-mid)" />
            <stop offset="72%" stopColor="var(--hero-strand-blue-accent)" />
            <stop offset="100%" stopColor="var(--hero-strand-blue-end)" />
          </linearGradient>
          <linearGradient id="strand-violet" x1="100%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="var(--hero-strand-violet-start)" />
            <stop offset="48%" stopColor="var(--hero-strand-violet-mid)" />
            <stop offset="100%" stopColor="var(--hero-strand-violet-end)" />
          </linearGradient>
          <radialGradient id="node-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--hero-node-blue-core)" />
            <stop offset="55%" stopColor="var(--hero-node-blue-mid)" />
            <stop offset="100%" stopColor="var(--hero-node-blue-edge)" />
          </radialGradient>
          <radialGradient id="node-violet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--hero-node-violet-core)" />
            <stop offset="55%" stopColor="var(--hero-node-violet-mid)" />
            <stop offset="100%" stopColor="var(--hero-node-violet-edge)" />
          </radialGradient>
        </defs>

        {strandPaths.map((path, index) => (
          <path
            className={`hero-network__strand ${strands[index]}`}
            d={path}
            key={path}
            pathLength="100"
          />
        ))}

        {/* Spark layer — bright short pulses traveling along a subset of strands */}
        {[0, 3, 6, 9, 13, 17, 20].map((i, sparkIndex) => (
          <path
            className={`hero-network__spark hero-network__spark--delay-${sparkIndex}`}
            d={strandPaths[i]}
            key={`spark-${i}`}
            pathLength="100"
          />
        ))}

        <g className="hero-network__nodes hero-network__nodes--blue">
          <circle className="hero-network__node hero-network__node--lg" cx="286" cy="220" r="22" />
          <circle className="hero-network__node hero-network__node--md" cx="518" cy="286" r="16" />
          <circle className="hero-network__node hero-network__node--sm" cx="762" cy="246" r="12" />
          <circle className="hero-network__node hero-network__node--sm" cx="710" cy="502" r="12" />
          <circle className="hero-network__node hero-network__node--md" cx="930" cy="464" r="16" />
        </g>

        <g className="hero-network__nodes hero-network__nodes--violet">
          <circle className="hero-network__node hero-network__node--lg" cx="446" cy="556" r="22" />
          <circle className="hero-network__node hero-network__node--md" cx="648" cy="216" r="16" />
          <circle className="hero-network__node hero-network__node--sm" cx="188" cy="564" r="12" />
          <circle className="hero-network__node hero-network__node--sm" cx="1016" cy="168" r="12" />
          <circle className="hero-network__node hero-network__node--md" cx="1064" cy="604" r="16" />
          <circle className="hero-network__node hero-network__node--sm" cx="600" cy="380" r="10" />
        </g>
      </svg>
    </div>
  );
}
