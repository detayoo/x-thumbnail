import { MetaText } from "../editorial";

export function StatsSection() {
  const stats = [
    {
      value: "30,000+",
      label: "Monthly Readers",
      description: "Growing community of curious minds",
    },
    {
      value: "100%",
      label: "Original Content",
      description: "Every article written in-house",
    },
    {
      value: "10",
      label: "Knowledge Domains",
      description: "From science to culture",
    },
    {
      value: "Weekly",
      label: "New Articles",
      description: "Fresh perspectives every week",
    },
  ];

  return (
    <section className="py-16 bg-accent/30">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
                {stat.value}
              </div>
              <MetaText
                as="p"
                className="font-medium text-foreground mb-1 tracking-wide"
              >
                {stat.label}
              </MetaText>
              <MetaText as="p" className="text-muted-foreground text-sm">
                {stat.description}
              </MetaText>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}