import type { Metadata } from "next";
import "./globals.scss";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Caroussel Gamer",
  description: "Created by Gustavo Junqueira Barbosa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <Image
            src="/icons/menu.svg"
            alt="Menu options"
            width={36}
            height={25}
            priority
          />
          <Link href="/">
            <Image
              className={"logo"}
              src="/ancient-logo.svg"
              alt="Rise of Ancients Logo"
              width={260}
              height={70}
              priority
            />
          </Link>
          <Image
            src="/icons/user.svg"
            alt="Login"
            width={36}
            height={36}
            priority
          />
        </header>
        {children}
      </body>
    </html>
  );
}
