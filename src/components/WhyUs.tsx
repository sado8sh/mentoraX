
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CheckSquare, ChartBar } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-secondary" />,
    title: "Formation personnalisable",
    description:
      "Créez des parcours de formation adaptés à vos besoins spécifiques et au rythme de vos équipes."
  },
  {
    icon: <CheckSquare className="h-10 w-10 text-secondary" />,
    title: "Évaluations automatisées",
    description:
      "Mesurez les compétences acquises avec des tests automatisés et obtenez des résultats instantanés."
  },
  {
    icon: <ChartBar className="h-10 w-10 text-secondary" />,
    title: "Dashboard de suivi des progrès",
    description:
      "Visualisez les progrès de vos équipes en temps réel avec des tableaux de bord intuitifs et personnalisables."
  }
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pourquoi choisir <span className="text-primary">MentoraX</span> ?
          </h2>
          <p className="text-gray-600 text-lg">
            Notre plateforme combine technologie avancée et pédagogie moderne pour optimiser la formation de vos collaborateurs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
