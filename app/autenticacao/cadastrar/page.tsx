import { Metadata } from 'next';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';
import { UserAuthForm } from '@/components/user-register-form';

import Link from 'next/link';
import Image from 'next/image';

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
    if (loggedIn) redirect('/user-app', RedirectType.replace);
  }

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/undraw_secure_login_pdn4.svg"
          width={1280}
          height={843}
          alt="Autenticação"
          className="block dark:hidden"
        />
        <Image
          src="/undraw_secure_login_pdn4.svg"
          width={1280}
          height={843}
          alt="Autenticação"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/autenticacao/entrar"
          className={
            (buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8')
          }
        >
          Entrar na minha conta
        </Link>
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
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
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

            <p className="px-8 text-center text-sm text-muted-foreground">
              Ao clicar em <b>"Criar a minha conta"</b>, você concorda com os{' '}
              <Link
                href="/diretrizes/termos-de-uso"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de Uso
              </Link>{' '}
              e a{' '}
              <Link
                href="/diretrizes/politica-de-privacidade"
                className="underline underline-offset-4 hover:text-primary"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
