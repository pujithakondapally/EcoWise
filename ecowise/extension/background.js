chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "fetch_eco_alternatives") {
        console.log("Querying Gemini AI for eco-friendly alternatives:", message.query);

        const API_KEY = "YOUR_GOOGLE_GEMINI_API_KEY"; // Replace with a valid API Key
        const query = `Find eco-friendly alternatives for ${message.query}. 
            Provide a list of products in JSON format with the following fields:
            - title (string)
            - price (string)
            - link (string)
            - description (string)
        `;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] })
            });

            const data = await response.json();
            console.log("Gemini API Response:", data);

            let ecoProducts = [];

            try {
                // Extract JSON from AI's text response
                const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
                const jsonMatch = textResponse.match(/\[.*\]/s); // Look for a JSON array
                if (jsonMatch) {
                    ecoProducts = JSON.parse(jsonMatch[0]); // Parse only the valid JSON
                } else {
                    console.warn("No valid JSON detected in response.");
                }
            } catch (error) {
                console.error("Error parsing JSON response:", error);
            }

            sendResponse({ alternatives: ecoProducts });
        } catch (error) {
            console.error("Error fetching from Gemini API:", error);
            sendResponse({ alternatives: [] });
        }

        return true; // Keeps the response channel open for async response
    }
});
