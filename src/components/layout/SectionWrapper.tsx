import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className = "",
  id,
  fullHeight = false,
}) => {
  return (
    <section
      id={id}
      className={`section-padding relative ${fullHeight ? "min-h-screen flex items-center" : ""} ${className}`}
    >
      <div className="portfolio-container">{children}</div>
    </section>
  );
};

export default SectionWrapper;
