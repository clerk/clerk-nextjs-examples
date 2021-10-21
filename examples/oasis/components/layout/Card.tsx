import styles from "./Card.module.css";

export function Card({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={[styles.card, className].join(" ")} style={style}>
      {children}
    </div>
  );
}
