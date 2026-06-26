import { useState } from "react";

type UploadCardProps = {
  title: string;
};

export default function UploadCard({ title }: UploadCardProps) {
  const [fileName, setFileName] = useState("");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      setFileName(file.name);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="w-full border rounded-lg p-2"
      />

      {fileName && (
        <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3">
          <p className="font-medium">📄 {fileName}</p>
          <p className="text-sm text-green-700">✓ File Selected</p>
        </div>
      )}
    </div>
  );
}