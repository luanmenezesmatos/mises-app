'use client';

import * as React from 'react';
import Link from 'next/link';

import { MobileNav } from './mobile-nav';

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
          href="/dashboard/livros"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Livros
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
