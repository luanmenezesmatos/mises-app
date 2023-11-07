'use client';

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
import { User2 } from 'lucide-react';
import Link from 'next/link';

export function LoginAccountForm() {
  return (
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
      <CardFooter
        className="flex flex-row justify-center items-center"
      >
        <Button>
          Entrar
          <User2 size={18} className="ml-2 mr-1" />
        </Button>
        <Link href="/register">
          <Button variant="outline" className="ml-4">
            Quero criar a minha conta!
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
