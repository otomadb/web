import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OTOMADB",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b15",
    theme_color: "#1c1f27",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
