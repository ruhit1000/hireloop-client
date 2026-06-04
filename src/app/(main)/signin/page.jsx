"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Spinner,
  TextField,
  toast,
  Toast,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
    });
    console.log("Sign in response:", { data, error });
    
    if (error) {
      toast.danger(error.message || "An error occurred during sign in");
    } else {
      toast.success("Signed in successfully!");
      redirect("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-[#161616] border border-neutral-800 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Toast.Provider />
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Welcome back
          </h1>
          <p className="text-neutral-400 text-sm">
            Sign in to your HireLoop account.
          </p>
        </div>

        {/* Form */}
        <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full flex flex-col gap-1"
          >
            <Label className="text-sm text-neutral-300">Email</Label>
            <Input placeholder="john@example.com" className="w-full" />
            <FieldError className="text-red-500 text-xs" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            className="w-full flex flex-col gap-1"
          >
            <Label className="text-sm text-neutral-300">Password</Label>
            <Input placeholder="••••••••" className="w-full" />
            <FieldError className="text-red-500 text-xs" />
          </TextField>

          <Button
            type="submit"
            className="w-full bg-[#6366f1] text-white font-medium py-3 rounded-lg mt-2 border-none"
          >
            {isLoading ? <Spinner color="current" /> : "Sign In"}
          </Button>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-4 mt-6 mb-4">
          <div className="flex-1 border-t border-neutral-800"></div>
          <p className="text-xs text-neutral-500 uppercase tracking-wider">
            Or
          </p>
          <div className="flex-1 border-t border-neutral-800"></div>
        </div>

        {/* Google Sign In */}
        <Button
          className="w-full bg-[#1A1A1A] text-white border border-neutral-800 hover:bg-[#262626]"
          variant="tertiary"
        >
          <Icon icon="devicon:google" width={20} />
          Sign in with Google
        </Button>

        {/* Footer */}
        <p className="text-center text-neutral-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-[#818cf8] hover:text-indigo-300 font-medium transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
