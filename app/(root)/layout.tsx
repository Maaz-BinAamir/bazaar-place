import Navbar from "@/components/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
