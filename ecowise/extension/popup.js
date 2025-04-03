document.getElementById("searchBtn").addEventListener("click", async function () {
    const productName = document.getElementById("productName").value.trim();
    const resultsDiv = document.getElementById("results");

    if (!productName) {
        resultsDiv.innerHTML = "<p>Please enter a product name.</p>";
        return;
    }

    resultsDiv.innerHTML = "<p>Searching...</p>";

    const API_KEY = "YOUR_GOOGLE_GEMINI_API_KEY"; // Replace with your actual API key
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAXWw5FZQitjeGW5glDxFAaKGJNotUbWX8`;

    const requestData = {
        "contents": [
            {
                "parts": [
                    {
                        "text": `You are google search engine, Find eco-friendly alternatives for ${productName}. Focus on verified and valid Indian brands and provide a list of products in JSON format with the following fields: 
                        - title (string) 
                        - link (string) (give links to actual websites not the product links and do not hallucinate and check if the link exists before giving) 
                        - price (string) 
                        - description (string) 
                        - tags (list of strings of the eco-friendly materials used to make it).`
                    }
                ]
            }
        ]
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            const rawText = data.candidates[0].content.parts[0].text;

            // Extract the JSON part using regex
            const jsonMatch = rawText.match(/\[.*\]/s); // Finds text within square brackets
            if (jsonMatch) {
                try {
                    const jsonResponse = JSON.parse(jsonMatch[0]); // Parse only the valid JSON

                    resultsDiv.innerHTML = jsonResponse.map(product => `
                        <div class="card product">
                            <div class="card-body">
                                <h3 class="card-title">${product.title}</h3>
                                <p class="card-text"><strong>Price:</strong> <span class="badge text-bg-success">${product.price}</span></p>
                                <p class="card-text">
                                    <strong>Link:</strong> 
                                    <a href="${product.link}" target="_blank" class="text-primary">${product.link}</a>
                                    </p>
                                <p class="card-text"><strong>Description:</strong> ${product.description}</p>
                                <div class="tags">
                                    <strong>Eco-Friendly Materials:</strong>
                                    ${product.tags.map(tag => `<span class="badge rounded-pill text-bg-info">${tag}</span>`).join(" ")}
                                </div>
                            </div>
                        </div>
                    `).join("");                    
                } catch (parseError) {
                    console.error("Error parsing JSON:", parseError);
                    resultsDiv.innerHTML = "<p>Failed to parse product data.</p>";
                }
            } else {
                console.warn("No valid JSON found in response.");
                resultsDiv.innerHTML = "<p>No structured data found. Try again.</p>";
            }
        } else {
            resultsDiv.innerHTML = "<p>No results found.</p>";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        resultsDiv.innerHTML = "<p>Failed to fetch results.</p>";
    }
});
