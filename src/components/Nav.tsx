'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/standings", label: "Standings" },
  { href: "/posts", label: "Posts" },
  { href: "/forum", label: "Forum" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="container flex items-center justify-between h-14">
        <div className="font-semibold">League Companion</div>
        <div className="flex gap-4 text-sm">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={pathname === l.href ? "underline" : ""}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
