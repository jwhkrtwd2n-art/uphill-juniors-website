import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Members Area | Uphill Juniors FC",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
