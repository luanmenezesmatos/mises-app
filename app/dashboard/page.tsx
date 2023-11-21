import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

import { CalendarDateRangePicker } from '@/components/dashboard/main/date-range-picker';

import { DownloadIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VisaoGeral } from '@/components/dashboard/tabs/visao-geral';
import { Navbar } from '@/components/dashboard/navbar/navbar';
import { MobileNav } from '@/components/dashboard/navbar/mobile-nav';

export default async function Dashboard() {
  let loggedIn = false;
  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) loggedIn = true;
  } catch (error) {
    console.log('Dashboard', error);
  } finally {
    if (!loggedIn) redirect('/autenticacao/entrar', RedirectType.replace);
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <Navbar />

        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>
                Fazer o Download
                <DownloadIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <Tabs defaultValue="visaogeral" className="space-y-4">
            <TabsList>
              <TabsTrigger value="visaogeral">Visão Geral</TabsTrigger>
              <TabsTrigger value="meudesempenho">Meu Desempenho</TabsTrigger>
              <TabsTrigger value="meusplanos">Meus Planos</TabsTrigger>
            </TabsList>
            <VisaoGeral />
          </Tabs>
        </div>
      </div>

      <div className="flex flex-col md:hidden">
        <MobileNav />

        {/* <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>
                Fazer o Download
                <DownloadIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <Tabs defaultValue="visaogeral" className="space-y-4">
            <TabsList>
              <TabsTrigger value="visaogeral">Visão Geral</TabsTrigger>
              <TabsTrigger value="meudesempenho">Meu Desempenho</TabsTrigger>
              <TabsTrigger value="meusplanos">Meus Planos</TabsTrigger>
            </TabsList>
            <VisaoGeral />
          </Tabs>
        </div> */}
      </div>
    </>
  );
}
