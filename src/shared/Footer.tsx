import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Cloud } from "lucide-react";
import alphaLogo from "@/assets/image 2.png"; // Update this path to your actual logo

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative pt-[83px] pb-6"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #162247 0%, #0C1223 100%)",
      }}
    >
      <div className="mx-auto container px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-[254px] pb-10">
          {/* Brand Column */}
          <div className="flex flex-col gap-4 w-full lg:w-[345px]">
            <Link href="/" className="flex items-center gap-2">
              <div className="inline-flex items-center justify-center w-8 h-8 bg-[#D7A859] rounded-lg">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                StorageHub
              </span>
            </Link>
            <p className="text-sm leading-[21px] text-[#FEFEFE] w-[200px]">
              Delivering excellence to those who drive it. An exclusive social
              and lifestyle club for automotive professionals and leaders.
            </p>
          </div>

          {/* Quick Links, Legal, Contact Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-30.25 w-full lg:w-236.75">
            {/* Quick Links */}
            <div className="flex flex-col gap-6 w-full lg:w-58.25">
              <h4 className="text-xl font-semibold leading-7.5 text-[#FEFEFE]">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-5">
                <li>
                  <Link
                    href="/about"
                    className="text-sm leading-6 text-[#FEFEFE] hover:text-[#FE9800] transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/membership-application"
                    className="text-sm leading-6 text-[#FEFEFE] hover:text-[#FE9800] transition-colors"
                  >
                    Become a Member
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partners"
                    className="text-sm leading-6 text-[#FEFEFE] hover:text-[#FE9800] transition-colors"
                  >
                    Partner with Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sponsors"
                    className="text-sm leading-6 text-[#FEFEFE] hover:text-[#FE9800] transition-colors"
                  >
                    Our Sponsor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm leading-6 text-[#FEFEFE] hover:text-[#FE9800] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-6 w-full lg:w-50.25">
              <h4 className="text-xl font-semibold leading-7.5 text-[#FEFEFE]">
                Legal
              </h4>
              <ul className="flex flex-col gap-5">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm leading-6 text-[#FEFEFE] hover:text-[#FE9800] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-conditions"
                    className="text-sm leading-6 text-[#FEFEFE] hover:text-[#FE9800] transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="flex flex-col gap-6 w-full lg:w-74.75">
              <h4 className="text-xl font-semibold leading-7.5 text-[#FEFEFE]">
                Contact Us
              </h4>
              <ul className="flex flex-col gap-5">
                <li className="flex items-center gap-2">
                  <Mail
                    className="w-6 h-6 text-[#FE9800] shrink-0"
                    strokeWidth={1.5}
                  />
                  <a
                    href="mailto:info@alphaclub.ae"
                    className="text-sm leading-6 text-[#FEFEFE] hover:text-[#FE9800] transition-colors"
                  >
                    Info@alphaclub.ae
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone
                    className="w-6 h-6 text-[#FE9800] shrink-0"
                    strokeWidth={1.5}
                  />
                  <a
                    href="tel:+971XXXXXXXXX"
                    className="text-sm leading-6 text-[#FEFEFE] hover:text-[#FE9800] transition-colors"
                  >
                    +971 XXX XXX XXXX
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin
                    className="w-6 h-6 text-[#FE9800] shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <div className="text-sm leading-6 text-[#FEFEFE]">
                    <p>Monday - Friday</p>
                    <p>9:00 AM - 5:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
      </div>
      <div className="w-full h-px bg-[#343F52]"></div>
      <div className="flex flex-col items-center gap-6 pt-6">
        <p className="text-sm leading-5.25 text-center text-[#B5B5B5]">
          © {currentYear} ALPHA - Automotive Leaders and Professionals Hub
          Association. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
