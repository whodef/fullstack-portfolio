'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faEnvelope, 
  faCheck, 
  faPaperPlane, 
  faSpinner,
  faUser,
  faTag,
  faComment,
  faHeart,
  faStar,
  faArrowRight,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    theme: '',
    message: ''
  });
  const [formData, setFormData] = useState({
    email: '',
    theme: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
  
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: ''
      });
    }
  };

  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!isValidEmail(value)) {
          error = 'Please enter a valid email address';
        } else if (value.length > 254) {
          error = 'Email is too long';
        }
        break;
      
      case 'theme':
        if (!value) {
          error = 'Subject is required';
        } else if (value.length < 3) {
          error = 'Subject must be at least 3 characters';
        } else if (value.length > 200) {
          error = 'Subject is too long (max 200 characters)';
        }
        break;
      
      case 'message':
        if (!value) {
          error = 'Message is required';
        } else if (value.length < 10) {
          error = 'Message must be at least 10 characters';
        } else if (value.length > 5000) {
          error = 'Message is too long (max 5000 characters)';
        }
        break;
    }

    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const errors = {
      email: validateField('email', formData.email),
      theme: validateField('theme', formData.theme),
      message: validateField('message', formData.message)
    };

    setFieldErrors(errors);
    return !errors.email && !errors.theme && !errors.message;
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSent(true);
        setFormData({ email: '', theme: '', message: '' });
        setFieldErrors({ email: '', theme: '', message: '' });
      } else {
        setError(data.error || 'An error occurred while sending');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while sending. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  
  if (sent) {
    return (
      <div className="card p-8 md:p-12 max-w-2xl w-full transform transition-all duration-500 animate-in fade-in-0 zoom-in-95">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Message Sent!
              </span>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Thank you! I will contact you soon. 🚀
            </p>
          </div>
          <button
            onClick={() => setSent(false)}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span>Send Another Message</span>
            <FontAwesomeIcon 
              icon={faArrowRight} 
              className="transform group-hover:translate-x-1 transition-transform duration-300" 
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-8 md:p-10 max-w-2xl w-full space-y-6 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-2xl border border-gray-200/20 dark:border-gray-700/30">
      {error && (
        <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-700/50 rounded-xl text-red-700 dark:text-red-400 flex items-center gap-3">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500" />
          {error}
        </div>
      )}
      
      {/* Email Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex py-[22px] pointer-events-none">
          <FontAwesomeIcon 
            icon={faEnvelope} 
            className={`transition-colors duration-200 ${
              fieldErrors.email 
                ? 'text-red-500' 
                : 'text-gray-400 dark:text-gray-500 group-focus-within:text-brand-500'
            }`}
          />
        </div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 dark:bg-white/10 border transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 ${
            fieldErrors.email
              ? 'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-200/70 dark:border-white/10 hover:border-brand-300 focus:border-brand-500 hover:bg-white dark:hover:bg-white/15 focus:ring-brand-500/20'
          }`}
          placeholder="Your email address"
          type="email"
          required
        />
        {fieldErrors.email && (
          <div className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <FontAwesomeIcon icon={faExclamationTriangle} className="w-3 h-3" />
            {fieldErrors.email}
          </div>
        )}
      </div>
      
      {/* Theme Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex py-[22px] pointer-events-none">
          <FontAwesomeIcon 
            icon={faTag} 
            className={`transition-colors duration-200 ${
              fieldErrors.theme 
                ? 'text-red-500' 
                : 'text-gray-400 dark:text-gray-500 group-focus-within:text-brand-500'
            }`}
          />
        </div>
        <input
          name="theme"
          value={formData.theme}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 dark:bg-white/10 border transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 ${
            fieldErrors.theme
              ? 'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-200/70 dark:border-white/10 hover:border-brand-300 focus:border-brand-500 hover:bg-white dark:hover:bg-white/15 focus:ring-brand-500/20'
          }`}
          placeholder="Subject / Theme"
          required
        />
        {fieldErrors.theme && (
          <div className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <FontAwesomeIcon icon={faExclamationTriangle} className="w-3 h-3" />
            {fieldErrors.theme}
          </div>
        )}
      </div>
      
      {/* Message Textarea */}
      <div className="relative group">
        <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
          <FontAwesomeIcon 
            icon={faComment} 
            className={`mt-1 transition-colors duration-200 ${
              fieldErrors.message 
                ? 'text-red-500' 
                : 'text-gray-400 dark:text-gray-500 group-focus-within:text-brand-500'
            }`}
          />
        </div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 dark:bg-white/10 border transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 min-h-[150px] resize-vertical shadow-sm hover:shadow-md focus:outline-none focus:ring-2 ${
            fieldErrors.message
              ? 'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-200/70 dark:border-white/10 hover:border-brand-300 focus:border-brand-500 hover:bg-white dark:hover:bg-white/15 focus:ring-brand-500/20'
          }`}
          placeholder="Your message ✨"
          required
        />
        {fieldErrors.message && (
          <div className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <FontAwesomeIcon icon={faExclamationTriangle} className="w-3 h-3" />
            {fieldErrors.message}
          </div>
        )}
        
        {/* Character counter */}
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
          {formData.message.length}/5000 characters
        </div>
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="group w-full relative px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-[1.02] disabled:scale-100 transition-all duration-200 disabled:cursor-not-allowed overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 group-disabled:hidden"></div>
        
        {loading ? (
          <span className="flex items-center justify-center gap-3 relative z-10">
            <div className="w-4 h-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-base" />
            </div>
            <span>Sending your message...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-3 relative z-10">
            <span>Send Message</span>
            <div className="w-4 h-4 flex items-center justify-center">
              <FontAwesomeIcon 
                icon={faPaperPlane} 
                className="transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300 text-base" 
              />
            </div>
          </span>
        )}
      </button>
    </form>
  );
}
