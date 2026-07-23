import {
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

function LoginBrandPanel() {
  return (
    <section className="relative hidden h-screen overflow-hidden bg-[#0d172d] px-14 py-12 text-white lg:flex lg:flex-col lg:justify-between">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-emerald-400/10" />

      <div className="pointer-events-none absolute -bottom-48 -left-40 h-[500px] w-[500px] rounded-full border border-emerald-400/10" />

      <div className="pointer-events-none absolute right-24 top-40 h-2 w-2 rounded-full bg-emerald-400/60" />

      <div className="pointer-events-none absolute right-40 top-64 h-1.5 w-1.5 rounded-full bg-emerald-400/40" />

      {/* Content */}
      <div className="relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
            <FiActivity size={28} strokeWidth={2.5} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              PharmaCore
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Pharmacy Management System
            </p>
          </div>
        </div>

        {/* Hero */}
        <div className="mt-20 max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            SMART PHARMACY MANAGEMENT
          </div>

          <h2 className="text-6xl font-bold leading-[1.1] tracking-tight">
            Manage your
            <br />
            pharmacy
            <br />

            <span className="text-emerald-400">
              smarter.
            </span>
          </h2>

          <p className="mt-8 max-w-lg text-lg leading-8 text-slate-400">
            Manage your medicines, inventory, sales and pharmacy operations
            from one powerful platform.
          </p>

          {/* Features */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-emerald-400">
                <FiActivity size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Smart Management
                </p>

                <p className="text-xs text-slate-500">
                  Everything in one place
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-emerald-400">
                <FiShield size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Secure Platform
                </p>

                <p className="text-xs text-slate-500">
                  Your data is protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="relative z-10 border-t border-white/10 pt-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="flex items-start gap-3">
            <FiClock
              className="mt-1 text-emerald-400"
              size={20}
            />

            <div>
              <p className="text-2xl font-bold">
                24/7
              </p>

              <p className="mt-1 text-sm text-slate-500">
                System Access
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FiShield
              className="mt-1 text-emerald-400"
              size={20}
            />

            <div>
              <p className="text-2xl font-bold">
                100%
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Secure
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FiTrendingUp
              className="mt-1 text-emerald-400"
              size={20}
            />

            <div>
              <p className="text-2xl font-bold">
                Smart
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Management
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginBrandPanel;