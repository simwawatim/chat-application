import React, { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success" | null>(null);

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const name = target.name.value.trim();
    const email = target.email.value.trim();
    const password = target.password.value.trim();

    setLoading(true);
    setMessage(null);
    setMessageType(null);

    setTimeout(() => {
      if (name && email && password.length >= 6) {
        setMessage("Account created successfully! Redirecting to login...");
        setMessageType("success");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        setMessage("Please fill all fields and ensure password is at least 6 characters.");
        setMessageType("error");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Image: hidden on mobile */}
      <div className="hidden md:flex bg-indigo-600 items-center justify-center p-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/134/134914.png"
          alt="Chat App"
          className="w-3/4 max-w-md"
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-indigo-600">Join ChatConnect</h1>
            <p className="text-sm text-gray-500 mt-2">
              Create your account and start chatting instantly with friends and family.
            </p>
          </div>

          {/* Quick Benefits */}
          <ul className="mt-4 space-y-1 text-sm text-gray-600">
            <li>⚡ Instant sign-up process</li>
            <li>💬 Unlimited chats</li>
            <li>🌍 Connect with anyone, anywhere</li>
          </ul>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={loading}
                placeholder="Enter your full name"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900"
                style={{ color: "black" }}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={loading}
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900"
                style={{ color: "black" }}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={loading}
                minLength={6}
                placeholder="Enter a password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900"
                style={{ color: "black" }}
              />
            </div>
            <button
              type="submit"
              onClick={() => (window.location.href = "/home")}
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-medium transition ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-3 rounded text-center ${
                messageType === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          {/* Already have account */}
          <div className="mt-6 text-center text-sm text-dark">
            Already have an account?{" "}
            <a href="/" className="text-indigo-600 hover:underline">
              Login
            </a>
          </div>

          {/* Security Note */}
          <p className="text-xs text-gray-400 text-center mt-4">
            We respect your privacy and never share your data with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}
