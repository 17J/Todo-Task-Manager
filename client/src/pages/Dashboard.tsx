
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "@/components/tasks/TaskList";
import TaskForm from "@/components/tasks/TaskForm";
import { isAuthenticated, logoutUser } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { getTasks } from "@/services/taskService";
import { Task } from "@/types/task";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const userName = localStorage.getItem("userName") || "User";

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
      return;
    }

    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
        setFilteredTasks(tasksData);
      } catch (error: any) {
        toast({
          title: "Failed to load tasks",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [navigate, toast]);

  useEffect(() => {
    if (selectedDate) {
      const filtered = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return (
          taskDate.getDate() === selectedDate.getDate() &&
          taskDate.getMonth() === selectedDate.getMonth() &&
          taskDate.getFullYear() === selectedDate.getFullYear()
        );
      });
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [selectedDate, tasks]);

  const handleLogout = () => {
    logoutUser();
    toast({
      title: "Logged Out Successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const clearDateFilter = () => {
    setSelectedDate(undefined);
    setFilteredTasks(tasks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-900">MyTask</h1>
          <div className="flex items-center gap-4">
            <span className="text-slate-700">Welcome, {userName}</span>
            <Button onClick={handleLogout} variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Filter by Date</CardTitle>
              <CardDescription>Select a date to filter tasks</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="mb-4"
              />
              <Button 
                variant="outline" 
                onClick={clearDateFilter}
                className="w-full"
              >
                Clear Filter
              </Button>
            </CardContent>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Tasks</CardTitle>
                <CardDescription>
                  {selectedDate
                    ? `Tasks due on ${selectedDate.toLocaleDateString()}`
                    : "All your tasks"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tasks" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="tasks">Task List</TabsTrigger>
                    <TabsTrigger value="add">Add New Task</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tasks">
                    <TaskList 
                      tasks={filteredTasks} 
                      isLoading={isLoading}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                    />
                  </TabsContent>
                  <TabsContent value="add">
                    <TaskForm onAddTask={handleAddTask} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
