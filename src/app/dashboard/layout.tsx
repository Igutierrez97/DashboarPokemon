import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Pokémon Dashboard',
    description: 'Discover and explore detailed information about your favorite Pokémon in the Pokémon Dashboard.',
    robots: {
      index: true,
      follow: true,
    },

};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}