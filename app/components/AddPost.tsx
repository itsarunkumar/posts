"use client";
import { use, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setisDisabled] = useState(false);
  let toastId: string | undefined;
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (title: string) => axios.post("/api/post/addpost", { title }),
    {
      onSuccess: () => {
        toast.success("Post added", { id: toastId });
        queryClient.invalidateQueries("posts");
        setTitle("");
        setisDisabled(false);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error("Error: " + error.response.data.error, { id: toastId });
        }
      },
    }
  );

  const submitPost = (e: React.FormEvent) => {
    e.preventDefault();
    toastId = toast.loading("Adding post...");
    // setisDisabled(true);
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="bg-slate-900 m-4 p-6 rounded-md">
      <textarea
        name={title}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        id="ask"
        placeholder="Ask?"
        className={
          "w-full text-gray-100 bg-slate-800 border-2 border-slate-700 rounded-md p-2"
        }
      ></textarea>
      <div className={"flex justify-between items-center"}>
        <p>{title.length} characters</p>
        <button
          disabled={isDisabled}
          className={"bg-slate-700 text-gray-100 p-2 rounded-md"}
          type="submit"
        >
          Submit Post
        </button>
      </div>
    </form>
  );
}
