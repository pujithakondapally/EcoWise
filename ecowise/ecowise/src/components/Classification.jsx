import React, { useState } from "react";

const classMapping = {
  0: "Battery",
  1: "Biological Waste",
  2: "Brown Glass",
  3: "Cardboard",
  4: "Clothes",
  5: "Green Glass",
  6: "Metal",
  7: "Paper",
  8: "Plastic",
  9: "Shoes",
  10: "Trash",
  11: "White Glass",
};

const WasteClassification = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [result, setResult] = useState("");
  const [flag,setFlag] = useState(false)

  const captureImage = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/capture");
      const data = await response.json();
      if (data.image_path) {
        setImageSrc(data.image_path);
        setFlag(true);
      } else {
        alert("Failed to capture image");
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  const classifyImage = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_path: "captured_image.png" }),
      });
      const data = await response.json();
      setResult(`Predicted Class: ${classMapping[data.predicted_class]}`);
    } catch (error) {
      console.error("Error classifying image:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Waste Classification</h1>
      <button onClick={captureImage} style={{ padding: "10px 20px", margin: "10px", fontSize: "16px", cursor: "pointer" }}>
        Capture Image
      </button>
      <br />
      {flag && <img src="image.jpg" alt="Captured" style={{ width: "300px", marginTop: "10px" }} />}
      <br />
      <button onClick={classifyImage} style={{ padding: "10px 20px", margin: "10px", fontSize: "16px", cursor: "pointer" }}>
        Classify Image
      </button>
      <p>{result}</p>
    </div>
  );
};

export default WasteClassification;
