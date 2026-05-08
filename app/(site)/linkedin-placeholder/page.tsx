import { permanentRedirect } from "next/navigation";
import { siteConfig } from "@/lib/config";

export default function Page() {
  permanentRedirect(siteConfig.socials.linkedin);
}
