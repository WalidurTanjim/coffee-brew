import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar/Navbar";
import Footer from "@/components/navigation/Footer/Footer";
// import NextAuthProvider from "@/provider/NextAuthProvider";

const poppins = Poppins({
  weight: ["100", "200", "400", "500", "600", "800"]
})

export const metadata = {
  metadataBase: new URL("https://coffee-brew-two.vercel.app"),

  title: {
    default: "Coffee Brew | Fresh Coffee Marketplace & Community",
    template: "%s | Coffee Brew",
  },

  description: "Coffee Brew is a modern coffee marketplace where you can explore, buy, and share your favorite coffee. Create an account, add to cart or wishlist, and manage your own coffee collection easily.",

  keywords: [
    "coffee",
    "coffee shop",
    "buy coffee online",
    "coffee marketplace",
    "coffee brew",
    "best coffee",
    "coffee lovers",
    "coffee beans",
    "espresso",
    "latte",
    "cappuccino",
  ],

  authors: [{ name: "Coffee Brew Team" }],
  creator: "Coffee Brew",
  publisher: "Coffee Brew",

  applicationName: "Coffee Brew",

  category: "eCommerce",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Coffee Brew | Discover & Buy Premium Coffee",
    description:
      "Join Coffee Brew to explore, buy, and share your favorite coffee. Manage your coffee collection with ease.",
    url: "https://coffee-brew-two.vercel.app",
    siteName: "Coffee Brew",
    images: [
      {
        url: "/og-image.png", // Add this image in public folder
        width: 1200,
        height: 630,
        alt: "Coffee Brew - Premium Coffee Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Coffee Brew | Premium Coffee Marketplace",
    description:
      "Explore, buy, and share coffee with Coffee Brew. Your perfect coffee companion.",
    images: ["/og-image.png"],
    creator: "@coffee_brew", // change if you have real account
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  other: {
    "theme-color": "#6F4E37", // coffee color
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
