'use client';

import * as React from 'react';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Icons } from '@/components/icons';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  firstName: z
    .string({ required_error: 'O nome é um campo obrigatório' })
    .min(2, { message: 'Mínimo de 2 caracteres' }),
  lastName: z
    .string({ required_error: 'O sobrenome é um campo obrigatório' })
    .min(2, { message: 'Mínimo de 2 caracteres' }),
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
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      const supabase = createClientComponentClient();
      const { email, password, firstName, lastName } = values;

      const {
        error,
        data: { user },
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (user) {
        form.reset();
        router.refresh();
      }

      await supabase.from('users').insert([
        {
          id: user?.id,
          firstName,
          lastName,
          email,
        },
      ]);
    } catch (error) {
      console.log('CreateAccountForm', error);
    }
  }

  /* options: {
    emailRedirectTo: `${location.origin}/api/auth/callback`
  } */

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
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="firstName"
                            placeholder="Nome"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="given-name"
                            autoCorrect="off"
                          />
                        </FormControl>
                        <FormDescription>Aqui é o seu Nome</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobrenome</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="lastName"
                            placeholder="Sobrenome"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="family-name"
                            autoCorrect="off"
                          />
                        </FormControl>
                        <FormDescription>
                          Aqui é o seu Sobrenome
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        placeholder="Endereço de E-mail"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                      />
                    </FormControl>
                    <FormDescription>Aqui é o seu E-mail</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="password"
                        placeholder="Senha"
                        type="password"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormDescription>Aqui é a sua Senha</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmação da Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="passwordConfirmation"
                        placeholder="Confirmação da Senha"
                        type="password"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormDescription>
                      Aqui é a Confirmação da Senha
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            className={(buttonVariants({ variant: 'default' }), 'w-full')}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="animate-spin mr-2 w-4 h-4" />
            )}
            Cadastrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
