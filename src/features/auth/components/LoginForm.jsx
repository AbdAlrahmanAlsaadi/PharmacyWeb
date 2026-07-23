import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
} from "react-icons/fi";

import useLogin from "../hooks/useLogin";

function LoginForm() {
  const navigate = useNavigate();

  const { login, loading, error } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationError, setValidationError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setValidationError("");

    if (!formData.email || !formData.password) {
      setValidationError("Please fill in all fields.");
      return;
    }

    try {
      const response = await login(formData);

      if (response.role === "warehouse_owner") {
        navigate("/dashboard");
      }

      if (response.role === "pharmacist") {
        navigate("/pharmacist/dashboard");
      }
    } catch {
      // Error handled by hook
    }
  };

  return (
    <section className="flex h-screen items-center justify-center bg-[#f8fafc] px-6 py-12 lg:px-16">
      <div className="w-full max-w-[530px]">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 lg:hidden">
            <FiShield size={24} />
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-emerald-600">
            Welcome back
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-[#0d172d]">
            Sign in to your account
          </h2>

          <p className="mt-4 text-base text-slate-500">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2.5 block text-sm font-semibold text-[#0d172d]"
            >
              Email Address
            </label>

            <div className="group relative">
              <FiMail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-emerald-500"
              />

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@gmail.com"
                className="h-16 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-5 text-base text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#0d172d]"
              >
                Password
              </label>

              <button
                type="button"
                className="text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
              >
                Forgot password?
              </button>
            </div>

            <div className="group relative">
              <FiLock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-emerald-500"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="h-16 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-14 text-base text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
              >
                {showPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Remember */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />

            <span className="text-sm text-slate-500">
              Remember me
            </span>
          </label>

          {/* Error */}
          {(validationError || error) && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {validationError || error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/25 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                Sign in to Dashboard

                <FiArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </form>

        {/* Security */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-slate-400">
          <FiShield
            size={16}
            className="text-emerald-500"
          />

          <span>
            Secure access to your pharmacy management system
          </span>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;