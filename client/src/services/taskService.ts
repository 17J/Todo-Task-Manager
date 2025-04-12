
import axios from "axios";
import { Task } from "@/types/task";

// Sample dummy data for development
const dummyTasks: Task[] = [
  {
    _id: "1",
    title: "Complete Project Proposal",
    description: "Finish the proposal for the new client project",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    completed: false,
    author: "Demo User"
  },
  {
    _id: "2",
    title: "Review Code Pull Request",
    description: "Review the team's latest PR for the authentication module",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    completed: false,
    author: "Demo User"
  },
  {
    _id: "3",
    title: "Weekly Team Meeting",
    description: "Join the weekly standup meeting with the development team",
    dueDate: new Date().toISOString(),
    completed: false,
    author: "Demo User"
  },
  {
    _id: "4",
    title: "Update Documentation",
    description: "Update the API documentation with the latest changes",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    completed: false,
    author: "Demo User"
  }
];

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper for authenticated requests
const authAxios = () => {
  const token = localStorage.getItem("userToken");
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    // For development, return dummy tasks
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(dummyTasks), 500);
      });
    }
    
    const response = await authAxios().get("/tasks");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unable to fetch tasks. Please try again.");
  }
};

export const addTask = async (taskData: Partial<Task>): Promise<Task> => {
  try {
    // For development, simulate adding a task
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        const newTask = {
          ...taskData,
          _id: String(Date.now()),
          completed: false,
          author: localStorage.getItem("userName") || "Demo User",
        } as Task;
        
        // Add to dummy tasks array for development
        dummyTasks.push(newTask);
        
        setTimeout(() => resolve(newTask), 500);
      });
    }
    
    const response = await authAxios().post("/tasks", taskData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unable to add task. Please try again.");
  }
};

export const updateTask = async (taskId: string, taskData: Partial<Task>): Promise<Task> => {
  try {
    // For development, simulate updating a task
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        const taskIndex = dummyTasks.findIndex(task => task._id === taskId);
        if (taskIndex === -1) {
          throw new Error("Task not found");
        }
        
        const updatedTask = {
          ...dummyTasks[taskIndex],
          ...taskData,
        } as Task;
        
        // Update the task in the dummy array
        dummyTasks[taskIndex] = updatedTask;
        
        setTimeout(() => resolve(updatedTask), 500);
      });
    }
    
    const response = await authAxios().put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unable to update task. Please try again.");
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    // For development, simulate deleting a task
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        const taskIndex = dummyTasks.findIndex(task => task._id === taskId);
        if (taskIndex !== -1) {
          dummyTasks.splice(taskIndex, 1);
        }
        setTimeout(() => resolve(), 500);
      });
    }
    
    await authAxios().delete(`/tasks/${taskId}`);
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unable to delete task. Please try again.");
  }
};
