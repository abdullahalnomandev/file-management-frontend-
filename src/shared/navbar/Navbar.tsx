"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Cloud, Menu } from "lucide-react";
import { Button, Drawer } from "antd";
import alpha from "@/assets/image 2.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/#features" },
  { name: "Plans", path: "/#pricing" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#0c1223] sticky top-0 z-50">
      <div className="container-main max-w-350 mx-auto">
        <div className="flex items-center justify-between justify-space-around gap-12 py-3 px-4 sm:px-12 md:px-16 xl:px-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-[#D7A859] rounded-lg">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              StorageHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`nav-link relative transition-colors duration-300 group`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1  left-0 w-full h-0.5 bg-amber transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${
                    pathname === link.path && link.path !== "/"
                      ? "scale-x-100"
                      : ""
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-[#D7A859] bg-transparent px-4 py-2 text-sm font-medium text-[#D7A859] group"
            >
              {/* Sliding background */}
              <span className="absolute inset-0 bg-[#D7A859] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>

              {/* Text */}
              <span className="relative z-10 text-[#D7A859] transition-colors duration-300 group-hover:text-[#050507]">
                Login
              </span>
            </Link>
            <Link
              href="/register"
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-[#D7A859] bg-[#D7A859] px-4 py-2 text-sm font-medium text-[#050507] group"
            >
              {/* Sliding background */}
              <span className="absolute inset-0 bg-[#0c1223] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>

              {/* Text */}
              <span className="relative z-10 text-[#050507] transition-colors duration-300 group-hover:text-[#D7A859]">
                Register
              </span>
            </Link>
          </div>

          <button
            className="md:hidden text-amber cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <Drawer
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-amber flex items-center justify-center overflow-hidden">
                    <Image
                      src={alpha}
                      alt="ALPHA Logo"
                      className="w-full h-full object-contain bg-[#0c1223]"
                    />
                  </div>
                </div>
                {/* The X button manually placed on the right */}
                <span
                  className="text-white cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </span>
              </div>
            }
            placement="right"
            onClose={() => setIsOpen(false)}
            open={isOpen}
            closable={false} // disable default close button
            styles={{
              header: {
                backgroundColor: "#0c1223",
                borderBottom: "1px solid #D7A859",
              },
              body: { backgroundColor: "#0c1223", color: "white" },
              mask: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
            }}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-base font-medium transition-colors duration-300 ${
                    pathname === link.path ? "text-[#D7A859]!" : "text-white!"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md border border-[#D7A859] bg-transparent px-4 py-2 text-sm font-medium text-[#D7A859] group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="absolute inset-0 bg-[#D7A859] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 text-[#D7A859] transition-colors duration-300 group-hover:text-[#050507]">
                    Login
                  </span>
                </Link>
                <Link
                  href="/register"
                  className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md 
             border border-[#D7A859]! bg-[#D7A859]! px-4 py-2 text-sm font-medium 
             text-[#050507]! group"
                  onClick={() => setIsOpen(false)}
                >
                  {/* reverse hover fill */}
                  <span
                    className="absolute inset-0 bg-[#D7A859]! scale-x-100 origin-right 
               transition-transform duration-300 ease-out 
               group-hover:scale-x-0"
                  ></span>

                  {/* text */}
                  <span
                    className="relative z-10 text-[#050507]! transition-colors duration-300 
               group-hover:text-[#050507]!"
                  >
                    Register  
                  </span>
                </Link>

                {/* <Link
                  href="/partner-login"
                  className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md border border-[#D7A859] bg-transparent px-4 py-3 text-sm font-medium text-[#D7A859] group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="absolute inset-0 bg-[#D7A859] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10 text-[#D7A859] transition-colors duration-300 group-hover:text-[#050507]">
                   Apply Here
                  </span>
                </Link> */}
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
