"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { ArrowRightCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export function LoginForm({ asModal }: { asModal?: boolean }) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  // 👇 Hide if user is already logged in

  const handleGoogleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    signIn("google", { callbackUrl });
  };

  const LoginContent = () => (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>you are already logged in </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="">
                {((status === "loading") || (session)) ?
                  <Link href="/" className="flex flex-col gap-4">
                    <Button
                      variant="outline"
                      className=""
                    >
                      <ExternalLink />
                      Home
                    </Button>
                  </Link>
                  :
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="mr-2 h-4 w-4"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>


                }
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className=" rounded-full px-3 py-1  relative z-10 bg-background  text-muted-foreground">
                  edge-x
                </span>
              </div>
            </div>
          </form>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary mt-3">
            By clicking continue, you agree to our{" "}
            <Link href="terms-of-service">Terms of Service</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!asModal) {
    return <LoginContent />;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          Login
          <ArrowRightCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 bg-transparent border-none">
        <LoginContent />
      </DialogContent>
    </Dialog>
  );
}
