"use client";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { MessageSquareDashed, ChevronsRight } from "lucide-react";

export default function Comments(props: { comment: any[] }) {
  return (
    <div className="bg-slate-800 w-full">
      <span className=" font-bold py-5 text-purple-600 flex gap-4  ">
        <MessageSquareDashed /> comments:
      </span>
      {props.comment?.map((comment: any) => (
        <>
          <div className="w-full text-slate-200 flex justify-start items-start gap-4 flex-col">
            <p className="w-full flex">
              <ChevronsRight /> <p>{comment?.content}</p>
            </p>
            <span className="text-end w-full flex flex-col text-[12px] text-gray-400">
              <span>@{comment?.user.name}</span>
              <span>{formatDate(comment?.updatedAt)}</span>
            </span>
          </div>
          <Separator className="my-2 h-[1px] bg-slate-700 opacity-25 " />
        </>
      ))}

      {props.comment?.length === 0 && (
        <div className="w-full text-slate-200 flex justify-start items-start gap-4 flex-col">
          <p className="w-full flex">
            <ChevronsRight /> <p>No comments yet</p>
          </p>
        </div>
      )}
    </div>
  );
}
