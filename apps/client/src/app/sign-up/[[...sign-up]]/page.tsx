import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="mt-26 flex items-center justify-center">
      <SignUp />
    </div>
  );
}
