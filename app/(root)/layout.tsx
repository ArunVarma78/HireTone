import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

export default async function Rootlayout({
  children,
}: {
  children: ReactNode;
}) {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");

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
