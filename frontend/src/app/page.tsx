const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

const foundations = [
  {
    label: "Interview",
    value: "Project deep-dive · English · up to 6 turns",
  },
  {
    label: "Voice",
    value: "Chrome speech recognition with text fallback",
  },
  {
    label: "Privacy",
    value: "No stored audio · session data expires after 24 hours",
  },
];

export default function Home() {
  return (
    <main className="shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">M1 · Reproducible scaffold</p>
        <h1 id="page-title">Global-Ready</h1>
        <p className="lede">
          Practise explaining the software project you already know, in the
          English you need for the interview.
        </p>

        <div className="status" role="status">
          <span className="statusDot" aria-hidden="true" />
          Fake-provider local mode requires no API key
        </div>
      </section>

      <section className="grid" aria-label="MVP foundations">
        {foundations.map((foundation) => (
          <article className="card" key={foundation.label}>
            <h2>{foundation.label}</h2>
            <p>{foundation.value}</p>
          </article>
        ))}
      </section>

      <section className="checkpoint" aria-labelledby="checkpoint-title">
        <div>
          <p className="eyebrow">Current checkpoint</p>
          <h2 id="checkpoint-title">Infrastructure only</h2>
          <p>
            Domain behaviour begins in M2 after the Java/Spring scaffold is
            reviewed.
          </p>
        </div>
        <a href={`${apiBaseUrl}/actuator/health`}>Backend health</a>
      </section>
    </main>
  );
}

