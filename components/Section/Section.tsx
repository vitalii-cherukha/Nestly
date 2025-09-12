import css from "./Section.module.css";

interface SectionProps {
  children: React.ReactNode;
}

export default function Section({ children }: SectionProps) {
  return <div className={css.section}>{children}</div>;
}
