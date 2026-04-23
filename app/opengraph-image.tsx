import { ImageResponse } from "next/og";
import { buildOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(buildOgImage(), size);
}
