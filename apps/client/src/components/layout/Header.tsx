import { Show, SignInButton } from '@clerk/nextjs';
import { Bell, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ShoppingCartIcon from '../features/cart/ShoppingCartIcon';
import ProfileButton from '../features/profile/ProfileButton';
import SearchBar from '../features/search/SearchBar';

const Header = () => {
  return (
    <header className="bg-primary fixed top-0 right-0 left-0 z-50">
      <div className="container-main flex-center h-[var(--header-height)]">
        <Link href={'/'}>
          <Image
            src="/logo.png"
            alt="echo trend"
            className="max-w-16 sm:max-w-20 md:max-w-32"
            width={120}
            height={41}
          />
        </Link>

        <div className="flex items-center gap-4 text-white">
          <SearchBar />
          <Link href={'/'}>
            <Home className="size-6" />
          </Link>
          <Bell className="size-6" />
          <ShoppingCartIcon />
          <Show when="signed-out">
            <SignInButton />
          </Show>
          <Show when="signed-in">
            <ProfileButton />
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Header;
