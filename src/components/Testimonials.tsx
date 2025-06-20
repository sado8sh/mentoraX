
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const testimonials = [
  {
    name: "Marie Dupont",
    position: "Directrice RH, TechSolutions",
    content:
      "MentoraX a transformé notre approche de la formation. Nous avons pu créer des parcours personnalisés pour différents départements et suivre les progrès en temps réel. Un vrai gain de temps et d'efficacité !",
    rating: 5,
  },
  {
    name: "Thomas Martin",
    position: "CEO, InnovaGroup",
    content:
      "La plateforme est intuitive et les résultats sont impressionnants. Nos équipes sont plus engagées dans leur formation et nous constatons une amélioration notable des compétences après seulement quelques mois.",
    rating: 5,
  },
  {
    name: "Sophie Laurent",
    position: "Responsable Formation, EcoStart",
    content:
      "Le dashboard de suivi est un outil précieux pour notre département formation. Nous pouvons identifier rapidement les besoins spécifiques et adapter nos parcours en conséquence.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ce que nos clients disent
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Découvrez comment SkillForge a transformé la formation au sein d'entreprises comme la vôtre.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-gray-100 shadow-lg overflow-hidden h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 flex-grow">"{testimonial.content}"</p>
                <Separator className="my-4" />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.position}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
