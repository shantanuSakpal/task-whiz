const axios = require("axios");

title1 = "complete account react UI from the figma";
description1 =
  "Develop a comprehensive React user interface for account management based on the design provided in Figma. Ensure a pixel-perfect implementation, incorporating all visual elements, layouts, and interactions outlined in the Figma design. Implement necessary functionality for account creation, login, password management, and other relevant account-related features. Utilize React best practices, modular components, and responsive design to create a seamless and user-friendly experience. Pay special attention to details such as form validation, error handling, and accessibility. Document the React components and their functionalities for future reference. Collaborate with the design team to address any design-related queries and deliver a polished and fully functional account UI.";

const title = "Make Authentication API Controllers";
let description = `
Develop API controllers for user registration, login, token verification, password reset, and token refresh.
`;

function generateYouTubeQueryAndFetchResponse(title, description) {
  // Set your OpenAI GPT API key
  const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY;

  // Define a prompt
  const prompt = `generate a query to search on google to learn relevant skill to do the following task title ${title} and description ${description} give response in one line `;

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
      const linkPrompt = `${generatedText} -> for this title of task  suggest reference and study link to refer to accomplish this task -> give only the raw links in a list like -> link1.com, link2.com, ...., link5 -> don't include the title of link -> give complete URL and don't include anything else except the link comma separated`;

      // Make a request to the GPT API for generating links
      return axios
        .post(
          "https://api.openai.com/v1/engines/text-davinci-002/completions",
          {
            prompt: linkPrompt,
            max_tokens: 150, // Adjust the number of tokens as needed
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        )
        .then((res) => {
          const linksResponse = res.data.choices[0].text.trim();

          // Use a regular expression to clean up the output
          const links = linksResponse.match(/https?:\/\/[^\s]+/g);
          console.log("Reference Links:", links);

          return links || []; // Return an empty array if links are null
        });
    });
}

// Example usage:
generateYouTubeQueryAndFetchResponse(title, description)
  .then((linksArray) => {
    // Do something with the array of links
    console.log("Links Array:", linksArray);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
