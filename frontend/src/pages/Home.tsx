import { useState } from "react";
import UploadCard from "../components/UploadCard";
import AISummary from "../components/AISummary";
import { uploadPolicies } from "../services/uploadApi";
import { downloadReport } from "../services/reportService";

export default function Home() {
  const [previousPolicy, setPreviousPolicy] = useState<File | null>(null);
  const [updatedPolicy, setUpdatedPolicy] = useState<File | null>(null);

  const [previousFileName, setPreviousFileName] = useState("");
  const [updatedFileName, setUpdatedFileName] = useState("");

  const [totalChanges, setTotalChanges] = useState(0);
  const [addedCount, setAddedCount] = useState(0);
  const [removedCount, setRemovedCount] = useState(0);

  const [aiSummary, setAiSummary] = useState("");

  const [loading, setLoading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  async function handleAnalyze() {
    if (!previousPolicy || !updatedPolicy) {
      alert("Please select both PDF files.");
      return;
    }

    try {
      setLoading(true);

      const result = await uploadPolicies(previousPolicy, updatedPolicy);

      setPreviousFileName(result.previous_policy);
      setUpdatedFileName(result.updated_policy);

      setTotalChanges(result.total_changes);
      setAddedCount(result.added_count);
      setRemovedCount(result.removed_count);

      setAiSummary(result.ai_summary);

      setAnalysisComplete(true);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to analyze policies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-700">
            🏥 Policy Matrix
          </h1>

          <p className="text-2xl font-semibold text-gray-700 mt-4">
            AI-Powered Healthcare Policy Comparison
          </p>

          <p className="text-gray-500 mt-3 text-lg">
            Upload two healthcare policy documents and generate an AI-powered
            comparison report in seconds.
          </p>
        </div>

        {/* Upload Section */}

        <div className="grid md:grid-cols-2 gap-8">
          <UploadCard
            title="Previous Policy"
            onFileSelect={setPreviousPolicy}
          />

          <UploadCard
            title="Updated Policy"
            onFileSelect={setUpdatedPolicy}
          />
        </div>

        {/* Analyze Button */}

        <div className="flex justify-center mt-10">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:scale-105 transition duration-300"
          >
            {loading ? "Analyzing Policies..." : "🔍 Analyze Policies"}
          </button>
        </div>

        {/* Results */}
        {loading && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-[450px] text-center">

      <div className="text-6xl mb-4 animate-spin">
        ⚙️
      </div>

      <h2 className="text-2xl font-bold text-blue-700">
        Analyzing Healthcare Policies
      </h2>

      <p className="mt-4 text-gray-600">
        Comparing policy documents...
      </p>

      <p className="mt-2 text-gray-600">
        Generating AI insights...
      </p>

      <p className="mt-2 text-gray-600">
        Preparing analysis report...
      </p>

      <div className="w-full bg-gray-200 rounded-full h-3 mt-8 overflow-hidden">
        <div className="bg-blue-600 h-3 rounded-full animate-pulse w-full"></div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Please wait...
      </p>

    </div>
  </div>
)}

        {analysisComplete && (
          <>
            <div className="mt-12 bg-white rounded-2xl shadow-xl border border-gray-200 p-8">

              <h2 className="text-4xl font-bold text-green-700 mb-8">
                ✅ Policy Analysis Complete
              </h2>

              <div className="grid md:grid-cols-2 gap-6 text-lg">

                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="font-semibold text-gray-500 mb-2">
                    📄 Previous Policy
                  </p>

                  <p className="font-medium break-words">
                    {previousFileName}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="font-semibold text-gray-500 mb-2">
                    📄 Updated Policy
                  </p>

                  <p className="font-medium break-words">
                    {updatedFileName}
                  </p>
                </div>

              </div>

              <hr className="my-8" />

              <h3 className="text-2xl font-bold mb-6">
                📊 Analysis Summary
              </h3>

              <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-blue-50 rounded-2xl shadow-md p-6 text-center">
                  <div className="text-4xl mb-2">📊</div>

                  <p className="text-gray-600 font-semibold">
                    Total Changes
                  </p>

                  <p className="text-5xl font-bold text-blue-700 mt-3">
                    {totalChanges}
                  </p>
                </div>

                <div className="bg-green-50 rounded-2xl shadow-md p-6 text-center">
                  <div className="text-4xl mb-2">🟢</div>

                  <p className="text-gray-600 font-semibold">
                    Added Policies
                  </p>

                  <p className="text-5xl font-bold text-green-700 mt-3">
                    {addedCount}
                  </p>
                </div>

                <div className="bg-red-50 rounded-2xl shadow-md p-6 text-center">
                  <div className="text-4xl mb-2">🔴</div>

                  <p className="text-gray-600 font-semibold">
                    Removed Policies
                  </p>

                  <p className="text-5xl font-bold text-red-700 mt-3">
                    {removedCount}
                  </p>
                </div>

              </div>
            </div>

            <AISummary summary={aiSummary} />

            <div className="flex justify-center mt-8 mb-10">
              <button
                onClick={() =>
                  downloadReport(
                    previousFileName,
                    updatedFileName,
                    totalChanges,
                    addedCount,
                    removedCount,
                    aiSummary
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:scale-105 transition duration-300"
              >
                📄 Download Analysis Report
              </button>
            </div>
          </>
        )}
      </div>
      <footer className="mt-16 border-t border-gray-300 pt-6 text-center text-gray-500">
  <p className="font-medium">
    © 2026 Policy Matrix
  </p>

  <p className="text-sm mt-2">
    AI-Powered Healthcare Policy Comparison Platform
  </p>
</footer>
    </div>
    
  );
}