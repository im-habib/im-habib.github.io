import "@/app/globals.css";
import Shell from "@/components/Shell";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata = {
  title: { default: "Academic Portfolio", template: "%s · Academic Portfolio" },
  description: "Academic & engineering portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Shell>{children}</Shell>
        </ThemeProvider>
      </body>
    </html>
  );
}
