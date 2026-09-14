import { useState } from "react";
import { useNavigate } from "react-router";

export function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"provider" | "admin">("provider");
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("password");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (role === "provider") {
      navigate("/provider/credentialing");
    } else {
      navigate("/admin/overview");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2196F3] rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M12 8L8 10.5V15.5L12 18L16 15.5V10.5L12 8Z"
                fill="#2196F3"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">MantraComply</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Role Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Login as
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("provider")}
              className={`px-4 py-3 rounded-lg border-2 transition-all ${
                role === "provider"
                  ? "border-[#2196F3] bg-[#E3F2FD] text-[#2196F3]"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <div className="font-medium">Provider</div>
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`px-4 py-3 rounded-lg border-2 transition-all ${
                role === "admin"
                  ? "border-[#2196F3] bg-[#E3F2FD] text-[#2196F3]"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <div className="font-medium">Admin</div>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2196F3] focus:border-[#2196F3] outline-none transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2196F3] text-white py-3 rounded-lg font-medium hover:bg-[#1976D2] transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-[#2196F3] hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}