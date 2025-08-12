import React, { FormEvent, useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success" | null>(
    null
  );

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value.trim();
    const password = target.password.value.trim();

    setLoading(true);
    setMessage(null);
    setMessageType(null);

    setTimeout(() => {
      if (email === "demo@example.com" && password === "password123") {
        setMessage("Login successful! Redirecting...");
        setMessageType("success");
        localStorage.setItem("token", "dummy-token-123");

        setTimeout(() => {
          window.location.href = "/chat";
        }, 1000);
      } else {
        setMessage(
          "Invalid email or password. Try demo@example.com / password123."
        );
        setMessageType("error");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Image: Hidden on mobile (small screens), visible from md and up */}
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
            <h1 className="text-3xl font-bold text-indigo-600">ChatConnect</h1>
            <p className="text-sm text-gray-500 mt-2">
              Connect instantly with friends, family, or colleagues.  
              Fast, secure, and simple — the way chatting should be.
            </p>
          </div>

          {/* Quick Features */}
          <ul className="mt-4 space-y-1 text-sm text-gray-600">
            <li>💬 Real-time messaging</li>
            <li>🔒 End-to-end encryption</li>
            <li>📱 Works on all devices</li>
          </ul>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={loading}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900"
                style={{ color: "black" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-medium transition ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
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

          <div className="mt-6 text-center text-sm text-dark">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Register
            </a>
          </div>

          {/* Security Note */}
          <p className="text-xs text-gray-400 text-center mt-4">
            Your privacy matters. We never store your password in plain text.
          </p>
        </div>
      </div>
    </div>
  );
}
