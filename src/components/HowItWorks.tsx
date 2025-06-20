
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Créez votre compte",
    description: "Inscrivez-vous en quelques minutes et configurez votre espace d'entreprise."
  },
  {
    number: "02",
    title: "Choisissez ou créez un parcours de formation",
    description: "Sélectionnez parmi nos modules préconçus ou créez votre propre contenu personnalisé."
  },
  {
    number: "03",
    title: "Suivez les progrès de vos équipes",
    description: "Visualisez les avancées et résultats de vos collaborateurs en temps réel."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Suivez ces étapes simples pour commencer à transformer la formation au sein de votre entreprise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-lg bg-white overflow-hidden relative">
              <CardContent className="p-8">
                <div className="text-5xl font-bold text-gray-100 absolute -top-2 -left-2">
                  {step.number}
                </div>
                <div className="relative pt-8">
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg mb-6">
            Prêt à transformer la formation dans votre entreprise ?
          </p>
          <a 
            href="#" 
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-full transition-colors"
          >
            Commencer maintenant
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
