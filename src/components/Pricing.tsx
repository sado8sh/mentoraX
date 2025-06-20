
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Standard",
    price: "19€",
    description: "Idéal pour les petites équipes",
    features: [
      "Jusqu'à 10 utilisateurs",
      "Cours personnalisables",
      "Évaluations de base",
      "Suivi des progrès",
      "Support par email"
    ],
    cta: "Commencer l'essai",
    popular: false,
  },
  {
    name: "Pro",
    price: "49€",
    description: "Pour les équipes en croissance",
    features: [
      "Jusqu'à 100 utilisateurs",
      "Tous les avantages de Standard",
      "Analytics avancés",
      "Création de rapports",
      "Intégration avec les outils RH",
      "Support prioritaire"
    ],
    cta: "Commencer l'essai",
    popular: true,
  },
  {
    name: "Entreprise",
    price: "Sur mesure",
    description: "Pour les grandes organisations",
    features: [
      "Utilisateurs illimités",
      "Tous les avantages de Pro",
      "Intégration API complète",
      "Déploiement sur site possible",
      "Formation des administrateurs",
      "Account manager dédié"
    ],
    cta: "Contacter les ventes",
    popular: false,
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos offres</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Choisissez le plan qui correspond le mieux à vos besoins. Tous les plans comprennent un essai gratuit de 14 jours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index}
              className={`border h-full flex flex-col ${
                plan.popular 
                  ? "border-primary shadow-lg shadow-primary/10 scale-105" 
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                  Recommandé
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Sur mesure" && <span className="text-gray-500 ml-1">/mois par utilisateur</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
