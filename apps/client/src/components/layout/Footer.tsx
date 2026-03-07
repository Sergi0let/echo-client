import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container-main flex min-h-72 flex-col items-center gap-6 py-10 md:flex-row md:items-stretch md:justify-between">
        <div className="flex flex-col items-center justify-between gap-4 md:items-start">
          <Link href={'/'}>
            <Image
              src="/logo.png"
              alt="echo trend"
              className="max-w-16 sm:max-w-20 md:max-w-32"
              width={120}
              height={41}
            />
          </Link>

          <div className="text-center md:text-left">
            <p className="text-sm">&copy; {`${new Date().getFullYear()}`}</p>
            <p className="text-sm">Є Що. Усі права захищені.</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 text-sm md:items-start">
          <p className="text-base font-medium">Посилання</p>
          <Link href={'/'}>Додому</Link>
          <Link href={'/'}>Контакти</Link>
          <Link href={'/'}>Оплата та доставка </Link>
          <Link href={'/'}>Обмін та повернення</Link>
          <Link href={'/'}>Політика конфіденційності</Link>
        </div>
        <div className="flex flex-col items-center gap-4 text-sm md:items-start">
          <p className="text-base font-medium">Посилання</p>
          <Link href={'/'}>Додому</Link>
          <Link href={'/'}>Контакти</Link>
          <Link href={'/'}>Оплата та доставка </Link>
          <Link href={'/'}>Обмін та повернення</Link>
          <Link href={'/'}>Політика конфіденційності</Link>
        </div>
        <div className="flex flex-col items-center gap-4 text-sm md:items-start">
          <p className="text-base font-medium">Посилання</p>
          <Link href={'/'}>Додому</Link>
          <Link href={'/'}>Контакти</Link>
          <Link href={'/'}>Оплата та доставка </Link>
          <Link href={'/'}>Обмін та повернення</Link>
          <Link href={'/'}>Політика конфіденційності</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
