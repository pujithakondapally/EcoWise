import React from "react";

const Extension = () => {
  const openExtension = () => {
    // Simulates a user pressing the extension shortcut (default: Alt + Shift + E)
    alert("Press your extension's shortcut (e.g., Alt + Shift + E) if needed!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold">Eco-friendly Shopping Assistant</h1>
      <p className="text-lg mt-4 text-gray-300 text-center max-w-xl">
        Click below to open the Eco-friendly Shopping Assistant extension.
      </p>

      <button
        onClick={openExtension}
        className="mt-6 bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
      >
        Try Extension Now
      </button>
    </div>
  );
};

export default Extension;
