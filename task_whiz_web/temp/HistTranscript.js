//!npm install @google-cloud/dialogflow-cx
const dialogflow = require("@google-cloud/dialogflow-cx");

const sessionClient = new dialogflow.SessionsClient();

async function detectIntent(
  projectId,
  location,
  agentId,
  sessionId,
  languageCode,
  queryText
) {
  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent:");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.transcript}`);
  console.log(`  Response: ${result.responseMessages[0].text.text[0]}`);
  if (result.match.intent) {
    console.log(`  Matched Intent: ${result.match.intent.displayName}`);
  }
  return result;
}

async function entityExtraction(
  projectId,
  location,
  agentId,
  sessionId,
  languageCode
) {
  // Create a new session
  const session = await sessionClient.createSession({
    parent: sessionClient.projectLocationAgentPath(
      projectId,
      location,
      agentId
    ),
  });
  console.log(`Session Path: ${session.name}`);
  sessionId = session.name.split("/").pop(-1);

  // Detect intents for a session with queries
  const queryText =
    "I would like to reserve a room for 5 people in San Francisco for tomorrow night.";
  const result = await detectIntent(
    projectId,
    location,
    agentId,
    sessionId,
    languageCode,
    queryText
  );
  console.log(`Query Result: ${JSON.stringify(result)}`);

  // Get parameters from the last response
  const parameters = result.parameters.fields;
  const roomSize = parameters["room-size"].numberValue;
  const locationParam = parameters["location"].listValue.values[0].stringValue;
  const dateParam = parameters["date"].listValue.values[0].stringValue;
  const timeParam = parameters["time"].listValue.values[0].stringValue;

  console.log(`Room size: ${roomSize}`);
  console.log(`Location: ${locationParam}`);
  console.log(`Date: ${dateParam}`);
  console.log(`Time: ${timeParam}`);

  // Delete session
  await sessionClient.deleteSession({
    name: session.name,
  });
}

entityExtraction(projectId, location, agentId, sessionId, languageCode);
`
Here are the key differences between the Python and JavaScript code:

* In JavaScript, we use the "@google-cloud/dialogflow-cx" library instead of "google.colab" and "google.generativeai".
* The "detectIntent" function in JavaScript takes different arguments compared to Python.
* We use "console.log" instead of "print" to display the results.
* The JavaScript code includes a "createSession" function to create a new session before sending queries.
* The JavaScript code also includes a "deleteSession" function to delete the session after it is no longer needed.
`;
