import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Users } from "lucide-react";
import alphaLogo from "@/assets/alpha-logo.png";
import Image from "next/image";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Membership", path: "/membership" },
  { name: "Partners", path: "/partners" },
  { name: "Sponsors", path: "/sponsors" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-slate-900 sticky top-0 z-50">
      <div className="container-main">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-amber-500 flex items-center justify-center overflow-hidden">
              <Image   
                src={alphaLogo} 
                alt="ALPHA Logo" 
                className="w-full h-full object-cover"
                fill
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-wide">ALPHA</span>
              <span className="text-xs text-amber-500 tracking-wider">AUTOMOTIVE EXCELLENCE</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium text-white/80 transition-colors hover:text-white ${pathname === link.path ? "text-white" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/member-signin"
              className="hidden sm:flex items-center gap-2 rounded-md border border-amber-500 px-4 py-2 text-sm font-medium text-amber-500 transition-colors hover:bg-amber-500 hover:text-slate-900"
            >
              <User className="w-4 h-4" />
              Member Sign In
            </Link>
            <Link
              href="/partner-login"
              className="hidden sm:flex items-center gap-2 rounded-md border border-amber-500 bg-transparent px-4 py-2 text-sm font-medium text-amber-500 transition-colors hover:bg-amber-500 hover:text-slate-900"
            >
              <Users className="w-4 h-4" />
              Partner Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
