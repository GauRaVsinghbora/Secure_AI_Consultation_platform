import { useState } from "react";
import { contactUs } from "../api/authApi";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await contactUs(form);
      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setSuccess("Failed to send message.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  return (
    <div className=" bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">
            Get in touch
          </h1>
          <p className="text-gray-400 text-sm font-light tracking-wide">
            We'd love to hear from you
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              required
              className="w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b border-gray-200 focus:outline-none focus:border-gray-900 transition-colors duration-200 text-sm"
              placeholder=""
            />
            <label className={`absolute left-0 -top-2 text-xs transition-all duration-200 ${
              focused === 'name' || form.name ? 'text-gray-900' : 'text-gray-400'
            }`}>
              Name
            </label>
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              required
              className="w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b border-gray-200 focus:outline-none focus:border-gray-900 transition-colors duration-200 text-sm"
              placeholder=""
            />
            <label className={`absolute left-0 -top-2 text-xs transition-all duration-200 ${
              focused === 'email' || form.email ? 'text-gray-900' : 'text-gray-400'
            }`}>
              Email
            </label>
          </div>

          {/* Message Field */}
          <div className="relative">
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
              required
              className="w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b border-gray-200 focus:outline-none focus:border-gray-900 transition-colors duration-200 text-sm resize-none"
              placeholder=""
            />
            <label className={`absolute left-0 -top-2 text-xs transition-all duration-200 ${
              focused === 'message' || form.message ? 'text-gray-900' : 'text-gray-400'
            }`}>
              Message
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-gray-900 text-white rounded-[16px] text-xs tracking-widest uppercase font-light hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            {loading ? "Sending..." : "Send message"}
          </button>

          {/* Success/Error Message */}
          {success && (
            <p className={`text-center text-xs tracking-wide ${
              success.includes("success") ? "text-gray-900" : "text-red-400"
            }`}>
              {success}
            </p>
          )}
        </form>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-300 text-xs tracking-wide">
            or reach us at{' '}
            <a href="mailto:hello@company.com" className="text-gray-900 border-b border-gray-200 hover:border-gray-900 transition-colors duration-200">
              medchat.Ai@gamil.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}