type ResultsProps = {
  previousText: string;
  updatedText: string;
};

export default function Results({
  previousText,
  updatedText,
}: ResultsProps) {
  return (
    <div className="mt-10 space-y-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Previous Policy
        </h2>

        <div className="max-h-80 overflow-y-auto whitespace-pre-wrap text-sm">
          {previousText}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Updated Policy
        </h2>

        <div className="max-h-80 overflow-y-auto whitespace-pre-wrap text-sm">
          {updatedText}
        </div>
      </div>
    </div>
  );
}