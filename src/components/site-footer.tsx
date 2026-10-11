export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-8">
      <div className="mx-auto flex max-w-[90rem] flex-col items-center gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
        <p>© 2026 UniteFencers</p>
        <p>
          Need help? Email{" "}
          <a
            href="mailto:unitefencers@gmail.com"
            className="font-medium text-foreground underline underline-offset-2"
          >
            unitefencers@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
