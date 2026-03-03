"use client";
import { Cloud, LogOut, User } from "lucide-react";
import Link from "next/link";
import { authKey } from "@/constants/storageKey";
import { removeAccessTokenToCookie } from "@/services/removeTokeknFromCookie";

export default function Layout({ children }: { children: React.ReactNode }) {
  const logout = async () => {
    sessionStorage.removeItem(authKey);
    await removeAccessTokenToCookie({ redirect: "/" });
  };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-[#D7A859] rounded-lg">
                <Cloud className="w-5 h-5 text-white" />
              </div>
            </Link>
            <div className=" border-gray-300 pl-3">
              <p className="text-base font-bold">Admin Dashboard</p>
              <p className="text-xs text-gray-500">Welcome back, Admin</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex! items-center! gap-2! text-sm! cursor-pointer! text-yellow-600! border! border-yellow-500/40! rounded-md! px-4! py-2! hover:bg-yellow-50! transition!"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Gold line */}

      {children}
    </div>
  );
}
