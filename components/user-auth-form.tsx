'use client';

import * as React from 'react';

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function UserAuthForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1 pb-5">
            <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="sr-only" htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  placeholder="Nome"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="given-name"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label className="sr-only" htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  placeholder="Sobrenome"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="family-name"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
            </div>

              <Label className="sr-only" htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="Endereço de E-mail"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />

              <Label className="sr-only" htmlFor="password">Senha</Label>
              <Input
                id="password"
                placeholder="Senha"
                type="password"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
              />

              <Label className="sr-only" htmlFor="passwordConfirmation">Confirmar Senha</Label>
              <Input
                id="passwordConfirmation"
                placeholder="Confirmar Senha"
                type="password"
                autoComplete="new-password"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
          </div>
          <Button disabled={isLoading} color='black'>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading ? "Carregando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </div>
  );
}