"use client";

import { SignIn, SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="w-full flex h-screen items-center justify-center">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
};
export default Page;
