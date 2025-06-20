
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main>
        <Hero />
        <WhyUs />
        <Testimonials />
        <Pricing />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
