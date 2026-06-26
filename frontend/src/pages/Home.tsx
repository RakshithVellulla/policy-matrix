import UploadCard from "../components/UploadCard";
import { checkBackend } from "../services/api";

export default function Home() {
  async function handleAnalyze() {
    try {
      const data = await checkBackend();
      alert(data.message);
    } catch (error) {
      alert("Cannot connect to backend.");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-blue-700">
          Policy Matrix
        </h1>

        <p className="text-center text-gray-600 mt-3 text-lg">
          Transforming Healthcare Policies into Trusted Decisions
        </p>

        <div className="grid grid-cols-2 gap-6 mt-12">
          <UploadCard title="Previous Policy" />
          <UploadCard title="Updated Policy" />
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleAnalyze}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Analyze Policies
          </button>
        </div>
      </div>
    </div>
  );
}