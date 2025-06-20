
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Users, BookOpen, BarChart as BarChartIcon, FileText, FileVideo, Plus, Trash2, BookText } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Dummy data for employee progress
const employeeProgressData = [
  { name: "Alice Martin", progress: 85, course: "JavaScript Fundamentals", lastActive: "2025-05-14" },
  { name: "Robert Chen", progress: 62, course: "React Basics", lastActive: "2025-05-15" },
  { name: "Sofia Garcia", progress: 94, course: "HTML/CSS", lastActive: "2025-05-13" },
  { name: "James Wilson", progress: 45, course: "Node.js Essentials", lastActive: "2025-05-10" },
  { name: "Emma Johnson", progress: 76, course: "TypeScript", lastActive: "2025-05-12" },
];

// Dummy data for course completion stats
const courseCompletionData = [
  { name: "JavaScript", completed: 24, inProgress: 12 },
  { name: "HTML/CSS", completed: 38, inProgress: 8 },
  { name: "React", completed: 18, inProgress: 15 },
  { name: "Node.js", completed: 14, inProgress: 10 },
  { name: "TypeScript", completed: 16, inProgress: 14 },
];

// Dummy data for weekly enrollment
const weeklyEnrollmentData = [
  { week: "Week 1", enrollments: 15 },
  { week: "Week 2", enrollments: 22 },
  { week: "Week 3", enrollments: 18 },
  { week: "Week 4", enrollments: 25 },
];

// Schema for formation creation form
const formationSchema = z.object({
  title: z.string().min(3, { message: "Le titre doit contenir au moins 3 caractères" }),
  description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères" }),
});

// Types for content items
type ContentItemType = "video" | "exercise";

interface ContentItem {
  id: string;
  type: ContentItemType;
  title: string;
  content: string;
  duration?: number; // For videos
  questions?: Question[]; // For exercises
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
}

