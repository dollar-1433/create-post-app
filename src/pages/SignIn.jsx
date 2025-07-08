import React, { useState } from "react";

const SignIn = ({ onSignIn }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }
    setError("");
    onSignIn(form);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl px-8 py-8 flex flex-col gap-4 border border-gray-200 dark:border-gray-700 w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-300 mb-2">Sign In</h2>
        <input name="email" type="email" placeholder="Email" className="input input-bordered rounded-lg px-4 py-2" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="input input-bordered rounded-lg px-4 py-2" value={form.password} onChange={handleChange} />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
