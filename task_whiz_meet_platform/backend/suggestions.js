// npm install @google/generative-ai
const fs = require("fs");

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

var transcript = require("./transcript.json");

const MODEL_NAME = "gemini-pro";
const API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY;

const run = async () => {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.1,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {
      text: transcript.text,
    },
    {
      text: `{
        "task_id": "Unique identifier for the task_alphanumeric 5 characters_randomly for evertime I run this code",
        "task_name": "Name of the task",
        "task_description": "Detailed description of the task",
        "task_status": "Current status of the task (e.g., in_progress, to_do, completed)",
        "task_due_date": "Due date for the task",
        "task_assign_to": "Array of Person or team assigned to the task",
        "task_dependencies":[], // Array of task IDs that this task depends on
        "task_skills":[] // Array of skills that are required for completing the task (refer to task name and description for this)
        "task_priority":"Priority of the task"
        "basePointCalculation":base points calculation( no. of days required to complete the task *10 and if priority os high then +20 , if  medium then+10 and if low then +5)
      }
  
  
  
  Parse the transcript and extract the relevant information to populate the JSON fields. Ensure that each task has a unique identifier.keep the task id alphanumeric and keep it unique everytime
  
  Each task should have its own unique identifier, name, description, assigned person or team, status, due date, other task dependencies, priority and basePointCalculation.
  task depencies should be considered
  Review the generated JSON to ensure that it accurately reflects the information discussed in the transcript.
  <br>
  **Note:**The task_description fields should include any dependencies mentioned in the transcript.`,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  transcript.text = "";
  fs.writeFileSync("./transcript.json", JSON.stringify(transcript));

  return result.response;
};

module.exports = { run };
