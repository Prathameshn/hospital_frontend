import Header from "@/components/header";
import Services from "@/components/Services";
import TopDoctors from "@/components/TopDoctors";
import Testimonials from "@/components/Testimonials";
import EmergencyBanner from "@/components/EmergencyBanner";
import FAQ from "@/components/FAQ";
import Main from "@/components/main";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Main />
      <Services />
      <TopDoctors />
      <Testimonials />
      <EmergencyBanner />
      <FAQ />
      <Contact />
    </>
  );
}
