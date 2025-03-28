import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] }); // Include weights

export const metadata: Metadata = {
  title: "Decision Tree Solutions",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* Apply fonts directly in JSX for better control */}
        <main className={`${roboto.className} `}>
          {" "}
          {/* Roboto for headings */}
          {children}
        </main>
      </body>
    </html>
  );
}
