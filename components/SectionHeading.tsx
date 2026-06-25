interface SectionHeadingProps {
  heading: string;
  subheading?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  heading,
  subheading,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "left" ? "text-left" : "text-center";

  return (
    <div className={`mb-12 lg:mb-16 ${alignClass} ${className}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-tight mb-4">
        {heading}
      </h2>
      {subheading && (
        <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subheading}
        </p>
      )}
    </div>
  );
}
