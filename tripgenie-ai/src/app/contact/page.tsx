'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 w-full flex-1 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about a generated itinerary or want to report a bug? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 w-full max-w-5xl">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1 space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Email Us</h3>
                <p className="text-gray-600">support@planora.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Office</h3>
                <p className="text-gray-600">123 AI Boulevard, Tech Park, San Francisco, CA</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-xl text-green-600">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Call Us</h3>
                <p className="text-gray-600">+1 (800) 123-4567</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2 bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2">
                <Send size={18} /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}