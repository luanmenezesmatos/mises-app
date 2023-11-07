'use client';

import * as React from 'react';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@/components/ui/form';

const formSchema = z.object({
  firstName: z.string({ required_error: 'O nome é um campo obrigatório' }),
  lastName: z.string({ required_error: 'O sobrenome é um campo obrigatório' }),
  email: z
    .string({ required_error: 'O e-mail é um campo obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z
    .string({ required_error: 'A senha é um campo obrigatório' })
    .min(8, { message: 'Mínimo de 8 caracteres' }),
  passwordConfirmation: z
    .string({ required_error: 'A confirmação da senha é um campo obrigatório' })
    .min(8, { message: 'Mínimo de 8 caracteres' }),
});

export function UserAuthForm() {
  async function onSubmit(
    values: z.infer<typeof formSchema>,
  ) {
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1 pb-5">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="sr-only" htmlFor="firstName">
                      Nome
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Nome"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="given-name"
                      autoCorrect="off"
                    />
                  </div>
                  <div>
                    <Label className="sr-only" htmlFor="lastName">
                      Sobrenome
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Sobrenome"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="family-name"
                      autoCorrect="off"
                    />
                  </div>
                </div>

                <Label className="sr-only" htmlFor="email">
                  E-mail
                </Label>
                <Input
                  id="email"
                  placeholder="Endereço de E-mail"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />

                <Label className="sr-only" htmlFor="password">
                  Senha
                </Label>
                <Input
                  id="password"
                  placeholder="Senha"
                  type="password"
                  autoComplete="current-password"
                  autoCorrect="off"
                />

                <Label className="sr-only" htmlFor="passwordConfirmation">
                  Confirmar Senha
                </Label>
                <Input
                  id="passwordConfirmation"
                  placeholder="Confirmar Senha"
                  type="password"
                  autoComplete="new-password"
                  autoCorrect="off"
                />
              </div>
            </div>
            <Button>
              Cadastrar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
