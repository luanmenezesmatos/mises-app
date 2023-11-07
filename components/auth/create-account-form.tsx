'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'O e-mail é obrigatório',
    })
    .email({
      message: 'O e-mail deve ser válido',
    }),
  password: z
    .string({
      required_error: 'A senha é obrigatória',
    })
    .min(8, {
      message: 'A senha deve ter no mínimo 8 caracteres',
    }),
});

export default function CreateAccountForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

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
    
    {/* <div className="flex flex-col justify-center items-center space-y-2">
      <span className="text-lg">You will love it.</span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input
                  {...field}
                  placeholder="Digite seu e-mail"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel htmlFor="password">Senha</FormLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="Digite a sua senha"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Criar conta</Button>
        </form>
      </Form>
    </div> */}
  );
}
