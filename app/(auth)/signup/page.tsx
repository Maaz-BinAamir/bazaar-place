import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="username" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <div className="self-start">
            <Link
              href="/login"
              className="text-sm underline-offset-4 hover:underline"
            >
              Already have an account?
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
