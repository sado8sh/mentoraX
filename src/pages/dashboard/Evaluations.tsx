
const Evaluations = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Mes Évaluations</h2>
      <p className="text-gray-500">Consultez et passez vos évaluations pour valider vos acquis.</p>
      
      <div className="mt-6 space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              <h3 className="font-medium">Évaluation {item}</h3>
              <p className="text-sm text-gray-500">Quiz de validation - Cours {item}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">20 minutes</span>
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                Commencer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Evaluations;
