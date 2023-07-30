"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "next-themes";
import { groupContainerDummy } from "@/constants";
import { Member } from "../app/Interfaces";
import Chat from "@/components/Chat";
import Messages from "@/components/Messages";

const Allpages = () => {
  const [currentPerson, setCurrentPerson] = useState<Member | null>(null);

  const handlePersonClick = (person: Member) => {
    setCurrentPerson(person);
  };

  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Sidebar />

        <Messages
          groups={groupContainerDummy.groups}
          onPersonClick={handlePersonClick}
        />

        {currentPerson ? (
          <Chat member={currentPerson} />
        ) : (
          <div className="flex bg-white w-full items-center justify-center h-full text-gray-500 dark:text-gray-300">
            Select person to start chatting
          </div>
        )}
      </ThemeProvider>
    </>
  );
};

export default Allpages;
