import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Rootlayout({ children }: { children: ReactNode }) {
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />

          <h2 className="text-primary-100">HireTone</h2>
        </Link>
      </nav>
      {children}
    </div>
  );
}
