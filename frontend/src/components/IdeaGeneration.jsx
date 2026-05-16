// src/components/IdeaGeneration.jsx
import { useState } from "react";
import axios from "axios";

export default function IdeaGeneration({ user }) {
  const [domain, setDomain] = useState("");
  const [project, setProject] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!domain.trim() || !project.trim()) return;

    setLoading(true);
    setIdeas([]);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/idea", {
        domain,
        project,
      });

      // Assuming Gemini returns a single string, split by line breaks
      const generatedIdeas = res.data.ideas.split("\n").filter((i) => i.trim());
      setIdeas(generatedIdeas);
    } catch (err) {
      console.error(err);
      setError("Failed to generate ideas. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Idea Generation</h2>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          placeholder="Enter domain (e.g., Healthcare, AI, Education)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="text"
          placeholder="Project title"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Generating..." : "Generate Ideas"}
        </button>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {ideas.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Generated Ideas:</h3>
          <ul className="list-disc list-inside space-y-1">
            {ideas.map((idea, idx) => (
              <li key={idx}>{idea}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
