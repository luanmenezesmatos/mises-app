'use client';

import Link from 'next/link';

import { useLockBody } from '@/app/hooks/use-lock-body';

export function MobileNav() {
  useLockBody();

  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          {/* <img src="/images/logo.svg" alt="Logo" className="w-6" /> */}
          <span className="text-xl font-bold">Dashboard</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          <Link
            key="dashboard"
            href="/dashboard"
            className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
          >
            Início
          </Link>

          <Link
            key="materias"
            href="/dashboard/materias"
            className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
          >
            Matérias
          </Link>

          <Link
            key="revisoes"
            href="/dashboard/revisoes"
            className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
          >
            Revisões
          </Link>

          <Link
            key="estudos"
            href="/dashboard/estudos"
            className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
          >
            Estudos
          </Link>

          <Link
            key="livros"
            href="/dashboard/livros"
            className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
          >
            Livros
          </Link>

          <Link
            key="provas"
            href="/dashboard/provas"
            className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
          >
            Provas
          </Link>
        </nav>
      </div>
    </div>
  );
}
