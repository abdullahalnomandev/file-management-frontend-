import Link from "next/link";
import { Button } from "antd";
import { ArrowRight } from "lucide-react";
import { isUserLoggedIn } from "@/services/auth.service";

const MainBanner = () => {

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative md:min-h-screen md:py-0 flex items-center justify-center overflow-hidden select-none"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #162247 0%, #0C1223 100%)",
        }}
      >
        {/* Content */}
        <div className="container-main max-w-[1300px] mx-auto text-center relative z-10 px-4">
          {/* Background Image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url('/assets/bg/test.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.1, // ✅ only background opacity
              // transform: "scale(0.9)",
            }}
          />

          <section>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Secure Cloud Storage with{" "}
                <span className="bg-linear-to-r from-[#D7A859] to-[#FFD780] bg-clip-text text-transparent">
                  Flexible Plans
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Store, organize, and manage your files with subscription-based
                tiers. From free basic storage to premium unlimited access, find
                the perfect plan for your needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/register">
                  <Button
                     type="primary"
                    size="large"
                    className="bg-[#D7A859]! hover:bg-[#FFD780]! text-white! gap-2!"
                  >
                    Start Free <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="large" variant="link">
                    Sign In
             
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default MainBanner;
