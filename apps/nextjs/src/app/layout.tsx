import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { Providers } from "./providers";
import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        url: "https://graysky.app/graysky.png",
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
        url: "https://graysky.app/graysky.png",
        width: 1024,
        height: 1024,
      },
    ],
  },
  colorScheme: "dark",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head />
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
