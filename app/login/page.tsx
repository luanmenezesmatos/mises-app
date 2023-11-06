import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState, SyntheticEvent } from 'react';

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
      <Tabs defaultValue="create-account" className="w-[400px] border rounded-md pb-4 shadow-2xl">
        <TabsList className="grid w-full grid-cols-2 rounded-b-none">
          <TabsTrigger value="login-account">Entrar</TabsTrigger>
          <TabsTrigger value="reset-password">Resetar minha senha</TabsTrigger>
        </TabsList>
        <TabsContent value="login-account">
          <Card>
            <CardHeader>
              <CardTitle>Entrar na minha conta</CardTitle>
              <CardDescription>
                Entre com seu e-mail e senha para acessar sua conta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Insira o seu e-mail</Label>
                <Input id="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Insira a sua senha</Label>
                <Input id="password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Entrar</Button>
              <Button variant="outline" className="ml-2">Fazer o cadastro</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="reset-password">
          <Card>
            <CardHeader>
              <CardTitle>Resetar minha senha</CardTitle>
              <CardDescription>
                Insira o seu e-mail para receber um link de recuperação de senha.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Insira o seu e-mail</Label>
                <Input id="recover-email" type="email" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
