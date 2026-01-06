export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--border)">
      <div className="mx-auto max-w-6xl px-6 py-6 text-sm muted flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <span>© {year} As Md Habibullah. All rights reserved.</span>

        <span>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>{" "}
          · Academic Portfolio
        </span>
      </div>
    </footer>
  );
}
