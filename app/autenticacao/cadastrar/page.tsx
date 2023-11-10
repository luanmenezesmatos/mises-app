import { Metadata } from 'next';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

import { UserAuthForm } from '@/components/auth/create-account-form';

import { buttonVariants } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Autenticação — Mises',
  description: 'Página de Autenticação',
};

export default async function Login() {
  let loggedIn = false;
  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) loggedIn = true;
  } catch (error) {
    console.log('Home', error);
  } finally {
    if (loggedIn) redirect('/dashboard', RedirectType.replace);
  }

  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <a
          href="/autenticacao/entrar"
          className={
            (buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8')
          }
        >
          Entrar na minha conta
        </a>

        <div className="relative hidden h-full flex-col bg-muted p-10 text-black dark:border-r lg:flex">
          <div className="absolute inset-0 bg-gray-200" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Mises
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Crie a sua conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Digite abaixo o seu e-mail e senha para criar a conta
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
