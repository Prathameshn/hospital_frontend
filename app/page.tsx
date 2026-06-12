import Header from "@/components/header"; 
import Services from "@/components/Services";
import TopDoctors from "@/components/TopDoctors";
import Testimonials from "@/components/Testimonials";
import EmergencyBanner from "@/components/EmergencyBanner";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Main from "@/components/main";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Services />
      <TopDoctors />
      <Testimonials />
      <EmergencyBanner />
      <FAQ />
      <Footer />
    </>
  );
}