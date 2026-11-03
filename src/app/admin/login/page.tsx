import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminConfigured, adminSignedIn } from '@/lib/admin-auth';
import { loginAdmin } from '../actions';

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await adminSignedIn()) redirect('/admin');
  const { error } = await searchParams;
  const configured = adminConfigured();
  return (
    <main className="grid min-h-dvh bg-panel lg:grid-cols-[1.25fr_1fr]">
      <div
        aria-hidden="true"
        className="relative hidden overflow-hidden bg-soft lg:block"
      >
        <Image
          src="/brand/admin-clinicians.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 56vw, 1px"
          className="object-cover object-[center_18%]"
        />
      </div>
      <div className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm">
          <Image
            src="/brand/new-life-health-care.png"
            alt="New Life Health Care"
            width={126}
            height={88}
            className="mb-8 h-auto"
          />
          <h1 className="text-3xl font-semibold tracking-tight">
            Admin sign in
          </h1>
          <p className="mt-3 text-sm text-muted">
            Sign in to manage the New Life Health Care website.
          </p>
          <form action={loginAdmin} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="admin-username"
                className="mb-2 block text-sm font-semibold"
              >
                Username
              </label>
              <Input
                id="admin-username"
                name="username"
                autoComplete="username"
                required
                maxLength={120}
                className="bg-canvas"
              />
            </div>
            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-semibold"
              >
                Password
              </label>
              <Input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                maxLength={256}
                className="bg-canvas"
              />
            </div>
            {!configured && (
              <p className="text-sm text-muted">
                Ask your website administrator to set up your login.
              </p>
            )}
            {configured && error && (
              <p role="alert" className="text-sm text-negative">
                Sign-in failed. Check your details or try again in a few
                minutes.
              </p>
            )}
            <Button
              type="submit"
              disabled={!configured}
              className="min-h-12 w-full"
            >
              Sign in
            </Button>
          </form>
          <Link
            href="/"
            className="mt-7 inline-block text-sm text-action underline underline-offset-4"
          >
            Back to website
          </Link>
        </div>
      </div>
    </main>
  );
}
