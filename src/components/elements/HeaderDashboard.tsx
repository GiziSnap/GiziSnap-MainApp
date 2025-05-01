import Link from 'next/link';
import { Heading } from '../ui/heading';
import { ThemeToggle } from '../action/ThemeToggle';
import { SidebarTrigger } from '../ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Tambahkan type untuk props
type HeaderDashboardProps = {
  brandName?: string;
  userName?: string;
  userAvatar?: string;
  userAvatarFallback?: string;
};

export const HeaderDashboard = ({
  brandName = 'GiziSnap',
  userName = 'User',
  userAvatar = 'https://github.com/shadcn.png',
  userAvatarFallback = 'CN',
}: HeaderDashboardProps) => {
  return (
    <header className="flex w-full items-center justify-between border-b px-5 py-3">
      <div className="flex items-center gap-5">
        <SidebarTrigger />
        <Link href={'/'}>
          <Heading size={'h4'}>{brandName}</Heading>
        </Link>
      </div>
      <div className="flex items-center gap-5">
        {/* Theme toggle hanya di desktop */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            className="cursor-pointer outline-none focus:outline-none"
            aria-label="User Menu"
          >
            <div className="flex items-center gap-2">
              <span className="hidden text-sm md:block">Hello, {userName}</span>
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={`@${userName}`} />
                <AvatarFallback>{userAvatarFallback}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem className="md:hidden">
              <ThemeToggle className="w-full" />
            </DropdownMenuItem>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/billing" className="w-full">
                Billing
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/team" className="w-full">
                Team
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href="/subscription" className="w-full">
                Subscription
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <button
                className="text-destructive w-full text-left"
                // Tambahkan fungsi logout
                // onClick={handleLogout}
              >
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
