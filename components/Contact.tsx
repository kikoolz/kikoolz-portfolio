"use client";

import { useState } from "react";
import { Card } from "./articles/ArticleCard";
import { Mail, Send, User, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          data: data
        });
        throw new Error(data.error || `Failed to send message (${response.status})`);
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Error sending message:', error);
      alert(`Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-6">
          <Send className="w-8 h-8 text-zinc-900 dark:text-zinc-100" />
        </div>
        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          Message Sent!
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Thanks for reaching out. I'll get back to you soon!
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="inline-flex items-center px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-zinc-900/20 dark:hover:shadow-zinc-100/20"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto">
       
        {/* Left Column - Contact Info */}
        <div className="w-full lg:w-1/2">
           <div className="flex gap-4 mb-8">

            <div>
              <h3 className="text-3xl font-semibold leading-relaxed font-proxima-nova text-zinc-900 dark:text-zinc-100">
                Get In Touch With Me.
              </h3>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                I'd Love To 
                Hear From You
              </p>
              
            </div>
          </div>

          <div>
            <h4 className="text-2xl  text-zinc-900 dark:text-zinc-100 mb-8">
              Let's Connect
            </h4>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                  <Mail className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Email</span>
                  <p className="text-base text-zinc-600 dark:text-zinc-400">kenlubs45@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Form */}
        <Card className="w-full lg:w-1/2 p-4">
           <form onSubmit={handleSubmit} className="space-y-6">
             
             {/* Name Field */}
             <div>
               <label htmlFor="name" className="block text-sm  text-zinc-700 dark:text-zinc-300 mb-2">
                 Name
               </label>
               <input
                 type="text"
                 id="name"
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
                 required
                 className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:border-transparent transition-all duration-200"
                 placeholder="Your name"
               />
             </div>

             {/* Email Field */}
             <div>
               <label htmlFor="email" className="block text-sm  text-zinc-700 dark:text-zinc-300 mb-2">
                 Email
               </label>
               <input
                 type="email"
                 id="email"
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
                 required
                 className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:border-transparent transition-all duration-200"
                 placeholder="your@email.com"
               />
             </div>

             {/* Message Field */}
             <div>
               <label htmlFor="message" className="block text-sm  text-zinc-700 dark:text-zinc-300 mb-2">
                 Message
               </label>
               <textarea
                 id="message"
                 name="message"
                 value={formData.message}
                 onChange={handleChange}
                 required
                 rows={5}
                 className="block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:border-transparent transition-all duration-200 resize-none"
                 placeholder="Your message..."
               />
             </div>

             {/* Submit Button */}
             <button
               type="submit"
               disabled={isSubmitting}
               className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium transition-all duration-200 hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
             >
               {isSubmitting ? (
                 <>
                   <div className="animate-spin rounded-full h-4 w-4 border-2 border-white dark:border-zinc-900 border-t-transparent"></div>
                   <span>Sending...</span>
                 </>
               ) : (
                 <>
                   <Send className="w-4 h-4" />
                   <span>Send Message</span>
                 </>
               )}
             </button>
           </form>
        </Card>
    </div>
  );
}