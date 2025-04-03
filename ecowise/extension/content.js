console.log("Eco-Friendly Shopping Assistant is running...");

// Get the search query from Google search bar
const searchQuery = document.querySelector("input[name='q']")?.value;

if (searchQuery) {
    chrome.runtime.sendMessage({ action: "fetch_eco_alternatives", query: searchQuery }, (response) => {
        if (response && response.alternatives.length > 0) {
            displayEcoFriendlyResults(response.alternatives);
        }
    });
}

// Function to display AI-recommended eco-friendly products
function displayEcoFriendlyResults(results) {
    const sidebar = document.createElement("div");
    sidebar.style.position = "fixed";
    sidebar.style.right = "10px";
    sidebar.style.top = "100px";
    sidebar.style.width = "300px";
    sidebar.style.background = "#f4f4f4";
    sidebar.style.padding = "10px";
    sidebar.style.borderRadius = "8px";
    sidebar.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
    sidebar.innerHTML = "<h3>🌱 AI-Recommended Eco Alternatives</h3>";

    results.forEach((item) => {
        const productLink = document.createElement("a");
        productLink.href = item.link;
        productLink.target = "_blank";
        productLink.style.display = "block";
        productLink.style.marginBottom = "10px";
        productLink.style.color = "#008000";
        productLink.style.textDecoration = "none";
        productLink.innerHTML = `✅ <b>${item.title}</b>`;
        sidebar.appendChild(productLink);
    });

    document.body.appendChild(sidebar);
}
