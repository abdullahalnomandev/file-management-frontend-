interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children, className = '' }) => (
  <h2 className={`font-bold text-3xl md:text-4xl lg:text-5xl leading-[110%] tracking-normal text-center text-[#1A1A1A] mb-4 ${className}`}>
    {children}
  </h2>
);

export default SectionHeading;