// src/components/IdeaGeneration.jsx

import { useState } from "react";

export default function IdeaGeneration({ user }) {
  const [domain, setDomain] = useState("");
  const [project, setProject] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [error, setError] = useState("");

  const handleGenerate = () => {
    setError("");
    setIdeas([]);

    if (!domain.trim() || !project.trim()) {
      setError("Please enter both Domain and Project Title.");
      return;
    }

    const generatedIdeas = [
      `AI-Powered ${project} Management System for ${domain}`,
      `Smart ${domain} Analytics Dashboard using Machine Learning`,
      `${project} Collaboration and Workflow Platform`,
      `Real-Time ${domain} Monitoring and Alert System`,
      `${project} Recommendation Engine using AI`,
      `Cloud-Based ${project} Management Portal`,
      `${project} Automation System with Intelligent Insights`,
      `Predictive Analytics Solution for ${domain}`,
      `Mobile Application for ${project} Tracking and Management`,
      `Data-Driven Decision Support System for ${domain}`,
    ];

    setIdeas(generatedIdeas);
  };

  const handleReset = () => {
    setDomain("");
    setProject("");
    setIdeas([]);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Idea Generation
      </h2>

      <p className="text-gray-600 mb-6">
        Enter a domain and project title to generate innovative project ideas.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Domain
          </label>
          <input
            type="text"
            placeholder="e.g. Healthcare, AI, Education, Finance"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Project Title
          </label>
          <input
            type="text"
            placeholder="Enter project title"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Generate Ideas
          </button>

          <button
            onClick={handleReset}
            className="px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-5 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {ideas.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Generated Ideas
          </h3>

          <div className="grid gap-4">
            {ideas.map((idea, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl bg-gray-50 hover:shadow-md transition"
              >
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                    {index + 1}
                  </span>

                  <p className="text-gray-700 font-medium">{idea}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {ideas.length === 0 && !error && (
        <div className="mt-8 p-6 text-center border-2 border-dashed rounded-xl text-gray-500">
          Enter project details and click "Generate Ideas" to see suggestions.
        </div>
      )}
    </div>
  );
}