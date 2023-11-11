'use client';

import * as React from 'react';
import Link from 'next/link';

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
import { Checkbox } from '@/components/ui/checkbox';

import { toast } from '@/components/ui/use-toast';
import { ToastAction } from "@/components/ui/toast"

import { Icons } from '@/components/icons';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z
    .string({ required_error: 'O e-mail é um campo obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z
    .string({ required_error: 'A senha é um campo obrigatório' })
    .min(8, { message: 'Mínimo de 8 caracteres' }),
  checkbox: z.literal(true, {
    errorMap: () => ({ message: 'É necessário aceitar os termos' }),
  }),
});

export function UserAuthForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      checkbox: undefined,
    },
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      const supabase = createClientComponentClient();
      const { email, password } = values;
      const {
        error,
        data: { session },
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      form.reset();
      router.refresh();

      if (error) {
        console.log('LoginAccountForm:onSubmit', error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    } catch (error) {
      console.log('LoginAccountForm:onSubmit', error);
    }
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1 pb-5">
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

              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="checkbox"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Aceitar os termos e condições</FormLabel>
                        <FormDescription>
                          Você concorda com os nossos{' '}
                          <Link href="termos-de-servico">
                            Termos de Serviço
                          </Link>{' '}
                          e{' '}
                          <Link href="politica-de-privacidade">
                            Política de Privacidade
                          </Link>
                          .
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Button
            className={(buttonVariants({ variant: 'default' }), 'w-full')}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="animate-spin mr-2 w-4 h-4" />
            )}
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
