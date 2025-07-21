import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import ProductCard from "@/components/ProductCard";
import ClientChatbot from "@/components/ClientChatbot";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Carty - GreatStack",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider >
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`} >
          <Toaster />
          <AppContextProvider>
            {/* Move ClientChatbot inside AppContextProvider */}
            {children}
            <ClientChatbot />
          </AppContextProvider>
        </body>
      </html>
      </ClerkProvider>
  );
}
