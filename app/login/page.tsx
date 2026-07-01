"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Small delay to ensure cookie is set
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 100);
      } else {
        const error = await response.json();
        console.error("Login error:", error);
        alert(error.error || "Login failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-8 border rounded-xl w-96 space-y-4 shadow-lg">
        <h1 className="text-xl font-bold text-center">Admin Login</h1>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black cursor-pointer text-white p-3 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}
