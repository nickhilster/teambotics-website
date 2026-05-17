export function TeamboticsSVGLogo() {
  return (
    <span aria-hidden="true" className="teambotics-logo-icon">
      <picture>
        <source
          media="(max-width: 719px)"
          srcSet="/brand/teambotics-logo-24.png 1x, /brand/teambotics-logo-48.png 2x"
        />
        <img
          alt=""
          decoding="async"
          height="28"
          src="/brand/teambotics-logo-28.png"
          srcSet="/brand/teambotics-logo-28.png 1x, /brand/teambotics-logo-56.png 2x"
          width="28"
        />
      </picture>
    </span>
  );
}