export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <div className="sidebar">{children}</div>
      <div className="cover"></div>
    </div>
  );
}
