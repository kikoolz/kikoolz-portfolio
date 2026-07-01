"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit, Send, Users, Mail } from "lucide-react";

interface NewsletterSubscriber {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NewsletterCampaign {
  id: string;
  title: string;
  subject: string;
  content: string;
  scheduledFor: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function NewsletterForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'subscribers' | 'campaigns' | 'content'>('subscribers');
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>([]);
  const [newsletterContents, setNewsletterContents] = useState<any[]>([]);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Campaign form state
  const [campaignForm, setCampaignForm] = useState({
    title: "",
    subject: "",
    content: "",
    scheduledFor: "",
    isActive: true
  });
  const [editingCampaign, setEditingCampaign] = useState<string | null>(null);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter/subscribers');
      if (response.ok) {
        const data = await response.json();
        setSubscribers(Array.isArray(data) ? data : []);
      } else {
        setError("Failed to fetch subscribers");
      }
    } catch (err) {
      setError("Failed to fetch subscribers");
    }
  };

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/newsletter/campaigns');
      if (response.ok) {
        const data = await response.json();
        setCampaigns(Array.isArray(data) ? data : []);
      } else {
        setError("Failed to fetch campaigns");
      }
    } catch (err) {
      setError("Failed to fetch campaigns");
    }
  };

  const fetchNewsletterContents = async () => {
    try {
      const response = await fetch('/api/newsletter/content');
      if (response.ok) {
        const data = await response.json();
        setNewsletterContents(Array.isArray(data) ? data : []);
      } else {
        setError("Failed to fetch newsletter contents");
      }
    } catch (err) {
      setError("Failed to fetch newsletter contents");
    }
  };

  useEffect(() => {
    if (activeTab === 'subscribers') {
      fetchSubscribers();
    } else if (activeTab === 'campaigns') {
      fetchCampaigns();
    } else {
      fetchNewsletterContents();
    }
  }, [activeTab]);

  const handleCampaignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (editingCampaign) {
        // Update existing campaign
        const response = await fetch(`/api/newsletter/campaigns/${editingCampaign}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...campaignForm,
            scheduledFor: campaignForm.scheduledFor || null
          })
        });

        if (response.ok) {
          setSuccess(true);
          setEditingCampaign(null);
          setCampaignForm({
            title: "",
            subject: "",
            content: "",
            scheduledFor: "",
            isActive: true
          });
          fetchCampaigns();
          setTimeout(() => setSuccess(false), 3000);
        } else {
          setError("Failed to update campaign");
        }
      } else {
        // Create new campaign
        const response = await fetch('/api/newsletter/campaigns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...campaignForm,
            scheduledFor: campaignForm.scheduledFor || null
          })
        });

        if (response.ok) {
          setSuccess(true);
          setCampaignForm({
            title: "",
            subject: "",
            content: "",
            scheduledFor: "",
            isActive: true
          });
          fetchCampaigns();
          setTimeout(() => setSuccess(false), 3000);
        } else {
          setError("Failed to create campaign");
        }
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCampaign = (campaign: NewsletterCampaign) => {
    setEditingCampaign(campaign.id);
    setCampaignForm({
      title: campaign.title,
      subject: campaign.subject,
      content: campaign.content,
      scheduledFor: campaign.scheduledFor ? new Date(campaign.scheduledFor).toISOString().slice(0, 16) : "",
      isActive: campaign.isActive
    });
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;
    
    try {
      const response = await fetch(`/api/newsletter/campaigns/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        fetchCampaigns();
      } else {
        setError("Failed to delete campaign");
      }
    } catch (err) {
      setError("Failed to delete campaign");
    }
  };

  const handleCancelEdit = () => {
    setEditingCampaign(null);
    setCampaignForm({
      title: "",
      subject: "",
      content: "",
      scheduledFor: "",
      isActive: true
    });
  };

  const handleEditContent = (content: any) => {
    setEditingContent(content);
    (document.getElementById('contentTitle') as HTMLInputElement).value = content.title;
    (document.getElementById('contentBody') as HTMLTextAreaElement).value = content.content;
  };

  const handleCancelEditContent = () => {
    setEditingContent(null);
    (document.getElementById('contentTitle') as HTMLInputElement).value = '';
    (document.getElementById('contentBody') as HTMLTextAreaElement).value = '';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Newsletter Management
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage newsletter subscribers and campaigns
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
            {editingCampaign ? "Campaign updated successfully!" : "Campaign created successfully!"}
          </p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6 border-b border-zinc-200 dark:border-zinc-700">
        <button
          onClick={() => setActiveTab('subscribers')}
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === 'subscribers' 
              ? 'border-b-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100' 
              : 'border-b-2 border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Subscribers ({subscribers.length})</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === 'campaigns' 
              ? 'border-b-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100' 
              : 'border-b-2 border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Campaigns ({campaigns.length})</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === 'content' 
              ? 'border-b-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100' 
              : 'border-b-2 border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          <div className="flex items-center space-x-2">
            <span>Content</span>
          </div>
        </button>
      </div>

      {(() => {
        if (activeTab === 'subscribers') {
          return (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Newsletter Subscribers
              </h2>
              
              {subscribers.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg">
                  <div className="text-zinc-500 dark:text-zinc-400 mb-4">No subscribers yet</div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    Subscribers will appear here when people sign up through your newsletter form
                  </p>
                </div>
              ) : (
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-zinc-50 dark:bg-zinc-900">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                            Subscribed
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                        {subscribers.map((subscriber) => (
                          <tr key={subscriber.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100">
                              {subscriber.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                subscriber.isActive 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              }`}>
                                {subscriber.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
                              {new Date(subscriber.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        }

        if (activeTab === 'campaigns') {
          return (
            <div className="space-y-6">
              {/* Campaign Form */}
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  {editingCampaign ? "Edit Campaign" : "Create New Campaign"}
                </h2>
                
                <form onSubmit={handleCampaignSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Campaign Title
                    </label>
                    <input
                      type="text"
                      value={campaignForm.title}
                      onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                      className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
                      placeholder="e.g., Monthly Techletter"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Email Subject
                    </label>
                    <input
                      type="text"
                      value={campaignForm.subject}
                      onChange={(e) => setCampaignForm({ ...campaignForm, subject: e.target.value })}
                      className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
                      placeholder="e.g., Latest Updates from Your Portfolio"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Campaign Content
                    </label>
                    <textarea
                      value={campaignForm.content}
                      onChange={(e) => setCampaignForm({ ...campaignForm, content: e.target.value })}
                      className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
                      rows={8}
                      placeholder="Write your newsletter content here..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Schedule For (Optional)
                      </label>
                      <input
                        type="datetime-local"
                        value={campaignForm.scheduledFor}
                        onChange={(e) => setCampaignForm({ ...campaignForm, scheduledFor: e.target.value })}
                        className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
                      />
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center space-x-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        <input
                          type="checkbox"
                          checked={campaignForm.isActive}
                          onChange={(e) => setCampaignForm({ ...campaignForm, isActive: e.target.checked })}
                          className="rounded border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-500 dark:focus:ring-zinc-400"
                        />
                        <span>Active</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    {editingCampaign && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
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
                          <span>{editingCampaign ? 'Updating...' : 'Creating...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{editingCampaign ? 'Update Campaign' : 'Create Campaign'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Campaigns List */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  Existing Campaigns
                </h2>
                
                {campaigns.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg">
                    <div className="text-zinc-500 dark:text-zinc-400 mb-4">No campaigns yet</div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Create your first newsletter campaign using the form above
                    </p>
                  </div>
                ) : (
                  campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                            {campaign.title}
                          </h3>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                            Subject: {campaign.subject}
                          </p>
                          {campaign.scheduledFor && (
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                              Scheduled: {new Date(campaign.scheduledFor).toLocaleString()}
                            </p>
                          )}
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Status: {campaign.isActive ? 'Active' : 'Inactive'}
                          </p>
                        </div>
                        
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleEditCampaign(campaign)}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCampaign(campaign.id)}
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

        if (activeTab === 'content') {
          return (
        <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  Newsletter Content Management
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  Manage the content that appears on your newsletter subscription form. This content will replace the default subscription text.
                </p>
                
                <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Newsletter Title
                </label>
                <input
                  type="text"
                  id="contentTitle"
                  className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
                  placeholder="e.g., Subscribe to Our Newsletter"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Newsletter Content (HTML supported)
                </label>
                <textarea
                  id="contentBody"
                  rows={8}
                  className="w-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 p-3 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-colors"
                  defaultValue={`Let me see`}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                {editingContent && (
                  <button
                    type="button"
                    onClick={handleCancelEditContent}
                    className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={async () => {
                    const title = (document.getElementById('contentTitle') as HTMLInputElement)?.value;
                    const content = (document.getElementById('contentBody') as HTMLTextAreaElement)?.value;
                    
                    if (!title || !content) {
                      setError("Title and content are required");
                      return;
                    }
                    
                    setLoading(true);
                    setError(null);
                    setSuccess(false);
                    
                    try {
                      let response;
                      if (editingContent) {
                        // Update existing content
                        response = await fetch(`/api/newsletter/content/${editingContent.id}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ title, content, isActive: true })
                        });
                      } else {
                        // Create new content
                        response = await fetch('/api/newsletter/content', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ title, content, isActive: true })
                        });
                      }
                      
                      if (response.ok) {
                        setSuccess(true);
                        fetchNewsletterContents();
                        setTimeout(() => setSuccess(false), 3000);
                        // Clear form
                        (document.getElementById('contentTitle') as HTMLInputElement).value = '';
                        (document.getElementById('contentBody') as HTMLTextAreaElement).value = '';
                        setEditingContent(null);
                      } else {
                        setError(`Failed to ${editingContent ? 'update' : 'create'} newsletter content`);
                      }
                    } catch (err) {
                      setError("An error occurred");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  className="flex items-center space-x-2 px-4 py-2 bg-teal-600 dark:bg-teal-500 text-white rounded-lg hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>{editingContent ? 'Updating...' : 'Creating...'}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>{editingContent ? 'Update Content' : 'Create Content'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Existing Newsletter Content
            </h2>
            
            {newsletterContents.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg">
                <div className="text-zinc-500 dark:text-zinc-400 mb-4">No newsletter content yet</div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  Create your first newsletter content using the form above
                </p>
              </div>
            ) : (
              newsletterContents.map((content) => (
                <div
                  key={content.id}
                  className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                        {content.title}
                      </h3>
                      <div className="prose prose-zinc dark:prose-invert max-w-none mb-4">
                        <div dangerouslySetInnerHTML={{ __html: content.content }} />
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Status: {content.isActive ? 'Active' : 'Inactive'}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        Created: {new Date(content.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditContent(content)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm("Are you sure you want to delete this content?")) {
                            try {
                              const response = await fetch(`/api/newsletter/content/${content.id}`, {
                                method: "DELETE",
                              });
                              
                              if (response.ok) {
                                fetchNewsletterContents();
                              } else {
                                setError("Failed to delete content");
                              }
                            } catch (err) {
                              setError("Failed to delete content");
                            }
                          }
                        }}
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

        // Default fallback
        return null;
      })()}
    </div>
  );
}
