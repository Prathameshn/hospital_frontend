import Header from "@/components/header";
import Footer from "@/components/Footer";
import "./globals.css";
import ReduxProvider from "@/store/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Header />

          <main className="pt-20">{children}</main>

          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
