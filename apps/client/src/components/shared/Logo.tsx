import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href={'/'}>
      <Image
        src="/logo.png"
        alt="echo trend"
        className="max-w-16 sm:max-w-20 md:max-w-32"
        width={120}
        height={41}
      />
    </Link>
  );
};

export default Logo;
