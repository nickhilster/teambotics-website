import Image from "next/image";

const AMBER = "#FF950D";

export default function EasyBuddyPage() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#000", color: "#fff" }}>
      {/* NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,149,13,0.2)",
          padding: "0 1.5rem",
          height: "3.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <Image
            src="https://cdn.gamma.app/sogu61n3buhmo0y/e446802448c34beaabf185566966b0fe/original/TeamBotics-Logo_tranparent_amber.png"
            alt="TeamBotics"
            width={32}
            height={32}
            style={{ borderRadius: "6px" }}
          />
          <span style={{ fontWeight: 700, fontSize: "1rem", color: AMBER, letterSpacing: "-0.02em" }}>
            EasyBuddy
          </span>
          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginLeft: "0.25rem" }}>
            by TeamBotics
          </span>
        </div>
        <a
          href="mailto:hello@teambotics.app"
          style={{
            background: AMBER,
            color: "#000",
            fontWeight: 700,
            fontSize: "0.8rem",
            padding: "0.4rem 1rem",
            borderRadius: "6px",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Book a Call
        </a>
      </nav>

      {/* HERO */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "5rem 1.5rem 4rem",
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,149,13,0.12) 0%, transparent 70%), #000",
        }}
      >
        <Image
          src="https://cdn.gamma.app/sogu61n3buhmo0y/e446802448c34beaabf185566966b0fe/original/TeamBotics-Logo_tranparent_amber.png"
          alt="TeamBotics Logo"
          width={80}
          height={80}
          style={{ marginBottom: "1.5rem", borderRadius: "12px" }}
        />
        <div
          style={{
            display: "inline-block",
            background: "rgba(255,149,13,0.12)",
            border: "1px solid rgba(255,149,13,0.3)",
            borderRadius: "100px",
            padding: "0.3rem 0.9rem",
            fontSize: "0.75rem",
            color: AMBER,
            fontWeight: 600,
            marginBottom: "1.5rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Pilot Partner Program Open
        </div>
        <h1
          style={{
            fontSize: "clamp(2.4rem, 7vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            maxWidth: "800px",
            margin: "0 auto 1.25rem",
            color: AMBER,
          }}
        >
          Empowering Workplaces with Human-First AI
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "rgba(255,255,255,0.65)",
            maxWidth: "560px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.6,
          }}
        >
          From onboarding to innovation — we build intelligent tools that listen, learn, and
          support your people from Day One.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="mailto:hello@teambotics.app"
            style={{
              background: AMBER,
              color: "#000",
              fontWeight: 700,
              fontSize: "0.95rem",
              padding: "0.75rem 1.75rem",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Explore EasyBuddy
          </a>
          <a
            href="mailto:hello@teambotics.app"
            style={{
              border: `1.5px solid ${AMBER}`,
              color: AMBER,
              fontWeight: 600,
              fontSize: "0.95rem",
              padding: "0.75rem 1.75rem",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Let's Build Together
          </a>
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ background: "#061722", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "3rem 1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {[
            { value: "2.8B", label: "Global Frontline Workers", sub: "The world's largest workforce, underserved by technology." },
            { value: "$1T", label: "Annual Cost of Employee Churn", sub: "Businesses lose trillions yearly due to preventable turnover." },
          ].map((s) => (
            <div key={s.value}>
              <div style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, color: AMBER, letterSpacing: "-0.04em" }}>
                {s.value}
              </div>
              <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem" }}>{s.label}</div>
              <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VISION */}
      <section style={{ padding: "5rem 1.5rem", background: "#0a1220" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          <div>
            <p style={{ color: AMBER, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Our Vision</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              AI should serve people — not replace them.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "1rem" }}>
              At TeamBotics, we design emotionally intelligent systems that reduce friction, increase
              clarity, and help your team show up as their best selves.
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
              Whether you need a better way to onboard retail staff or a custom AI for your
              logistics team, we bring humanity and trust to every interaction.
            </p>
          </div>
          <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", aspectRatio: "1", background: "#111" }}>
            <Image
              src="https://cdn.gamma.app/sogu61n3buhmo0y/generated-images/Rd3WwTVdBs0x1gQRNiULA.png"
              alt="Diverse team collaborating with AI"
              fill
              sizes="(max-width: 900px) 100vw, 450px"
              style={{ objectFit: "cover", opacity: 0.9 }}
            />
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section style={{ padding: "5rem 1.5rem", background: "#000" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p style={{ color: AMBER, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center", marginBottom: "0.75rem" }}>What We Build</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: "3rem" }}>
            Three pillars, one mission
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                icon: "🏆",
                title: "Flagship Solutions",
                body: "EasyBuddy is our premiere product: a voice-guided onboarding assistant for retail teams that replaces rigid e-learning with natural, scenario-based training.",
              },
              {
                icon: "⚗️",
                title: "Custom AI Projects",
                body: "Prototype tools, integrate assistants, build secure LLM-powered workflows tailored to your unique operational environment.",
              },
              {
                icon: "🛡️",
                title: "Trust by Design",
                body: "Read-only defaults, scoped access, and human-in-the-loop safeguards. Security and transparency built in from day one.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                }}
              >
                <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.6rem", color: "#fff" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EASYBUDDY PRODUCT */}
      <section
        style={{
          padding: "5rem 1.5rem",
          background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(255,149,13,0.08) 0%, transparent 70%), #050505",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Image
                src="https://cdn.gamma.app/sogu61n3buhmo0y/edited-images/6lwVGeu9-kbM2PWyUjVe2.png"
                alt="EasyBuddy robot"
                width={280}
                height={280}
                style={{ marginBottom: "1.5rem" }}
              />
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: AMBER, letterSpacing: "-0.04em", textAlign: "center", marginBottom: "0.5rem" }}>
                EasyBuddy
              </h2>
              <p style={{ color: AMBER, fontSize: "1rem", fontWeight: 600, textAlign: "center" }}>
                An AI-powered training assistant for the retail floor
              </p>
            </div>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  {
                    title: "Customer Service Simulations",
                    body: "Realistic role-playing scenarios to help employees practice interaction skills — from de-escalating tense situations to delivering a warm service experience.",
                  },
                  {
                    title: "Instant Policy Lookups",
                    body: "Quickly access company policies, procedures, and product knowledge — empowering employees to give accurate, up-to-date responses.",
                  },
                  {
                    title: "Personalized Shift Prep",
                    body: "Tailored pre-shift briefings that ensure each employee is fully prepared for the unique demands of their upcoming workday.",
                  },
                  {
                    title: "Tone-Aware Coaching",
                    body: "AI-powered feedback that adapts to each employee's communication style, helping them develop the right approach for effective customer interactions.",
                  },
                ].map((feat) => (
                  <div
                    key={feat.title}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,149,13,0.2)",
                      borderRadius: "10px",
                      padding: "1.25rem",
                    }}
                  >
                    <h4 style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.5rem", color: "#fff" }}>
                      {feat.title}
                    </h4>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", lineHeight: 1.55 }}>{feat.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROVEN RESULTS */}
      <section style={{ padding: "5rem 1.5rem", background: "#061722" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: AMBER, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
            Proven Results
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "3rem" }}>
            Real impact for frontline teams
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginBottom: "2rem" }}>
            {[
              { value: "30%", label: "Faster Onboarding", body: "New employees reach productivity benchmarks in significantly less time, reducing training cost while accelerating time-to-value." },
              { value: "25%", label: "Higher Team Satisfaction", body: "Workers report higher job satisfaction with on-demand support, improving morale and workplace environment." },
              { value: "20%", label: "Lower Turnover", body: "New hire retention improves substantially when employees feel confident and supported from day one." },
            ].map((s) => (
              <div key={s.value} style={{ padding: "1.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: "3rem", fontWeight: 800, color: AMBER, letterSpacing: "-0.04em", marginBottom: "0.4rem" }}>
                  {s.value}
                </div>
                <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>{s.label}</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>{s.body}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}>
            Managers report reduced workplace stress and increased employee confidence across all environments.
          </p>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section style={{ padding: "5rem 1.5rem", background: "#000" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p style={{ color: AMBER, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center", marginBottom: "0.75rem" }}>
            Built for the Core of the Service Economy
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: "0.75rem" }}>
            Born in retail. Ready for more.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", textAlign: "center", maxWidth: "560px", margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
            EasyBuddy is particularly valuable in settings with complex products, high customer
            interaction, or frequent employee turnover.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "🛒", label: "Retail", body: "Empower floor staff with instant product knowledge and customer service support." },
              { icon: "🚗", label: "Automotive Service", body: "Provide technicians with voice-activated guidance for complex procedures." },
              { icon: "🍔", label: "QSR", body: "Streamline training for high-turnover quick service restaurant environments." },
              { icon: "📦", label: "Warehouse & Logistics", body: "Streamline onboarding and provide ongoing safety and procedural support." },
              { icon: "🏪", label: "Franchise Models", body: "Maintain consistency across locations while adapting to local needs." },
            ].map((ind) => (
              <div
                key={ind.label}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "10px",
                  padding: "1.25rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{ind.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem" }}>{ind.label}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{ind.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTOMOTIVE DEMO */}
      <section style={{ padding: "5rem 1.5rem", background: "#050b14" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p style={{ color: AMBER, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center", marginBottom: "0.75rem" }}>
            EasyBuddy in Action
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: AMBER, letterSpacing: "-0.03em", textAlign: "center", marginBottom: "0.5rem" }}>
            Automotive Service Assistant
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", textAlign: "center", maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
            In the fast-paced world of automotive service, efficiency and accuracy are paramount.
            EasyBuddy transforms the service bay into a hub of intelligent support.
          </p>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "2.5rem",
              border: "1px solid rgba(255,149,13,0.2)",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/c1hi_uUpfbA"
              title="EasyBuddy Automotive Service Assistant"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "🔧", title: "Real-Time Diagnostics", body: "Access up-to-the-minute diagnostic info and troubleshooting guides through natural language commands." },
              { icon: "📦", title: "Parts & Inventory Lookup", body: "Instantly find part numbers, availability, and pricing across your inventory and supplier networks." },
              { icon: "📞", title: "Customer Communication", body: "Equip advisors to confidently explain complex repairs and enhance satisfaction with transparent information." },
              { icon: "🎓", title: "Technical Training", body: "On-the-job training for new procedures and vehicle models, keeping your team current with industry standards." },
            ].map((feat) => (
              <div
                key={feat.title}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "1.25rem",
                }}
              >
                <div style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{feat.icon}</div>
                <h4 style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem" }}>{feat.title}</h4>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>{feat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLUEBOT CASE STUDY */}
      <section style={{ padding: "5rem 1.5rem", background: "#000" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ color: AMBER, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center", marginBottom: "0.75rem" }}>
            Case Study
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: "0.5rem" }}>
            BlueBot at Best Buy
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", textAlign: "center", maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
            A conversational AI success story in retail workforce development — piloted at Best Buy
            Sherway Gardens, Toronto.
          </p>
          <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "2.5rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ background: "rgba(255,149,13,0.12)" }}>
                  {["Metric", "Before BlueBot", "With BlueBot", "Improvement"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.9rem 1.2rem",
                        textAlign: "left",
                        fontWeight: 700,
                        color: AMBER,
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Onboarding Time", "Baseline", "–30–35%", "Significant reduction"],
                  ["Policy Recall Accuracy", "62%", "~100%", "38-point increase"],
                  ["Senior Staff Load", "High", "Reduced", "Operational efficiency"],
                  ["Employee Confidence", "Moderate", "High", "Qualitative improvement"],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        style={{
                          padding: "0.85rem 1.2rem",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                          color: j === 0 ? "#fff" : "rgba(255,255,255,0.65)",
                          fontWeight: j === 0 ? 600 : 400,
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "❤️", title: "Reduces Turnover & Stress", body: "Consistent, judgment-free support alleviates anxiety, making employees feel more prepared and confident." },
              { icon: "⚖️", title: "Scales Knowledge Efficiently", body: "Democratizes access to institutional knowledge, ensuring best practices reach all employees simultaneously." },
              { icon: "👤", title: "Human-First Design", body: "EasyBuddy incorporates empathy training recognizing that retail success depends on human connection." },
              { icon: "🧩", title: "Seamless Integration", body: "Architecture supports integration with existing LMS, HRIS, and CRM platforms with minimal disruption." },
            ].map((b) => (
              <div
                key={b.title}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "1.25rem",
                }}
              >
                <div style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{b.icon}</div>
                <h4 style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem" }}>{b.title}</h4>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATION */}
      <section style={{ padding: "5rem 1.5rem", background: "#061722" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          <div>
            <p style={{ color: AMBER, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Seamless Integration</p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem", color: AMBER }}>
              Connects with your existing stack
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              EasyBuddy is engineered for seamless integration with your existing enterprise
              systems — LMS, CRM, DMS, and PRM portals.
            </p>
            <div
              style={{
                background: "rgba(255,149,13,0.08)",
                border: "1px solid rgba(255,149,13,0.2)",
                borderRadius: "8px",
                padding: "1rem 1.25rem",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: AMBER }}>API-driven, read-first safety.</strong> EasyBuddy
              observes, coaches, and enhances your workflows without ever overwriting sensitive
              records or disrupting core operations.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: "⬇️", title: "Data Pull from LMS / Intranet", body: "Pulls training modules, SOPs, service bulletins, and product info from your existing systems." },
              { icon: "🔄", title: "Contextual Sync from CRM / DMS", body: "Syncs customer history, diagnostics, and service logs for real-time, personalized interactions." },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "1.25rem",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.4rem" }}>{item.title}</h4>
                  <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section style={{ padding: "5rem 1.5rem", background: "#000" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ color: AMBER, fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center", marginBottom: "0.75rem" }}>
            Trust by Design
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: "2.5rem" }}>
            We don't ask for trust — we earn it.
          </h2>
          <blockquote
            style={{
              borderLeft: `3px solid ${AMBER}`,
              paddingLeft: "1.25rem",
              margin: "0 auto 2.5rem",
              maxWidth: "600px",
              color: "rgba(255,255,255,0.6)",
              fontStyle: "italic",
              lineHeight: 1.7,
            }}
          >
            "People want to do good work — if you remove friction and judgment, and give them the
            right tools, they'll rise to the occasion."
          </blockquote>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "🔒", title: "Read-Only by Default", body: "All connected systems operate with read-only integration — no unauthorized modifications." },
              { icon: "🛡️", title: "Zero-Tolerance Data Boundaries", body: "Personal information stays strictly confidential with clear limitations on what EasyBuddy can access." },
              { icon: "👤", title: "Human-in-the-Loop Recovery", body: "When EasyBuddy isn't sure, it defers to human expertise instead of making potentially harmful guesses." },
              { icon: "📋", title: "Full Audit Trails", body: "Comprehensive logging enables compliance documentation and rapid incident response." },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "1.25rem",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                <h4 style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem" }}>{item.title}</h4>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "6rem 1.5rem",
          background: `radial-gradient(ellipse 70% 60% at 50% 100%, rgba(255,149,13,0.15) 0%, transparent 70%), #030b14`,
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <Image
            src="https://cdn.gamma.app/sogu61n3buhmo0y/generated-images/pGGpIFFVG3B5cNqUKkm52.png"
            alt="Manager with frontline team"
            width={640}
            height={300}
            style={{ borderRadius: "12px", marginBottom: "2.5rem", width: "100%", height: "auto", maxWidth: "640px", opacity: 0.8 }}
          />
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: AMBER, letterSpacing: "-0.04em", marginBottom: "1rem" }}>
            Ready to Transform Your Frontline?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            We're actively onboarding pilot partners. The consultation is 100% free — you only pay
            if you choose to move forward.
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.88rem", marginBottom: "2rem" }}>
            Discovery sprint typically completes in 1 business week.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="mailto:hello@teambotics.app"
              style={{
                background: AMBER,
                color: "#000",
                fontWeight: 700,
                fontSize: "1rem",
                padding: "0.85rem 2rem",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Join Our Pilot Program
            </a>
            <a
              href="mailto:hello@teambotics.app"
              style={{
                border: `1.5px solid rgba(255,255,255,0.25)`,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 600,
                fontSize: "1rem",
                padding: "0.85rem 2rem",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Email Us
            </a>
          </div>
          <p style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.35)", fontSize: "0.82rem" }}>
            Or reach us directly at{" "}
            <a href="mailto:hello@teambotics.app" style={{ color: AMBER, textDecoration: "none" }}>
              hello@teambotics.app
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#000",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "2rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <Image
            src="https://cdn.gamma.app/sogu61n3buhmo0y/e446802448c34beaabf185566966b0fe/original/TeamBotics-Logo_tranparent_amber.png"
            alt="TeamBotics"
            width={28}
            height={28}
            style={{ borderRadius: "4px" }}
          />
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
            © 2025 TeamBotics Inc. · Based in Canada 🍁 · Human-First AI, Built For Trust
          </span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {[
            { label: "Privacy", href: "https://teambotics.app/privacy" },
            { label: "Terms", href: "https://teambotics.app/terms" },
            { label: "teambotics.app", href: "https://teambotics.app" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
