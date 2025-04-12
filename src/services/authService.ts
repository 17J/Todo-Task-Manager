
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
  try {
    // For development, simulate a successful login
    if (import.meta.env.DEV) {
      return {
        token: "sample-jwt-token",
        user: {
          id: "1",
          name: "Demo User",
          email: credentials.email,
        }
      };
    }
    
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unable to connect to the server. Please try again later.");
  }
};

export const registerUser = async (userData: RegisterData) => {
  try {
    // For development, simulate a successful registration
    if (import.meta.env.DEV) {
      return {
        message: "User registered successfully",
      };
    }
    
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Unable to connect to the server. Please try again later.");
  }
};

export const logoutUser = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userName");
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("userToken") !== null;
};
