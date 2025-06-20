
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Formez. Évaluez. Progressez avec <span className="text-gradient">MentoraX</span>.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              La plateforme de formation sur-mesure pour entreprises modernes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg">
                Commencer l'essai gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg">
                Voir une démo
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-semibold"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">+500</span> entreprises nous font confiance
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute -z-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 -top-10 -right-10"></div>
            <div className="absolute -z-10 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30 -bottom-10 -left-10"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Personne utilisant SkillForge" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
