import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

import { UserNav } from '@/components/dashboard/header/user-nav';
import { MainNav } from '@/components/dashboard/header/main-nav';
import SubjectSwitcher from '@/components/dashboard/header/subject-switcher';
import { Search } from '@/components/dashboard/header/search';

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
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <SubjectSwitcher />
            <MainNav className="mx-6" />
            <div className='ml-auto flex items-center space-x-4'>
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
