import Header from "@/components/header";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main className="pt-20">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
