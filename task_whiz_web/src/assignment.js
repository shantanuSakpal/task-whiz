import { db } from "./firebase.config";
import { doc, collection, getDocs } from 'firebase/firestore'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const task_dataset = doc(db, "Tasks", "*");
const employee_dataset = doc(db, "employees", "*");

const MODEL_NAME = "gemini-pro";
const API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.7,
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

const assign_to = async () => {
  try {
    const tasksCollection = collection(db, "Tasks");
    const tasksSnapshot = await getDocs(tasksCollection);
    const tasksData = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const employeesCollection = collection(db, "employees");
    const employeesSnapshot = await getDocs(employeesCollection);
    const employeesData = employeesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const new_task = localStorage.getItem("selectedCard");
    const tasks_dataset = JSON.stringify(tasksData);
    const employees_dataset = JSON.stringify(employeesData);

    const parts = [
      {
        text: tasks_dataset,
      },
      {
        text: employees_dataset,
      },
      {
        text: new_task,
      },
      {
        text: `based on the new task data and the previous two datasets you have to determine to what employeee the task will be asssigned to give me a just the final answer to whom the task should be assigned in best to worst order in a list. consider the employee skills, points and tasks currently assigned to him and proirity of the task.`,
      },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    localStorage.removeItem("selectedCard");

    // console.log(result.response.candidates[0].content.parts[0].text);
    const nameString = result.response.candidates[0].content.parts[0].text;
    const nameArray = nameString.split('\n');
    const cleanedNames = nameArray.map(name => {
      return name.replace(/^\d\. /, '');
    });

    console.log(cleanedNames);
    return cleanedNames ? cleanedNames : [];

  } catch (err) { console.log(err) }
}
export default assign_to;
