
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();

  const handleDemoLogin = () => {
    // Demo login functionality
    localStorage.setItem("userToken", "demo-token");
    localStorage.setItem("userName", "Demo User");
    toast({
      title: "Demo Login Successful",
      description: "Welcome to MyTask! You're logged in as a demo user.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-sky-50">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-24 max-w-7xl mx-auto w-full gap-8">
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-900">MyTask</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-700">
              Manage your tasks efficiently
            </h2>
          </div>
          
          <p className="text-lg text-slate-600 max-w-lg">
            Stay organized, meet deadlines, and bring your projects to completion
            with our intuitive task management solution.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2"
              onClick={() => setActiveTab("login")}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              className="border-indigo-600 text-indigo-600 hover:text-indigo-700 hover:border-indigo-700 px-6 py-2"
              onClick={handleDemoLogin}
            >
              Try Demo
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-center font-semibold text-indigo-900">
                Welcome to MyTask
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <Login />
                </TabsContent>
                <TabsContent value="register">
                  <Register />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <path d="M11 12H3"></path><path d="M16 6H3"></path><path d="M16 18H3"></path>
                    <path d="M18 9v6"></path><path d="M21 12h-6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                  Task Management
                </h3>
                <p className="text-slate-600">
                  Create, organize, and manage your tasks with ease. Set deadlines, priorities, and track progress.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                  Date Filtering
                </h3>
                <p className="text-slate-600">
                  Easily filter tasks by due date with our intuitive calendar system. Never miss a deadline again.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                  Secure Authentication
                </h3>
                <p className="text-slate-600">
                  Your data is protected with secure JWT authentication. Register an account and access your tasks anywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
