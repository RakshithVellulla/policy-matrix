type UploadCardProps = {
  title: string;
};

export default function UploadCard({ title }: UploadCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <input
        type="file"
        accept=".pdf"
        className="w-full border rounded-lg p-2"
      />
    </div>
  );
}