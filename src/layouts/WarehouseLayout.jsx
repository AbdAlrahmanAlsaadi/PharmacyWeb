import {
  FiBox,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiShoppingCart,
  FiX,
  FiFileText,
} from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

import useLogout from "@/features/auth/hooks/useLogout";

function WarehouseLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
const [notification, setNotification] = useState(null);
  const logout = useLogout();
useEffect(() => {
  window.Pusher = Pusher;

  // تفعيل الصوت بعد أول ضغطة من المستخدم
  const enableAudio = () => {
    const audio = new Audio("/sounds/notification.mp3");

    audio.volume = 0;

    audio.play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;

        console.log("🔊 Audio enabled");
      })
      .catch(() => {
        console.log("Audio permission not granted");
      });
  };

  window.addEventListener(
    "click",
    enableAudio,
    { once: true }
  );


  const echo = new Echo({
    broadcaster: "pusher",
    key: "26134ca0c9a7ac8f305c",
    cluster: "ap2",
    forceTLS: true,
  });


  echo.connector.pusher.connection.bind(
    "connected",
    () => {
      console.log("✅ Connected to Pusher");
    }
  );


  echo.connector.pusher.connection.bind(
    "error",
    (err) => {
      console.log(
        "❌ Pusher Error:",
        err
      );
    }
  );


  const channel = echo.channel("warehouse");


  channel.subscribed(() => {
    console.log(
      "✅ Subscribed to warehouse"
    );
  });


  channel.listen(
    ".order.created",
    (e) => {

      console.log(
        "🎉 Event received:",
        e
      );


      setNotification(e);


      const audio = new Audio(
        "/sounds/notification.mp3"
      );

      audio.volume = 1;

      audio.play()
        .then(() => {
          console.log(
            "✅ Sound Played"
          );
        })
        .catch((err) => {
          console.error(
            "❌ Audio Error:",
            err.message
          );
        });


      setTimeout(() => {
        setNotification(null);
      }, 5000);

    }
  );


  return () => {

    window.removeEventListener(
      "click",
      enableAudio
    );

    echo.leaveChannel(
      "warehouse"
    );

    echo.disconnect();

  };


}, []);
  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: FiGrid,
      },
    {
  label:"Reports",
  path:"/reports",
  icon:FiFileText,
},
    {
      label: "Medicines",
      path: "/medicines",
      icon: FiBox,
    },
    {
      label: "Orders",
      path: "/orders",
      icon: FiShoppingCart,
    },
  ];

  const handleLogout = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    await logout();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72
          transform bg-slate-950 text-white
          transition-transform duration-300
          lg:translate-x-0
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div>
            <h1 className="text-xl font-bold">
              Pharmacy
            </h1>

            <p className="text-xs text-slate-400">
              Warehouse Management
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 rounded-xl
                  px-4 py-3 text-sm font-medium
                  transition
                  ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }
                  `
                }
              >
                <Icon size={20} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <FiMenu size={24} />
          </button>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                Warehouse Owner
              </p>

              <p className="text-xs text-slate-500">
                Admin
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
              W
            </div>
          </div>
        </header>
{notification && (
    <div className="fixed right-6 top-6 z-[9999] animate-bounce">

        <div className="w-96 rounded-2xl border-l-4 border-emerald-500 bg-white shadow-2xl">

            <div className="flex items-start gap-4 p-5">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl">
                    💊
                </div>

                <div className="flex-1">

                    <h3 className="font-bold text-slate-800">
                        {notification.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                        {notification.message}
                    </p>

                    <div className="mt-3 text-xs text-slate-400">
                        Just now
                    </div>

                </div>

                <button
                    onClick={() => setNotification(null)}
                    className="text-xl text-slate-400 hover:text-slate-700"
                >
                    ✕
                </button>

            </div>

        </div>

    </div>
)}
        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default WarehouseLayout;