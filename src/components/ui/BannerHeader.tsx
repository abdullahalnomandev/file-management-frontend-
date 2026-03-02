import { HeadManagerContext } from "next/dist/shared/lib/head-manager-context.shared-runtime";
import SectionHeading from "./SectionHeading";

interface BannerHeaderProps {
  title: string;
  description: string;
}

const BannerHeader = ({ title, description }: BannerHeaderProps) => {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden"
    style={{
      background:
        "radial-gradient(50% 50% at 50% 50%, #162247 0%, #0C1223 100%)",
    }}
    >
      
      {/* Background layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/assets/bg/image-bg.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.1,          // ✅ only background opacity
          transform: "scale(0.9)",
        }}
      />

      {/* Content layer */}
      <div className="relative z-10 text-center px-4">
        <SectionHeading className="text-white">
            {title}
        </SectionHeading>
        <p className=" text-xl font-black  text-[#D7A859] tracking-wide ">
          {description}
        </p>
      </div>

    </section>
  );
};

export default BannerHeader;
