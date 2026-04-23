export function HeroNeuralNetwork() {
  return (
    <div aria-hidden="true" className="hero-network">
      <svg
        className="hero-network__svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 760"
      >
        <defs>
          <linearGradient id="strand-blue" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(69, 148, 255, 0.08)" />
            <stop offset="38%" stopColor="rgba(111, 196, 255, 0.78)" />
            <stop offset="72%" stopColor="rgba(132, 120, 255, 0.78)" />
            <stop offset="100%" stopColor="rgba(91, 157, 255, 0.08)" />
          </linearGradient>
          <linearGradient id="strand-violet" x1="100%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(119, 106, 255, 0.1)" />
            <stop offset="48%" stopColor="rgba(120, 181, 255, 0.78)" />
            <stop offset="100%" stopColor="rgba(143, 124, 255, 0.1)" />
          </linearGradient>
          <radialGradient id="node-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(217, 241, 255, 0.95)" />
            <stop offset="55%" stopColor="rgba(113, 192, 255, 0.72)" />
            <stop offset="100%" stopColor="rgba(113, 192, 255, 0)" />
          </radialGradient>
          <radialGradient id="node-violet" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(232, 221, 255, 0.92)" />
            <stop offset="55%" stopColor="rgba(148, 128, 255, 0.66)" />
            <stop offset="100%" stopColor="rgba(148, 128, 255, 0)" />
          </radialGradient>
        </defs>

        <g className="hero-network__group hero-network__group--slow">
          <path
            className="hero-network__strand hero-network__strand--blue hero-network__strand--w6"
            d="M 72 124 C 232 68, 364 194, 514 282 S 848 468, 1132 176"
            pathLength="100"
          />
          <path
            className="hero-network__strand hero-network__strand--blue hero-network__strand--w5"
            d="M 48 304 C 202 208, 354 226, 528 360 S 838 624, 1160 464"
            pathLength="100"
          />
          <path
            className="hero-network__strand hero-network__strand--violet hero-network__strand--w7"
            d="M 122 666 C 294 526, 426 522, 598 414 S 868 204, 1104 84"
            pathLength="100"
          />
          <path
            className="hero-network__strand hero-network__strand--blue hero-network__strand--w4"
            d="M 184 46 C 334 176, 444 286, 642 326 S 952 282, 1140 352"
            pathLength="100"
          />
        </g>

        <g className="hero-network__group hero-network__group--medium">
          <path
            className="hero-network__strand hero-network__strand--blue hero-network__strand--w7"
            d="M 84 520 C 264 418, 430 404, 610 296 S 934 108, 1094 224"
            pathLength="100"
          />
          <path
            className="hero-network__strand hero-network__strand--violet hero-network__strand--w5"
            d="M 168 736 C 348 592, 460 542, 632 510 S 914 472, 1060 622"
            pathLength="100"
          />
          <path
            className="hero-network__strand hero-network__strand--ice hero-network__strand--w4"
            d="M 8 212 C 196 248, 386 344, 572 306 S 868 148, 1190 250"
            pathLength="100"
          />
          <path
            className="hero-network__strand hero-network__strand--violet hero-network__strand--w6"
            d="M 210 104 C 384 232, 488 374, 646 450 S 914 598, 1184 548"
            pathLength="100"
          />
        </g>

        <g className="hero-network__group hero-network__group--fast">
          <path
            className="hero-network__strand hero-network__strand--ice hero-network__strand--w5"
            d="M 40 606 C 244 498, 402 464, 560 398 S 846 260, 1182 326"
            pathLength="100"
          />
          <path
            className="hero-network__strand hero-network__strand--blue hero-network__strand--w4"
            d="M 116 136 C 292 236, 426 332, 604 324 S 874 170, 1048 118"
            pathLength="100"
          />
          <path
            className="hero-network__strand hero-network__strand--violet hero-network__strand--w5"
            d="M 182 690 C 356 564, 454 430, 644 342 S 914 232, 1052 54"
            pathLength="100"
          />
          <path
            className="hero-network__strand hero-network__strand--ice hero-network__strand--w6"
            d="M 24 408 C 224 354, 382 350, 562 430 S 864 626, 1188 556"
            pathLength="100"
          />
        </g>

        <g className="hero-network__nodes hero-network__nodes--blue">
          <circle className="hero-network__node hero-network__node--lg" cx="290" cy="214" r="24" />
          <circle className="hero-network__node hero-network__node--md" cx="544" cy="314" r="18" />
          <circle className="hero-network__node hero-network__node--sm" cx="852" cy="248" r="14" />
          <circle className="hero-network__node hero-network__node--sm" cx="714" cy="512" r="14" />
          <circle className="hero-network__node hero-network__node--md" cx="954" cy="418" r="18" />
        </g>

        <g className="hero-network__nodes hero-network__nodes--violet">
          <circle className="hero-network__node hero-network__node--lg" cx="438" cy="534" r="24" />
          <circle className="hero-network__node hero-network__node--md" cx="652" cy="204" r="18" />
          <circle className="hero-network__node hero-network__node--sm" cx="202" cy="576" r="14" />
          <circle className="hero-network__node hero-network__node--sm" cx="1032" cy="158" r="14" />
          <circle className="hero-network__node hero-network__node--md" cx="1096" cy="516" r="18" />
        </g>
      </svg>
    </div>
  );
}
