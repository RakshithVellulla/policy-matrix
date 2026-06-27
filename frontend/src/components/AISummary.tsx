type Props = {
  summary: string;
};

export default function AISummary({ summary }: Props) {
  if (!summary) return null;

  const sections = summary.split(
    /\n\s*\n(?=Executive Summary|Key Changes|Business Impact|Recommendation)/
  );

  function getIcon(title: string) {
    if (title.includes("Executive")) return "📝";
    if (title.includes("Key")) return "🔍";
    if (title.includes("Business")) return "💼";
    if (title.includes("Recommendation")) return "💡";
    return "📄";
  }

  function getColor(title: string) {
    if (title.includes("Executive")) return "border-blue-500";
    if (title.includes("Key")) return "border-green-500";
    if (title.includes("Business")) return "border-orange-500";
    if (title.includes("Recommendation")) return "border-purple-500";
    return "border-gray-300";
  }

  return (
    <div className="mt-10 space-y-6">

      <h2 className="text-3xl font-bold text-center text-gray-800">
        🤖 AI Policy Insights
      </h2>

      {sections.map((section, index) => {
        const lines = section.trim().split("\n");

        const title = lines[0];
        const content = lines.slice(1).join("\n");

        return (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-lg border-l-8 ${getColor(
              title
            )} p-6 hover:shadow-xl transition duration-300`}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">
                {getIcon(title)}
              </span>

              <h3 className="text-2xl font-bold text-gray-800">
                {title}
              </h3>
            </div>

            <div className="whitespace-pre-wrap leading-8 text-gray-700">
              {content}
            </div>
          </div>
        );
      })}
    </div>
  );
}