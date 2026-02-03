export const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="fashion-caption text-muted-foreground">
            VTRYON
          </span>
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} 保留所有权利
          </span>
        </div>
      </div>
    </footer>
  );
};
