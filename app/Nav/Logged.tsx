"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type User = {
  image: string;
  name: string;
};

export default function Logged({ image, name }: User) {
  return (
    <li className="flex gap-8 items-center">
      <Button
        className="bg-gray-700 text-white text-sm px-4 py-2 rounded-md "
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
      <Link href={"/dashboard"}>
        <Avatar className="w-10 h-10">
          <AvatarImage src={image} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </Link>
    </li>
  );
}
