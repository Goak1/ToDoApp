import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, Flag,  Search, Check, Clock, AlertCircle } from 'lucide-react';

const TaskManagerApp = () => {
  // Main state management - probably should move to useReducer if this gets bigger
  const [tasks, setTasks] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Filter and search state - could extract to custom hook
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  // Load some dummy data on mount - in real app this would be API call
  useEffect(() => {
    const sampleTasks = [
      {
        id: 1,
        title: 'Complete project proposal',
        description: 'Finish the Q4 project proposal for the marketing team',
        dueDate: '2025-07-25',
        priority: 'high',
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Review code',
        description: 'Review pull requests for the mobile app',
        dueDate: '2025-07-23',
        priority: 'medium',
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Team meeting',
        description: 'Weekly standup with development team',
        dueDate: '2025-07-22',
        priority: 'low',
        status: 'completed',
        createdAt: new Date().toISOString()
      }
    ];
    setTasks(sampleTasks);
  }, []);

  // CRUD operations - these would hit APIs in production
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(), // TODO: use proper UUID in production
      ...taskData,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
    setIsAddingTask(false);
  };

  const updateTask = (id, updatedData) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updatedData } : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    // TODO: add confirmation dialog
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Quick toggle for marking complete/incomplete
  const toggleTaskStatus = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  // This is doing a lot - might want to memoize with useMemo for performance
  const filteredAndSortedTasks = tasks
    .filter(task => {
      // Search across title and description
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      return matchesSearch && matchesPriority && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          // High = 3, Medium = 2, Low = 1 for sorting
          const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  // Helper functions for styling - could move to utils file
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'medium': return <Flag className="w-4 h-4" />;
      case 'low': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  // Check if task is overdue
  const isOverdue = (dueDate, status) => {
    return status === 'pending' && new Date(dueDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Top header with title and add button */}
      <div className="bg-white shadow-lg border-b-2 border-indigo-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-gray-600 mt-1">Organize your work and get things done</p>
            </div>
            <button
              onClick={() => setIsAddingTask(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and filter controls */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search input with icon */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            {/* Filter dropdowns */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="title">Sort by Title</option>
              <option value="created">Sort by Created</option>
            </select>
          </div>
        </div>

        {/* Dashboard stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Flag className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-600">
                  {tasks.filter(t => t.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-orange-600">
                  {tasks.filter(t => t.status === 'pending').length}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main task list */}
        <div className="space-y-4">
          {filteredAndSortedTasks.length === 0 ? (
            // Empty state when no tasks match filters
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks found</h3>
              <p className="text-gray-500">Try adjusting your search or filters, or create a new task.</p>
            </div>
          ) : (
            // Render each task card
            filteredAndSortedTasks.map(task => (
              <div key={task.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Checkbox for completion toggle */}
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          task.status === 'completed'
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-indigo-500'
                        }`}
                      >
                        {task.status === 'completed' && <Check className="w-4 h-4" />}
                      </button>
          }


export default TaskManagerApp;