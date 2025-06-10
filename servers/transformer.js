
async function summarizeText(text) {
  try {

    console.log("Sending request to:", process.env.API_URL);
    
    const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        inputs: text.trim(),
        options: {
          wait_for_model: true
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Response Error:", errorText);
      throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    // Handle different response formats
    if (Array.isArray(data) && data.length > 0) {
      return data[0]?.summary_text || data[0]?.generated_text || data[0];
    } else if (data?.summary_text) {
      return data.summary_text;
    } else if (data?.generated_text) {
      return data.generated_text;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error summarizing text:", error);
    throw error;
  }
}

export { summarizeText };