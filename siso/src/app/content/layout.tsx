"use client";
import { Navbar } from "@/components/Navbar";
import { Provider } from "jotai";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <Navbar />
      <div className="bg-sky-50">{children}</div>
    </Provider>
  );
}
