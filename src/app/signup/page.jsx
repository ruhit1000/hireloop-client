"use client";

import React from "react";
import Link from "next/link";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { authClient } from "@/lib/aith-client";

const SignUpPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const UserData = Object.fromEntries(formData.entries());
    
    const {data, error} = await authClient.signUp.email({
        email: UserData.email,
        password: UserData.password,
        name: UserData.name,
        imageURL: UserData.imageURL || null,
    })

    
    
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-[#161616] border border-neutral-800 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Create an account
          </h1>
          <p className="text-neutral-400 text-sm">
            Join HireLoop and find your next role.
          </p>
        </div>

        {/* Form */}
        <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="name"
            type="text"
            className="w-full flex flex-col gap-1"
          >
            <Label className="text-sm text-neutral-300">Full Name</Label>
            <Input placeholder="John Doe" className="w-full" />
            <FieldError className="text-red-500 text-xs" />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full flex flex-col gap-1"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm text-neutral-300">Email</Label>
            <Input placeholder="john@example.com" className="w-full" />
            <FieldError className="text-red-500 text-xs" />
          </TextField>

          <TextField
            name="imageURL"
            type="url"
            className="w-full flex flex-col gap-1"
          >
            <Label className="text-sm text-neutral-300">
              Profile Image URL (Optional)
            </Label>
            <Input
              placeholder="https://example.com/avatar.jpg"
              className="w-full"
            />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="w-full flex flex-col gap-1"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              return null;
            }}
          >
            <Label className="text-sm text-neutral-300">Password</Label>
            <Input placeholder="••••••••" className="w-full" />
            <FieldError className="text-red-500 text-xs" />
          </TextField>

          <Button
            type="submit"
            className="w-full bg-[#6366f1] text-white font-medium py-3 rounded-lg mt-2 border-none"
          >
            Create Account
          </Button>
        </Form>

        {/* Footer */}
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
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-[#818cf8] hover:text-indigo-300 font-medium transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
