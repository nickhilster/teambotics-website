import Link from "next/link";

export function LandAcknowledgmentStrip() {
  return (
    <div className="land-strip">
      <p className="land-strip__text">
        Teambotics acknowledges the Indigenous Peoples on whose lands our team members live and work,
        across every territory in Turtle Island.{" "}
        <Link className="land-strip__link" href="/land-acknowledgment">
          Read our full land acknowledgment
        </Link>
      </p>
    </div>
  );
}
