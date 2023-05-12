import { Providers } from "./providers";
import "~/styles/globals.css";

export const metadata = {
  title: "blueskeet - a bluesky client",
  description: "Experience a whole different skyline.",
  openGraph: {
    title: "blueskeet - a bluesky client",
    description: "Experience a whole different skyline.",
    type: "website",
    locale: "en_GB",
    url: "https://blueskeet.app",
    siteName: "blueskeet",
    images: [
      {
        url: "https://blueskeet.app/blueskeet.png",
        width: 1024,
        height: 1024,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "blueskeet - a bluesky client",
    description: "Experience a whole different skyline.",
    images: [
      {
        url: "https://blueskeet.app/blueskeet.png",
        width: 1024,
        height: 1024,
      },
    ],
  },
  colorScheme: "dark",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <head />
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
