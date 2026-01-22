import "./globals.css";
import StoreProvider from "@/components/providers/StoreProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeInitializer } from "@/components/providers/ThemeInitializer";

export const metadata = {
  title: "React Challenge",
  description: "Technical Challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <StoreProvider>
          <ThemeInitializer />
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
