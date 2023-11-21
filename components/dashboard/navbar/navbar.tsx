import { UserNav } from '@/components/dashboard/navbar/user-nav';
import { MainNav } from '@/components/dashboard/navbar/main-nav';
import SubjectSwitcher from '@/components/dashboard/navbar/subject-switcher';
import { Search } from '@/components/dashboard/navbar/search';

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <SubjectSwitcher />
        <div className="ml-auto flex items-center space-x-4">
          <MainNav className="mx-6" />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
  );
}
