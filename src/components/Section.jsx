import useReveal from "../hooks/useReveal.js";

export default function Section({ id, alt = false, label, title, children }) {
  const ref = useReveal();
  const className = `section${alt ? " section-alt" : ""} reveal`;

  return (
    <section id={id} ref={ref} className={className}>
      <div className="container narrow">
        <p className="section-label">{label}</p>
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}
