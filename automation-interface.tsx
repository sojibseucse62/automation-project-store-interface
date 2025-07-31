"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Zap, Clock, CheckCircle, ExternalLink, Bot, Cpu, Workflow } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Project {
  id: string
  title: string
  description: string
  link: string
  status: "active" | "pending" | "completed"
  createdAt: string
  author: string
}

export default function Component() {
  const [mainTitle, setMainTitle] = useState("Automating Creativity, Streamlining Workflows, and Enhancing Efficiency")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [tempTitle, setTempTitle] = useState(mainTitle)

  const [password, setPassword] = useState("")
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false)
  const correctPassword = "ContentOps@10MS"

  const [projects, setProjects] = useState<Project[]>([])

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("automation-projects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      // Set default projects if no saved projects exist
      const defaultProjects = [
        {
          id: "1",
          title: "OCR Master: Streamlining Text Extraction",
          description:
            "Effortlessly extract text from PDFs with my 'PDF to OCR Automation' tool. Simply upload a document, select a section, and get accurate text extractions instantly. Perfect for transforming scanned pages into editable content with ease and precision.",
          link: "https://preview-ocr-master-streamlining-text-extra-kzmiigvfsfyasrg8pzk7.vusercontent.net/",
          status: "active" as const,
          createdAt: "2025-07-22",
          author: "Sojib Mia",
        },
        {
          id: "2",
          title: "PDP Gap Finder: Optimizing Product Pages for Success",
          description:
            "Analyze and optimize your product detail pages (PDP) with my 'PDP Gap Finder' tool. It compares your website’s PDP with competitors, providing insights and suggesting the best improvements. Elevate your product presentation and boost conversion rates with data-driven recommendations.",
          link: "https://pdp-gap-finder-backend.onrender.com/",
          status: "active" as const,
          createdAt: "2025-07-22",
          author: "Fahad Bin Abdullah",
        },
        {
          id: "3",
          title: "PDF to Quiz Generator: Seamless Quiz Creation",
          description:
            "Effortlessly convert PDFs into quizzes with the 'PDF to Quiz Generator.' Simply upload your document, specify the number of quizzes, and get automated, CMS 360-formatted quizzes in seconds.",
          link: "https://pdf-quiz-app.onrender.com/",
          status: "active" as const,
          createdAt: "2025-07-22",
          author: "Fahad Bin Abdullah",
        },
        {
          id: "4",
          title: "Teachers Confirmation: Streamlining Scheduling and Notifications",
          description:
            "Automatically send calendar invitations to assigned teachers with 'Teacher Confirmation.' If no response is received within the buffer time, the system notifies the manager with a prompt email, ensuring smooth scheduling.",
          link: "https://docs.google.com/spreadsheets/d/1cy-Z8ALXDW60PfXICFYKaDooP6sPpAwcbgKbE9ZqhVs/edit?gid=0#gid=0",
          status: "active" as const,
          createdAt: "2025-07-22",
          author: "Fahad Bin Abdullah",
        },
      ]
      setProjects(defaultProjects)
      localStorage.setItem("automation-projects", JSON.stringify(defaultProjects))
    }
  }, [])

  // Save projects to localStorage whenever projects state changes
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("automation-projects", JSON.stringify(projects))
    }
  }, [projects])

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    link: "",
    author: "",
  })
  const [isAddingProject, setIsAddingProject] = useState(false)

  const handleTitleSave = () => {
    setMainTitle(tempTitle)
    setIsEditingTitle(false)
  }

  const handleTitleCancel = () => {
    setTempTitle(mainTitle)
    setIsEditingTitle(false)
  }

  const handleAddProject = () => {
    if (password !== correctPassword) {
      alert("Incorrect password. Please enter the correct password to add a project.")
      return
    }

    if (newProject.title.trim() && newProject.description.trim() && newProject.author.trim()) {
      const project: Project = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        link: newProject.link,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
        author: newProject.author,
      }
      const updatedProjects = [...projects, project]
      setProjects(updatedProjects)
      localStorage.setItem("automation-projects", JSON.stringify(updatedProjects))

      setNewProject({ title: "", description: "", link: "", author: "" })
      setPassword("")
      setIsPasswordCorrect(false)
      setIsAddingProject(false)
    }
  }

  const handleProjectClick = (link: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Zap className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      case "pending":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      case "completed":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10">
        {/* Header with Logos */}
        <header className="w-full p-4 md:p-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            {/* Brand Logo - Left */}
            <div className="flex items-center gap-3 group">
              <div className="relative p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30 backdrop-blur-sm hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                <img
                  src="https://i.ibb.co/dwW1B8QX/10ms.png"
                  alt="10 Minute School Logo"
                  className="h-12 w-12 object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  10 Minute School
                </h2>
                <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Never Stop Learning
                </p>
              </div>
            </div>

            {/* Company Logo - Right */}
            <div className="flex items-center gap-3 group">
              <div className="hidden sm:block text-right">
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Content Operations
                </h2>
                <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Innovation, Excellence & Deliver
                </p>
              </div>
              <div className="relative p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                <img
                  src="https://i.ibb.co/FbpNNgh5/Asset-1.png"
                  alt="Content Operations 10 Minute School"
                  className="h-12 w-12 object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Gradient Divider */}
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        </header>

        <div className="p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Main Title Section */}
            <div className="text-center space-y-6 animate-fade-in">
              <div className="flex justify-center items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 animate-spin-slow">
                  <Bot className="h-8 w-8 text-blue-400" />
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 animate-bounce-slow">
                  <Workflow className="h-8 w-8 text-purple-400" />
                </div>
                <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 animate-pulse">
                  <Cpu className="h-8 w-8 text-cyan-400" />
                </div>
              </div>

              {isEditingTitle ? (
                <div className="space-y-4 animate-slide-down">
                  <Input
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    className="text-center text-2xl md:text-4xl font-bold max-w-4xl mx-auto bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  <div className="flex justify-center gap-2">
                    <Button
                      onClick={handleTitleSave}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={handleTitleCancel}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight animate-gradient">
                    {mainTitle}
                  </h1>
                  <Button
                    onClick={() => setIsEditingTitle(true)}
                    variant="ghost"
                    size="sm"
                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <p className="text-lg text-slate-300 max-w-2xl mx-auto animate-fade-in-delay">
                Manage and track your automation projects in one centralized dashboard
              </p>
            </div>

            {/* Add Project Section */}
            <div className="flex justify-between items-center animate-slide-up">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                <Zap className="h-6 w-6 text-blue-400" />
                Your Automation Projects
              </h2>
              <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                    <Plus className="h-4 w-4" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white">Add New Automation Project</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Create a new automation project with a title, description, and link.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2 mb-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                    <Label htmlFor="password" className="text-slate-300 font-medium">
                      Access Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password to add project..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                    <p className="text-xs text-slate-400">Password required to add new automation projects</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-title" className="text-slate-300">
                        Project Title
                      </Label>
                      <Input
                        id="project-title"
                        placeholder="Enter project title..."
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-description" className="text-slate-300">
                        Description
                      </Label>
                      <Textarea
                        id="project-description"
                        placeholder="Describe your automation project..."
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="min-h-[100px] bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-link" className="text-slate-300">
                        Project Link
                      </Label>
                      <Input
                        id="project-link"
                        placeholder="https://example.com/your-project"
                        value={newProject.link}
                        onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-author" className="text-slate-300">
                        Author Name
                      </Label>
                      <Input
                        id="project-author"
                        placeholder="Enter author name..."
                        value={newProject.author}
                        onChange={(e) => setNewProject({ ...newProject, author: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddingProject(false)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddProject}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Add Project
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  className="group bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer animate-fade-in-stagger backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleProjectClick(project.link)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${getStatusColor(project.status)} border transition-all duration-300 group-hover:scale-110`}
                        >
                          {getStatusIcon(project.status)}
                          <span className="ml-1 capitalize">{project.status}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.link && (
                          <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg text-white group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-4 text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                      {project.description}
                    </CardDescription>
                    <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-slate-700">
                      <div className="text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                        Created: {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 font-medium">
                        By: {project.author}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
