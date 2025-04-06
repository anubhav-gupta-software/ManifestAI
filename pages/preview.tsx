import { styledTemplates } from "../lib/styledTemplates";

const dummyImages = [
  "https://via.placeholder.com/400x300?text=Image+1",
  "https://via.placeholder.com/300x400?text=Image+2",
  "https://via.placeholder.com/300x300?text=Image+3",
  "https://via.placeholder.com/500x400?text=Image+4",
  "https://via.placeholder.com/400x500?text=Image+5",
  "https://via.placeholder.com/450x350?text=Image+6",
];

const renderLayout = (layout: any[], scale = 0.4) => (
  <div
    className="relative border border-purple-600 bg-[#f2f2f2] rounded-xl mb-8 shadow-lg"
    style={{
      width: `${1122 * scale}px`,
      height: `${794 * scale}px`,
      margin: "auto",
    }}
  >
    {dummyImages.map((img, i) => {
      const slot = layout[i];
      const customStyle = slot.style || {};
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            top: slot.top * scale,
            left: slot.left * scale,
            width: slot.width * scale,
            height: slot.height * scale,
            transform: customStyle.rotate
              ? `rotate(${customStyle.rotate})`
              : undefined,
            zIndex: customStyle.zIndex || 1,
            backgroundColor: "#fff",
            border: "2px solid #ddd",
            borderRadius: "0.75rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={img}
            alt={`Preview ${i}`}
            className="w-full h-full object-cover"
          />
        </div>
      );
    })}
  </div>
);

export default function TemplatePreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8e8e8] to-[#ffffff] text-gray-800 p-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-purple-600">
        🔍 Styled Vision Board Template Previews
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {styledTemplates.map((layout, index) => (
          <div key={index}>
            <h2 className="text-center mb-4 text-pink-500 font-semibold">
              Template {index + 1}
            </h2>
            {renderLayout(layout)}
          </div>
        ))}
      </div>
    </div>
  );
}
