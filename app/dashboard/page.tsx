import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

import { UserNav } from '@/components/dashboard/header/main-nav';

export default async function userApp() {
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
    <UserNav />
  )
}