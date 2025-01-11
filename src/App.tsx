import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, CheckCircle2, Clock, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: newTitle,
      description: newDescription,
      completed: false,
      createdAt: new Date(),
    };

    setTodos([newTodo, ...todos]);
    setNewTitle("");
    setNewDescription("");
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen full-screen flex flex-col justify-between bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Organize your tasks efficiently
          </p>
        </div>

        <div className="max-w-md w-full">
          <Card className="p-6 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Task title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Task description (optional)"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Task
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {todos.map((todo) => (
            <Card
              key={todo.id}
              className={cn(
                "p-6 transition-all hover:shadow-lg",
                todo.completed && "opacity-75"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <h3
                  className={cn(
                    "text-xl font-semibold",
                    todo.completed && "line-through text-gray-500"
                  )}
                >
                  {todo.title}
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleComplete(todo.id)}
                    className={cn(
                      "p-2 rounded-full transition-colors",
                      todo.completed
                        ? "bg-green-100 hover:bg-green-200 text-green-500"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-500"
                    )}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <p
                className={cn(
                  "text-gray-600 dark:text-gray-300 mb-4",
                  todo.completed && "line-through text-gray-400"
                )}
              >
                {todo.description}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(todo.createdAt).toLocaleDateString()}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
