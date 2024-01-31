// npm install @google/generative-ai

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-pro";
const API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY;

async function run() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.2,
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
  const transcript = {
    text: `Meeting Start: 10:00 AM

    Chris (Product Manager): Good morning, everyone. Thanks for joining. Today, we're here to discuss the development of our new in-house task manager app. Mike, can you start us off with the requirements from the sales perspective?
    
    Mike (Sales Person): Sure, Chris. I've been hearing from our clients that they're struggling with project management. They need a solution that is user-friendly and integrates seamlessly with their existing tools.
    
    Chris: Great, that's helpful. Alex, Sarah, any initial thoughts from the development side?
    
    Alex (Software Developer): I think we should focus on a clean and intuitive interface. Users should be able to create, assign, and track tasks effortlessly.
    
    Sarah (Software Developer): Agreed. Additionally, we should make sure it's accessible on various platforms – desktop, web, and mobile.
    
    Chris: Good points. Emily, how about the design elements? Any specific ideas for the app's look and feel?
    
    Emily (Designer): I'm thinking a modern, minimalistic design. Color-coded categories for different tasks could help users quickly identify and prioritize their work.
    
    Chris: Nice. Now, Chris, as the product manager, what are your thoughts on the overall scope and timeline?
    
    Chris (Product Manager): I propose we start with a basic set of features, such as task creation, assignment, and status updates. We can then roll out additional features in future updates. Regarding the timeline, I'd like to see a beta version within two months. What do you think?
    
    Alex: Two months should be feasible for a basic version. We can always iterate and add features in subsequent releases.
    
    Sarah: I agree. Let's aim for a functional, user-friendly beta within that timeframe.
    
    Mike: From a sales perspective, the sooner we can provide a solution to our clients, the better. Two months sounds good.
    
    Emily: I'll make sure the design elements align with the proposed timeline. Quick question – any specific color preferences?
    
    Chris: Let's stick with our company colors for branding consistency.
    
    Chris (Product Manager): Alright, it seems we're aligned on the initial plan. Let's schedule regular check-ins to track progress. Anything else on the agenda?
    
    Alex: We should consider integration with popular project management tools to enhance usability.
    
    Sarah: Good point. We should also think about security measures, especially if we're dealing with sensitive client data.
    
    Chris: Excellent suggestions. Let's incorporate those considerations into our development plan.
    
    Meeting End: 11:00 AM`,
  };

  const parts = [
    {
      transcript,
    },
    {
      text: `{
        "task_id": "Unique identifier for the task",
        "task_name": "Name of the task",
        "task_description": "Detailed description of the task",
        "task_priority": "Priority level of the task (e.g., High, Medium, Low)",
        "task_status": "Current status of the task (e.g., In Progress, To Do, Completed)",
        "task_due_date": "Due date for the task",
        "task_start_date": "Start date for the task",
        "task_completion_percentage": "Percentage of task completion",
        "task_notes": "Additional notes or comments related to the task",
        "task_subtasks": [
          {
            "subtask_id": "Unique identifier for the subtask",
            "subtask_name": "Name of the subtask",
            "subtask_description": "Detailed description of the subtask",
            "subtask_assign_to": "Person or team assigned to the subtask",
            "subtask_status": "Current status of the subtask (e.g., In Progress, To Do, Completed)",
            "subtask_due_date": "Due date for the subtask"
          }
        ]
      }
      
      
      Parse the transcript and extract the relevant information to populate the JSON fields. Ensure that each task and subtask has a unique identifier.
      
      If the transcript contains subtasks, include them as an array of subtasks within the task object. Each subtask should have its own unique identifier, name, description, assigned person or team, status, and due date.
      
      Review the generated JSON to ensure that it accurately reflects the information discussed in the transcript.`,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  console.log(response.text());
}

run();
