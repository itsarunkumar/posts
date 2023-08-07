"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BadgePlus, PencilLine, MessageSquarePlus } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDisabled, setisDisabled] = useState(false);
  let toastId: string | undefined;
  const queryClient = useQueryClient();

  const { mutate } = useMutation<
    void,
    AxiosError,
    { title: string; content: string }
  >(
    async (newPostdata) => {
      return axios.post("/api/post/addpost", newPostdata);
    },
    {
      onSuccess: () => {
        toast.success("Post added", { id: toastId });
        queryClient.invalidateQueries(["posts"]);
        setTitle("");
        setContent("");
        setisDisabled(false);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error("Error: ", { id: toastId });
        }
      },
    }
  );

  const submitPost = (e: React.FormEvent) => {
    e.preventDefault();
    toastId = toast.loading("Adding post...");
    // setisDisabled(true);
    mutate({ title, content });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="bg-slate-700 outline-none border-none gap-2"
        >
          <BadgePlus /> &nbsp;Add post
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"top"}
        className="bg-back-black h-4/6 w-full flex justify-center items-center flex-col outline-none border-none"
      >
        <SheetHeader>
          <SheetTitle className={"text-indigo-600 text-2xl"}>
            Add Post
          </SheetTitle>
          <SheetDescription className="text-slate-100">
            Write a post and share. Click post when you're done.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={submitPost}
          className="bg-slate-900 m-4 p-6 rounded-md w-5/6 h-full flex justify-center items-center flex-col gap-8 "
        >
          <Input
            name={title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className={
              "w-full text-gray-100 bg-slate-800 border-2 text-xl border-slate-700 rounded-md p-2"
            }
          />

          <Textarea
            name={content}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            id="ask"
            placeholder="Wrtie a post................!"
            className={
              "w-full h-4/6 text-gray-100 bg-slate-800 border-2 text-xl border-slate-700 rounded-md p-2"
            }
          />
          <div className={"flex justify-between items-center mt-6 w-full"}>
            <p className="flex gap-3">
              <PencilLine /> <span>{content.length} characters</span>
            </p>

            <SheetClose asChild>
              <Button
                disabled={isDisabled}
                className={
                  "bg-slate-700 text-gray-100 p-2 rounded-md px-8 py-4 gap-4 hover:bg-slate-500"
                }
                type="submit"
              >
                <MessageSquarePlus /> Post
              </Button>
            </SheetClose>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
