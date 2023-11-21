import { Metadata } from 'next';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

import { UserAuthForm } from '@/components/auth/login-account-form';

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
    if (loggedIn) redirect('/dashboard', RedirectType.replace);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Link
          href="/autenticacao/cadastrar"
          className={
            (buttonVariants({ variant: 'default' }),
            'absolute right-4 top-4 md:right-8 md:top-8')
          }
        >
          Ainda não tenho uma conta
        </Link>

        <div className="relative h-full flex-col p-10 dark:border-r lg:flex justify-center items-center">
          <div className="relative flex items-center text-2xl font-medium">
            <Image
              src="/library-square.svg"
              alt="Logo"
              className="mr-2"
              height={24}
              width={24}
            />
            Mises
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Entre na sua conta
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
