"use client"

import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <li  className={'list-none py-3 p-8 bg-slate-800 rounded-xl'}>
      <button onClick={() => signIn()}>Sign In</button>
    </li>
  )
}
