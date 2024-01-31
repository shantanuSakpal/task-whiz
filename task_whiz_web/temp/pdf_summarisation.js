const fs = require("fs");
const pdf = require("pdf-parse");
const axios = require("axios");

function extractTextFromPDF(pdfPath) {
  return new Promise((resolve, reject) => {
    // Read the PDF file
    const dataBuffer = fs.readFileSync(pdfPath);

    // Parse the PDF
    pdf(dataBuffer)
      .then((data) => {
        // Extracted text is available in the `text` property of the data object
        const extractedText = data.text;

        resolve(extractedText);
      })
      .catch((error) => {
        reject(`Error extracting text from PDF: ${error}`);
      });
  });
}

function generateYouTubeQueryAndFetchResponse(pdfPath) {
  // Set your OpenAI GPT API key
  const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY;

  // Extract text from the PDF
  return extractTextFromPDF(pdfPath)
    .then((pdfText) => {
      // Define a prompt
      const prompt = `summarize this in 5 points -> ${pdfText}`;

      // Make a request to the GPT API
      return axios.post(
        "https://api.openai.com/v1/engines/text-davinci-002/completions",
        {
          prompt: prompt,
          max_tokens: 150, // Adjust the number of tokens as needed
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
    })
    .then((response) => {
      // Get the generated text from the response
      const generatedText = response.data.choices[0].text.trim();

      // Return the generated text
      return generatedText;
    })
    .catch((error) => {
      throw error.response ? error.response.data : error.message;
    });
}

// Example usage:
const pdfPath = "X_markshhet.pdf";
generateYouTubeQueryAndFetchResponse(pdfPath)
  .then((text) => {
    console.log("Text:", text);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
