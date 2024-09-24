import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Pokémon Dashboard",
  description:
    "Log in to your Pokémon Dashboard to explore, manage, and track all your favorite Pokémon.",
  robots: {
    index: false,
    follow: false,
  },

};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
