"use client";
import Sidebar from "@/components/Sidebar";
import Chat from "../components/Chat";
import Messages from "@/components/Messages";
import { ThemeProvider } from "next-themes";
import React from "react";

const Allpages = () => {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Sidebar />
        <Messages />
        <Chat />
      </ThemeProvider>
    </>
  );
};

export default Allpages;
