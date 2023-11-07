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

export function ResetPasswordForm() {
  return (
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
        <Button>Enviar link de recuperação</Button>
      </CardFooter>
    </Card>
  );
}
