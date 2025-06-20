
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookText, FileVideo, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  modules: Module[];
}

interface Module {
  id: number;
  title: string;
  type: 'video' | 'quiz';
  content: string;
  duration?: number;
  questions?: Question[];
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctOption: number;
}

const Cours = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const navigate = useNavigate();
  
  // Mock data for courses
  const mockCourses: Course[] = [
    {
      id: 1,
      title: "Fondamentaux du Marketing Digital",
      description: "Apprenez les concepts de base du marketing digital et comment les appliquer.",
      progress: 65,
      modules: [
        {
          id: 101,
          title: "Introduction au Marketing Digital",
          type: "video",
          content: "https://www.example.com/video1.mp4",
          duration: 15
        },
        {
          id: 102,
          title: "Stratégies de Contenu",
          type: "video",
          content: "https://www.example.com/video2.mp4",
          duration: 12
        },
        {
          id: 103,
          title: "Évaluation des Connaissances",
          type: "quiz",
          content: "Testez vos connaissances en marketing digital",
          questions: [
            {
              id: 1,
              text: "Quelle est la meilleure méthode pour mesurer l'engagement sur les réseaux sociaux?",
              options: ["Nombre de vues", "Taux de conversion", "Taux d'engagement", "Nombre de followers"],
              correctOption: 2
            },
            {
              id: 2,
              text: "Qu'est-ce que le SEO?",
              options: ["Social Engine Optimization", "Search Engine Optimization", "Sales Engagement Opportunities", "Statistical Evaluation Outputs"],
              correctOption: 1
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Leadership et Management d'Équipe",
      description: "Développez vos compétences en leadership et apprenez à gérer efficacement une équipe.",
      progress: 30,
      modules: [
        {
          id: 201,
          title: "Principes du Leadership",
          type: "video",
          content: "https://www.example.com/video3.mp4",
          duration: 18
        },
        {
          id: 202,
          title: "Gestion des Conflits",
          type: "video",
          content: "https://www.example.com/video4.mp4",
          duration: 14
        }
      ]
    },
    {
      id: 3,
      title: "Excel Avancé pour les Analyses",
      description: "Maîtrisez les fonctionnalités avancées d'Excel pour l'analyse de données.",
      progress: 85,
      modules: [
        {
          id: 301,
          title: "Formules Avancées",
          type: "video",
          content: "https://www.example.com/video5.mp4",
          duration: 20
        }
      ]
    },
    {
      id: 4,
      title: "Communication Professionnelle",
      description: "Améliorez vos compétences en communication écrite et orale en milieu professionnel.",
      progress: 10,
      modules: [
        {
          id: 401,
          title: "Communication Efficace",
          type: "video",
          content: "https://www.example.com/video6.mp4",
          duration: 16
        }
      ]
    },
    {
      id: 5,
      title: "Cybersécurité pour Tous",
      description: "Apprenez les principes fondamentaux de la cybersécurité et comment protéger les données sensibles.",
      progress: 50,
      modules: [
        {
          id: 501,
          title: "Bases de la Cybersécurité",
          type: "video",
          content: "https://www.example.com/video7.mp4",
          duration: 22
        }
      ]
    }
  ];

  const selectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveModule(course.modules[0]);
    setQuizAnswers({});
  };

  const goBack = () => {
    setSelectedCourse(null);
    setActiveModule(null);
    setQuizAnswers({});
  };

  const selectModule = (module: Module) => {
    setActiveModule(module);
  };

  const handleQuizAnswer = (questionId: number, selectedOption: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const submitQuiz = () => {
    if (!activeModule?.questions) return;
    
    let correctAnswers = 0;
    activeModule.questions.forEach(question => {
      if (quizAnswers[question.id] === question.correctOption) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / activeModule.questions.length) * 100);
    
    toast({
      title: "Quiz Soumis",
      description: `Votre score: ${score}%. ${correctAnswers} réponses correctes sur ${activeModule.questions.length}.`,
      duration: 5000,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!selectedCourse ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Mes Cours</h2>
          <p className="text-gray-500 mb-6">Explorez vos cours disponibles et suivez votre progression.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockCourses.map((course) => (
              <div 
                key={course.id} 
                className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => selectCourse(course)}
              >
                <div className="h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-md mb-3 flex items-center justify-center">
                  <BookText size={40} className="text-primary" />
                </div>
                <h3 className="font-medium">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.description}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progression</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={goBack}
              className="flex items-center text-gray-600 hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="ml-2">Retour aux cours</span>
            </button>
            <div className="text-sm text-gray-500">Progression: {selectedCourse.progress}%</div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2">{selectedCourse.title}</h2>
          <p className="text-gray-600 mb-6">{selectedCourse.description}</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <h3 className="font-medium mb-3">Modules du cours</h3>
              {selectedCourse.modules.map((module) => (
                <div 
                  key={module.id} 
                  className={`p-3 rounded-md cursor-pointer flex items-center ${
                    activeModule?.id === module.id 
                      ? "bg-primary/10 border border-primary/30" 
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => selectModule(module)}
                >
                  {module.type === "video" ? (
                    <FileVideo size={18} className="mr-2 text-primary" />
                  ) : (
                    <FileText size={18} className="mr-2 text-primary" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{module.title}</p>
                    {module.type === "video" && module.duration && (
                      <p className="text-xs text-gray-500">{module.duration} minutes</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-2">
              {activeModule && (
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h3 className="font-semibold text-lg mb-3">{activeModule.title}</h3>
                  
                  {activeModule.type === "video" ? (
                    <div className="aspect-video bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                      <p className="text-gray-500">Vidéo: {activeModule.content}</p>
                      {/* Here you would integrate an actual video player */}
                    </div>
                  ) : activeModule.type === "quiz" && activeModule.questions ? (
                    <div className="space-y-6">
                      {activeModule.questions.map((question) => (
                        <div key={question.id} className="bg-white p-4 rounded-md border">
                          <p className="font-medium mb-3">{question.text}</p>
                          <div className="space-y-2">
                            {question.options.map((option, idx) => (
                              <div 
                                key={idx}
                                className={`p-3 border rounded-md cursor-pointer ${
                                  quizAnswers[question.id] === idx 
                                    ? "border-primary bg-primary/5" 
                                    : "hover:bg-gray-50"
                                }`}
                                onClick={() => handleQuizAnswer(question.id, idx)}
                              >
                                <div className="flex items-center">
                                  <div className={`w-4 h-4 mr-2 rounded-full border flex items-center justify-center ${
                                    quizAnswers[question.id] === idx 
                                      ? "border-primary" 
                                      : "border-gray-400"
                                  }`}>
                                    {quizAnswers[question.id] === idx && (
                                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    )}
                                  </div>
                                  <span>{option}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        className="w-full" 
                        onClick={submitQuiz}
                        disabled={activeModule.questions.some(q => quizAnswers[q.id] === undefined)}
                      >
                        Soumettre les réponses
                      </Button>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cours;
