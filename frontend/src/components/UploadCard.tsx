import { useState } from "react";

type UploadCardProps = {
  title: string;
  onFileSelect: (file: File | null) => void;
};

export default function UploadCard({
  title,
  onFileSelect,
}: UploadCardProps) {
  const [fileName, setFileName] = useState("");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;

    onFileSelect(file);

    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8 hover:shadow-2xl transition duration-300">

      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
        {title}
      </h2>

      <label className="block cursor-pointer">

        <div className="border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center hover:border-blue-600 hover:bg-blue-50 transition">

          <div className="text-6xl mb-4">
            📄
          </div>

          <p className="text-xl font-semibold text-gray-700">
            Click to Upload PDF
          </p>

          <p className="text-gray-500 mt-2">
            Select a healthcare policy document
          </p>

        </div>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />

      </label>

      {fileName && (

        <div className="mt-6 rounded-xl bg-green-50 border border-green-300 p-4">

          <div className="flex items-center gap-3">

            <div className="text-3xl">
              ✅
            </div>

            <div>

              <p className="font-semibold text-green-800">
                File Selected
              </p>

              <p className="text-sm text-gray-700 break-all">
                {fileName}
              </p>

            </div>

          </div>

        </div>

      )}
    </div>
  );
}