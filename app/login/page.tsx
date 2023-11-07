import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState, SyntheticEvent } from 'react';
import { LoginAccountForm } from '@/components/auth/login-account-form';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';

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
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <Tabs
        defaultValue="create-account"
        className="w-[400px] border rounded-md pb-4 shadow-2xl"
      >
        <TabsList className="flex justify-around items-center rounded-b-none h-14">
          <TabsTrigger
            value="login-account"
            className="transition-all delay-150"
          >
            Entrar
          </TabsTrigger>
          <TabsTrigger
            value="reset-password"
            className="transition-all delay-150"
          >
            Resetar minha senha
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login-account">
          <LoginAccountForm />
        </TabsContent>
        <TabsContent value="reset-password">
          <ResetPasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
