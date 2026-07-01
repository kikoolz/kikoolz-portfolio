"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit, Save } from "lucide-react";

interface TimelineItem {
  id: string;
  date: string;
  role: string;
  location: string;
  description: string;
  type: "work" | "education" | "achievement";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TimelineForm() {
  const router = useRouter();
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state for new item
  const [newItem, setNewItem] = useState({
    date: "",
    role: "",
    location: "",
    description: "",
    type: "work" as "work" | "education" | "achievement"
  });

  const fetchTimelineItems = async () => {
    try {
      const response = await fetch('/api/timeline');
      if (response.ok) {
        const data = await response.json();
        setTimelineItems(Array.isArray(data) ? data : []);
      } else {
        setError("Failed to fetch timeline items");
      }
    } catch (err) {
      setError("Failed to fetch timeline items");
    }
  };

  useEffect(() => {
    fetchTimelineItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (editingId) {
        // Update existing item
        const response = await fetch(`/api/timeline/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem)
        });

        if (response.ok) {
          setSuccess(true);
          setEditingId(null);
          setNewItem({
            date: "",
            role: "",
            location: "",
            description: "",
            type: "work"
          });
          fetchTimelineItems();
          setTimeout(() => setSuccess(false), 3000);
        } else {
          setError("Failed to update timeline item");
        }
      } else {
        // Create new item
        const response = await fetch('/api/timeline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem)
        });

        if (response.ok) {
          setSuccess(true);
          setNewItem({
            date: "",
            role: "",
            location: "",
            description: "",
            type: "work"
          });
          fetchTimelineItems();
          setTimeout(() => setSuccess(false), 3000);
        } else {
          setError("Failed to create timeline item");
        }
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: TimelineItem) => {
    setEditingId(item.id);
    setNewItem({
      date: item.date,
      role: item.role,
      location: item.location,
      description: item.description,
      type: item.type
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this timeline item?")) return;
    
    try {
      const response = await fetch(`/api/timeline/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        fetchTimelineItems();
      } else {
        setError("Failed to delete timeline item");
      }
    } catch (err) {
      setError("Failed to delete timeline item");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setNewItem({
      date: "",
      role: "",
      location: "",
      description: "",
      type: "work"
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Timeline Management
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your career timeline that appears on the about page
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-600 dark:text-green-400">
            {editingId ? "Timeline item updated successfully!" : "Timeline item created successfully!"}
          </p>
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          {editingId ? "Edit Timeline Item" : "Add Timeline Item"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Date Period
              </label>
              <input
                type="text"
                value={newItem.date}
                onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
                placeholder="e.g., 2020 - Present"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Role/Title
              </label>
              <input
                type="text"
                value={newItem.role}
                onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
                className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
                placeholder="e.g., Full Stack Developer"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={newItem.location}
              onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
              className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
              placeholder="e.g., Company Name | City"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Type
            </label>
            <select
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value as "work" | "education" | "achievement" })}
              className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
            >
              <option value="work">Work Experience</option>
              <option value="education">Education</option>
              <option value="achievement">Achievement</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Description
            </label>
            <textarea
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
              rows={4}
              placeholder="Describe your role, responsibilities, and achievements..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 dark:bg-teal-500 text-white rounded-lg hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{editingId ? "Update" : "Add"} Item</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Timeline Items List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Current Timeline Items
        </h2>
        
        {timelineItems.length === 0 ? (
          <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
            No timeline items yet. Add your first item above!
          </div>
        ) : (
          timelineItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded">
                      {item.type}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {item.date}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    {item.role}
                  </h3>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                    📍 {item.location}
                  </p>
                  
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                    {item.description}
                  </p>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
