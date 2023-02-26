import "./globals.css";
import Nav from "./Nav/Nav";
import QueryWrapper from "./Nav/QueryWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={"mx-4 md:mx-48 xl:mx-96  bg-back-black text-white"}>
        <QueryWrapper>
          <Nav />

          {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
