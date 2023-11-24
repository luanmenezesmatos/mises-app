'use client';

import * as React from 'react';

import Link from 'next/link';

import { useLockBody } from '@/app/hooks/use-lock-body';

export function MobileNav() {
  useLockBody();

  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <Link href="/">
          <p className="text-2xl font-bold tracking-tight">Sistema</p>
        </Link>
        <button
          className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-800"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <svg
            className="w-6 h-6 text-gray-600 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            {showMobileMenu ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>
      {showMobileMenu && (
        <div className="flex flex-col items-start justify-center w-full h-full p-4 space-y-4 bg-gray-100 dark:bg-gray-900">
          <Link href="/dashboard">
            <p className="text-xl font-bold tracking-tight">Dashboard</p>
          </Link>
          <Link href="/dashboard/planos">
            <p className="text-xl font-bold tracking-tight">Planos</p>
          </Link>
          <Link href="/dashboard/usuarios">
            <p className="text-xl font-bold tracking-tight">Usuários</p>
          </Link>
          <Link href="/dashboard/relatorios">
            <p className="text-xl font-bold tracking-tight">Relatórios</p>
          </Link>
          <Link href="/dashboard/configuracoes">
            <p className="text-xl font-bold tracking-tight">Configurações</p>
          </Link>
          <Link href="/dashboard/sair">
            <p className="text-xl font-bold tracking-tight">Sair</p>
          </Link>
        </div>
      )}
    </>
  );
}
