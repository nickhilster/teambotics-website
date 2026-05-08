const particleModifiers = [
  "hero-flame__particle--1",
  "hero-flame__particle--2",
  "hero-flame__particle--3",
  "hero-flame__particle--4",
  "hero-flame__particle--5",
  "hero-flame__particle--6",
  "hero-flame__particle--7",
  "hero-flame__particle--8",
  "hero-flame__particle--9",
  "hero-flame__particle--10",
  "hero-flame__particle--11",
  "hero-flame__particle--12",
];

export function HeroFlameParticles() {
  return (
    <div aria-hidden="true" className="hero-flame">
      <div className="hero-flame__core" />
      <div className="hero-flame__column" />
      {particleModifiers.map((modifier) => (
        <span className={`hero-flame__particle ${modifier}`} key={modifier} />
      ))}
    </div>
  );
}