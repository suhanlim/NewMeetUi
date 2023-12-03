import { Navbar } from "@/components/Navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="bg-sky-50">{children}</div>
    </>
  );
}
