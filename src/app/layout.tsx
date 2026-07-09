import "./globals.css";

export const metadata = {
  title: "Katniss Reception",
  description: "Katniss Reception Demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}