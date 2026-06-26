import { useState } from "react";
import UploadCard from "../components/UploadCard";
import Results from "./Results";
import { uploadPolicies } from "../services/uploadApi";

export default function Home() {
  const [previousPolicy, setPreviousPolicy] = useState<File | null>(null);
  const [updatedPolicy, setUpdatedPolicy] = useState<File | null>(null);

  const [previousText, setPreviousText] = useState("");
  const [updatedText, setUpdatedText] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!previousPolicy || !updatedPolicy) {
      alert("Please select both PDF files.");
      return;
    }

    try {
      setLoading(true);

      const result = await uploadPolicies(previousPolicy, updatedPolicy);

      setPreviousText(result.previous_text);
      setUpdatedText(result.updated_text);
    } catch (error) {
      console.error(error);
      alert("Failed to upload files.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-blue-700">
          Policy Matrix
        </h1>

        <p className="text-center text-gray-600 mt-3 text-lg">
          Transforming Healthcare Policies into Trusted Decisions
        </p>

        <div className="grid grid-cols-2 gap-6 mt-12">
          <UploadCard
            title="Previous Policy"
            onFileSelect={setPreviousPolicy}
          />

          <UploadCard
            title="Updated Policy"
            onFileSelect={setUpdatedPolicy}
          />
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold"
          >
            {loading ? "Analyzing..." : "Analyze Policies"}
          </button>
        </div>

        {(previousText || updatedText) && (
          <Results
            previousText={previousText}
            updatedText={updatedText}
          />
        )}
      </div>
    </div>
  );
}