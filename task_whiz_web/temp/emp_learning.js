const axios = require("axios");

const title = "Make Authentication API Controllers";
let description = `
Develop API controllers for user registration, login, token verification, password reset, and token refresh.

Requirements:
- Validate and securely store user data.
- Implement token-based authentication.
- Ensure security measures against common vulnerabilities.
- Provide clear documentation.
- Write unit and integration tests.

Notes:
- Follow best practices in JavaScript and API development.
- Reach out for assistance if needed.

Thank you!
`;

function generateYouTubeQueryAndFetchResponse(title, description) {
  // Set your OpenAI GPT API key
  const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY;

  // Define a prompt
  const prompt = `generate a query to search on youtube to learn relevant skill to do the following task title ${title} and description ${description} give response in one line `;

  // Make a request to the GPT API
  return axios
    .post(
      "https://api.openai.com/v1/engines/text-davinci-002/completions",
      {
        prompt: prompt,
        max_tokens: 15, // Adjust the number of tokens as needed
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
    .then((response) => {
      // Get the generated text from the response
      const generatedText = response.data.choices[0].text.trim();

      // Print the generated text
      console.log("Generated Query:", generatedText);

      // Use the generated text as the query parameter for the YouTube API
      const youtubeApiKey = "AIzaSyDLGOfsmQ3kvOt8OLHOxiFhs4IcpHyjgDE"; // Replace with your actual YouTube API key
      const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&q=${encodeURIComponent(
        generatedText
      )}`;

      // Make a request to the YouTube API and return the promise
      return axios.get(youtubeApiUrl);
    })
    .catch((error) => {
      throw error.response ? error.response.data : error.message;
    });
}

// Example usage:
generateYouTubeQueryAndFetchResponse(title, description)
  .then((youtubeResponse) => {
    // Print the response from the YouTube API
    console.log("YouTube API Response:", youtubeResponse.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