const chartConfig = {
  courses: {
    label: "Statistiques des cours",
    color: "#8B5CF6",
  },
  enrollments: {
    label: "Inscriptions hebdomadaires",
    color: "#10B981",
  },
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("statistics");
  const { toast } = useToast();

  // State for the formation creation
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [currentItemType, setCurrentItemType] = useState<ContentItemType>("video");
  
  // For new question in exercise
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [currentEditingItemId, setCurrentEditingItemId] = useState<string | null>(null);

  // Form setup for main formation details
  const form = useForm<z.infer<typeof formationSchema>>({
    resolver: zodResolver(formationSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleAddContentItem = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      type: currentItemType,
      title: "",
      content: "",
      ...(currentItemType === "exercise" ? { questions: [] } : { duration: 0 }),
    };
    setContentItems([...contentItems, newItem]);
    setCurrentEditingItemId(newItem.id);
  };

  const handleUpdateContentItem = (id: string, data: Partial<ContentItem>) => {
    setContentItems(
      contentItems.map(item => item.id === id ? { ...item, ...data } : item)
    );
  };

  const handleDeleteContentItem = (id: string) => {
    setContentItems(contentItems.filter(item => item.id !== id));
    if (currentEditingItemId === id) {
      setCurrentEditingItemId(null);
    }
  };

  const handleAddQuestion = (itemId: string) => {
    if (!questionText || options.some(opt => !opt.trim())) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs de la question",
        variant: "destructive",
      });
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      text: questionText,
      options: [...options],
      correctOption: correctOption
    };

    setContentItems(contentItems.map(item => {
      if (item.id === itemId && item.questions) {
        return {
          ...item,
          questions: [...(item.questions || []), newQuestion]
        };
      }
      return item;
    }));

    // Reset form
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectOption(0);

    toast({
      title: "Question ajoutée",
      description: "La question a été ajoutée à l'exercice"
    });
  };

  const handleDeleteQuestion = (itemId: string, questionId: string) => {
    setContentItems(contentItems.map(item => {
      if (item.id === itemId && item.questions) {
        return {
          ...item,
          questions: item.questions.filter(q => q.id !== questionId)
        };
      }
      return item;
    }));
  };

  const handleCreateFormation = (values: z.infer<typeof formationSchema>) => {
    if (contentItems.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez ajouter au moins un contenu (vidéo ou exercice)",
        variant: "destructive",
      });
      return;
    }

    // Check if content items are properly filled
    const incompleteItems = contentItems.filter(item => !item.title || !item.content);
    if (incompleteItems.length > 0) {
      toast({
        title: "Erreur",
        description: "Veuillez compléter tous les contenus ajoutés",
        variant: "destructive",
      });
      return;
    }

    // Here we would typically send the data to an API
    toast({
      title: "Formation créée",
      description: `La formation "${values.title}" a été créée avec succès avec ${contentItems.length} modules`,
    });

    // Reset form
    form.reset();
    setContentItems([]);
    setCurrentEditingItemId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tableau de bord administrateur</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8">
          <TabsTrigger value="statistics">Statistiques</TabsTrigger>
          <TabsTrigger value="employees">Progression des employés</TabsTrigger>
          <TabsTrigger value="formation-creation">Création de Formation</TabsTrigger>
        </TabsList>

        {/* Statistiques Tab */}
        <TabsContent value="statistics" className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total des utilisateurs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120</div>
                <p className="text-xs text-muted-foreground">+8% depuis le mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cours actifs</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 depuis le mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de complétion</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">+5% depuis le mois dernier</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cours complétés vs en progression</CardTitle>
                <CardDescription>Répartition des apprenants par cours</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ChartContainer config={chartConfig} className="h-[300px] md:h-[350px] lg:h-[400px] w-full">
                  <BarChart data={courseCompletionData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} height={60} angle={-45} textAnchor="end" />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="completed" name="courses" stackId="a" fill="#8B5CF6" />
                    <Bar dataKey="inProgress" name="courses" stackId="a" fill="#C4B5FD" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inscriptions hebdomadaires</CardTitle>
                <CardDescription>Tendance des inscriptions sur le dernier mois</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ChartContainer config={chartConfig} className="h-[300px] md:h-[350px] lg:h-[400px] w-full">
                  <LineChart data={weeklyEnrollmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="enrollments"
                      name="enrollments"
                      stroke="#10B981"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progression des employés</CardTitle>
              <CardDescription>Suivez la progression de formation de vos employés</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Cours actuel</TableHead>
                    <TableHead>Progression</TableHead>
                    <TableHead>Dernière activité</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeProgressData.map((employee, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.course}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={employee.progress} className="w-[100px]" />
                          <span className="text-xs text-muted-foreground">{employee.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{employee.lastActive}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aperçu des employés</CardTitle>
              <CardDescription>
                Distribution des employés par niveau de complétion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg bg-muted p-3">
                  <div className="text-lg font-medium">32</div>
                  <div className="text-sm text-muted-foreground">En progression (0-50%)</div>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <div className="text-lg font-medium">56</div>
                  <div className="text-sm text-muted-foreground">Avancés (51-80%)</div>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <div className="text-lg font-medium">32</div>
                  <div className="text-sm text-muted-foreground">Complété (81-100%)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Formation Creation Tab */}
        <TabsContent value="formation-creation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Créer une nouvelle formation</CardTitle>
              <CardDescription>Définissez les détails et ajoutez du contenu à votre formation</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreateFormation)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre de la formation</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Développement Web Avancé" {...field} />
                        </FormControl>
                        <FormDescription>
                          Le titre principal de votre formation.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Décrivez le contenu et les objectifs de cette formation..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Une description détaillée expliquant le contenu et les objectifs de la formation.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Content Items Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Contenu de la formation</h3>
                      <div className="flex items-center space-x-2">
                        <select 
                          value={currentItemType}
                          onChange={(e) => setCurrentItemType(e.target.value as ContentItemType)}
                          className="p-2 border rounded-md"
                        >
                          <option value="video">Vidéo</option>
                          <option value="exercise">Exercice</option>
                        </select>
                        <Button type="button" onClick={handleAddContentItem} size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter
                        </Button>
                      </div>
                    </div>

                    {contentItems.length === 0 && (
                      <div className="text-center p-8 border border-dashed rounded-md">
                        <BookText className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">
                          Aucun contenu ajouté. Utilisez le bouton ci-dessus pour ajouter des vidéos ou des exercices.
                        </p>
                      </div>
                    )}

                    {/* List of added content items */}
                    <div className="space-y-4">
                      {contentItems.map((item) => (
                        <div key={item.id} className="border rounded-md p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              {item.type === "video" ? (
                                <FileVideo className="h-5 w-5 mr-2 text-primary" />
                              ) : (
                                <FileText className="h-5 w-5 mr-2 text-primary" />
                              )}
                              <span className="font-medium capitalize">{item.type === "video" ? "Vidéo" : "Exercice"}</span>
                            </div>
                            <Button 
                              variant="ghost"
                              size="sm" 
                              onClick={() => handleDeleteContentItem(item.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          
                          {/* Item editing area */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <label className="text-sm font-medium">Titre</label>
                                <Input 
                                  value={item.title}
                                  onChange={(e) => handleUpdateContentItem(item.id, { title: e.target.value })}
                                  placeholder={`Titre du ${item.type === "video" ? "vidéo" : "exercice"}`}
                                  className="mt-1"
                                />
                              </div>
                              
                              {item.type === "video" ? (
                                <>
                                  <div>
                                    <label className="text-sm font-medium">URL de la vidéo</label>
                                    <Input 
                                      value={item.content}
                                      onChange={(e) => handleUpdateContentItem(item.id, { content: e.target.value })}
                                      placeholder="https://example.com/video.mp4"
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Durée (minutes)</label>
                                    <Input 
                                      type="number"
                                      value={item.duration || ""}
                                      onChange={(e) => handleUpdateContentItem(item.id, { duration: parseInt(e.target.value) || 0 })}
                                      placeholder="15"
                                      className="mt-1"
                                    />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>
                                    <label className="text-sm font-medium">Description de l'exercice</label>
                                    <Textarea 
                                      value={item.content}
                                      onChange={(e) => handleUpdateContentItem(item.id, { content: e.target.value })}
                                      placeholder="Instructions détaillées pour l'exercice..."
                                      className="mt-1"
                                    />
                                  </div>
                                  
                                  {/* Questions section */}
                                  <div className="border-t pt-4 mt-4">
                                    <h4 className="font-medium mb-2">Questions</h4>
                                    
                                    {/* Question list */}
                                    {item.questions && item.questions.length > 0 ? (
                                      <div className="space-y-3 mb-4">
                                        {item.questions.map((question) => (
                                          <div key={question.id} className="bg-muted p-3 rounded-md">
                                            <div className="flex justify-between">
                                              <p className="font-medium">{question.text}</p>
                                              <Button 
                                                variant="ghost" 
                                                size="sm"
                                                onClick={() => handleDeleteQuestion(item.id, question.id)}
                                                className="h-6 w-6 p-0"
                                              >
                                                <Trash2 className="h-3 w-3 text-destructive" />
                                              </Button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mt-2">
                                              {question.options.map((option, idx) => (
                                                <div 
                                                  key={idx} 
                                                  className={`text-xs p-1 border rounded ${
                                                    idx === question.correctOption 
                                                      ? "bg-green-100 border-green-300" 
                                                      : "bg-gray-50"
                                                  }`}
                                                >
                                                  {option}
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-muted-foreground mb-4">
                                        Aucune question ajoutée pour cet exercice.
                                      </p>
                                    )}
                                    
                                    {/* Add question form */}
                                    <div className="bg-muted p-3 rounded-md space-y-3">
                                      <h5 className="text-sm font-medium">Ajouter une question</h5>
                                      <div>
                                        <label className="text-xs">Question</label>
                                        <Input 
                                          value={questionText}
                                          onChange={(e) => setQuestionText(e.target.value)}
                                          placeholder="Texte de la question"
                                          className="mt-1"
                                        />
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <label className="text-xs">Options</label>
                                        {options.map((option, index) => (
                                          <div key={index} className="flex items-center space-x-2">
                                            <input
                                              type="radio"
                                              checked={correctOption === index}
                                              onChange={() => setCorrectOption(index)}
                                              className="h-4 w-4"
                                            />
                                            <Input 
                                              value={option}
                                              onChange={(e) => {
                                                const newOptions = [...options];
                                                newOptions[index] = e.target.value;
                                                setOptions(newOptions);
                                              }}
                                              placeholder={`Option ${index + 1}`}
                                              className="flex-1"
                                            />
                                          </div>
                                        ))}
                                      </div>
                                      
                                      <Button 
                                        type="button" 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleAddQuestion(item.id)}
                                        className="mt-2"
                                      >
                                        Ajouter la question
                                      </Button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Créer la formation
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
