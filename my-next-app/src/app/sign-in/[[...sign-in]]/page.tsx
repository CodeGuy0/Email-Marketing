"use client";

import { SignIn } from "@clerk/nextjs";
import { div } from "framer-motion/client";

const Page = () => {
  return (
    <div className="w-full flex h-screen items-center justify-center">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
};
export default Page;
