'use client';

import Link from 'next/link';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <>
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <Link
          href="/dashboard"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Início
        </Link>

        <Link
          href="/dashboard/materias"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Matérias
        </Link>

        <Link
          href="/dashboard/revisoes"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Revisões
        </Link>

        <Link
          href="/dashboard/estudos"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Estudos
        </Link>

        <Link
          href="/dashboard/resultados"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Resultados
        </Link>

        <Link
          href="/dashboard/provas"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Provas
        </Link>
      </nav>
    </>
  );
}
