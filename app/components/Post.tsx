"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Comments from "./Comments";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

type Prop = {
  id: string;
  name: string;
  avatar: string;
  postTitle: string;
  comments: any;
  postContent: any;
  date: any;
};

export default function Post({
  id,
  name,
  avatar,
  postTitle,
  comments,
  postContent,
  date,
}: Prop) {
  const shortComment = comments.slice(0, 2);

  return (
    <div className="bg-slate-800 my-8 p-8 rounded-lg w-full ">
      <div className="flex items-center gap-2 ">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>

        <h4>{name}</h4>
      </div>

      <div className="w-full my-6 text-white flex  justify-start flex-col">
        <span className="font-bold text-2xl text-pink-400 my-4 flex justify-start hover:underline">
          <Link
            href={{
              pathname: `/post/${id}`,
            }}
          >
            {postTitle}
          </Link>
          <ExternalLink className="w-3 h-3" />
        </span>

        <Separator className="my-4" />

        <p className="break-all w-full overflow-hidden  text-ellipsis">
          {postContent}
        </p>

        <span className="text-sm text-gray-400 text-end">
          {formatDate(date)}
        </span>
      </div>

      <Comments comment={shortComment} />
    </div>
  );
}
