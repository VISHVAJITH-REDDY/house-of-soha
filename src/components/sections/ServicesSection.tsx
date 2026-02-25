import { services } from "@/data/services";

export default function ServicesSection() {
  const makeupServices = services.filter((s) => s.category === "makeup");
  const skinServices = services.filter((s) => s.category === "skin");
  const salonServices = services.filter((s) => s.category === "salon");

  return (
    <section id="services" style={{ background: "#fdf6ee", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="script-accent">What We Offer</div>
          <div className="gold-divider" style={{ maxWidth: "200px", margin: "0.75rem auto" }}>
            <span style={{ fontSize: "1rem", color: "#c9a96e" }}>✦</span>
          </div>
          <h2 className="section-heading" style={{ marginBottom: "1rem" }}>
            Our Services
          </h2>
          <p className="section-subheading" style={{ maxWidth: "560px", margin: "0 auto" }}>
            From bridal glamour to medical-grade skin treatments — every service
            is crafted with passion, expertise, and the finest products.
          </p>
        </div>

        {/* Makeup & Beauty */}
        <CategoryBlock
          title="Makeup & Beauty"
          services={makeupServices}
          accentColor="#b76e79"
        />

        {/* Skin & Semi-Permanent */}
        <CategoryBlock
          title="Skin & Semi-Permanent"
          services={skinServices}
          accentColor="#c9a96e"
        />

        {/* Salon */}
        <CategoryBlock
          title="Salon Services"
          services={salonServices}
          accentColor="#590028"
        />
      </div>
    </section>
  );
}

function CategoryBlock({
  title,
  services: svcList,
  accentColor,
}: {
  title: string;
  services: typeof import("@/data/services").services;
  accentColor: string;
}) {
  return (
    <div style={{ marginBottom: "3.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.75rem",
        }}
      >
        <div
          style={{
            width: "4px",
            height: "28px",
            borderRadius: "2px",
            background: accentColor,
          }}
        />
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.3rem",
            color: "#2c1a1d",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {svcList.map((svc) => (
          <ServiceCard key={svc.id} service={svc} accentColor={accentColor} />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  accentColor,
}: {
  service: typeof import("@/data/services").services[0];
  accentColor: string;
}) {
  return (
    <div
      className="card-luxury"
      style={{ padding: "1.5rem" }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: `${accentColor}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          marginBottom: "1rem",
          border: `1px solid ${accentColor}25`,
        }}
      >
        {service.icon}
      </div>
      <h4
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.05rem",
          color: "#2c1a1d",
          marginBottom: "0.5rem",
        }}
      >
        {service.name}
      </h4>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#6b4c52",
          lineHeight: 1.65,
          marginBottom: "1rem",
        }}
      >
        {service.description}
      </p>
      {service.duration && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.75rem",
            color: accentColor,
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          <span>⏱</span>
          {service.duration}
        </div>
      )}
    </div>
  );
}
