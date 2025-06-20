
import { BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const courseData = [
  { name: 'JavaScript', completed: 85 },
  { name: 'HTML/CSS', completed: 92 },
  { name: 'React', completed: 68 },
  { name: 'Node.js', completed: 45 },
  { name: 'TypeScript', completed: 72 },
];

const weeklyProgressData = [
  { day: 'Lun', minutes: 45 },
  { day: 'Mar', minutes: 65 },
  { day: 'Mer', minutes: 30 },
  { day: 'Jeu', minutes: 90 },
  { day: 'Ven', minutes: 50 },
  { day: 'Sam', minutes: 120 },
  { day: 'Dim', minutes: 40 },
];

const quizScoreData = [
  { module: 'Module 1', score: 85 },
  { module: 'Module 2', score: 92 },
  { module: 'Module 3', score: 78 },
  { module: 'Module 4', score: 88 },
  { module: 'Module 5', score: 76 },
];

const categoryDistributionData = [
  { name: 'Frontend', value: 45 },
  { name: 'Backend', value: 25 },
  { name: 'DevOps', value: 15 },
  { name: 'Design', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const chartConfig = {
  courses: {
    label: "Progression des cours",
    color: "#8B5CF6",
  },
  weekly: {
    label: "Temps d'étude hebdomadaire",
    color: "#10B981",
  },
  quizScores: {
    label: "Scores des quiz",
    color: "#F97316",
  },
  categories: {
    label: "Catégories étudiées",
  },
};

const Progression = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4">Ma Progression</h2>
        <p className="text-gray-500">Suivez votre progression dans les différents cours et parcours.</p>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 bg-blue-50">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">Cours complétés</h3>
              <span className="text-xl font-bold text-primary">3/12</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 bg-green-50">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">Score moyen</h3>
              <span className="text-xl font-bold text-green-600">78%</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-green-600 h-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 bg-orange-50">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">Temps d'apprentissage</h3>
              <span className="text-xl font-bold text-orange-600">12h</span>
            </div>
            <div className="mt-2 flex items-center justify-center text-center text-sm text-gray-500 pt-1">
              Cette semaine
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistiques détaillées */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChartIcon className="text-gray-500" />
          <h3 className="text-lg font-medium">Statistiques détaillées</h3>
        </div>
        
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="mb-4 w-full flex flex-wrap">
            <TabsTrigger value="courses" className="flex-1">Progression des cours</TabsTrigger>
            <TabsTrigger value="activity" className="flex-1">Activité hebdomadaire</TabsTrigger>
            <TabsTrigger value="scores" className="flex-1">Scores des quiz</TabsTrigger>
            <TabsTrigger value="categories" className="flex-1">Catégories</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Progression par cours</CardTitle>
                <CardDescription>Pourcentage de cours complétés</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ChartContainer config={chartConfig} className="h-[300px] md:h-[350px] lg:h-[400px] w-full">
                  <BarChart data={courseData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} height={60} angle={-45} textAnchor="end" />
                    <YAxis unit="%" tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="completed" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Activité hebdomadaire</CardTitle>
                <CardDescription>Minutes d'étude par jour</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ChartContainer config={chartConfig} className="h-[300px] md:h-[350px] lg:h-[400px] w-full">
                  <LineChart data={weeklyProgressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis unit="min" tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="minutes" name="weekly" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scores" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Scores des quiz</CardTitle>
                <CardDescription>Performance dans les évaluations</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ChartContainer config={chartConfig} className="h-[300px] md:h-[350px] lg:h-[400px] w-full">
                  <BarChart data={quizScoreData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="module" tick={{ fontSize: 12 }} height={60} angle={-45} textAnchor="end" />
                    <YAxis unit="%" tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" name="quizScores" fill="#F97316" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Répartition des catégories</CardTitle>
                <CardDescription>Pourcentage du temps passé par catégorie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] md:h-[350px] lg:h-[400px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius="60%"
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Progression;
