"use client";

import React, { useState, useEffect } from "react";

import { groupContainerDummy } from "@/constants";
import { GroupContainerProps, Member, Group } from "../app/Interfaces";
import { formatDistanceToNow } from "date-fns";

interface GroupContainerPropsWithClick extends GroupContainerProps {
  onPersonClick: (person: Member) => void;
}

const Messages: React.FC<GroupContainerPropsWithClick> = ({
  onPersonClick,
  team,
}) => {
  const [selectedPerson, setSelectedPerson] = useState<Member | null>(null);
  const [activeMember, setActiveMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const teamsGroup: Group = {
    type: "Teams",
    members: groupContainerDummy.teams,
  };

  const personalGroup: Group = {
    type: "Personal",
    members: groupContainerDummy.personal,
  };

  const groups: Group[] = [teamsGroup, personalGroup];

  const formatTimeDifference = (dateString: string) => {
    const currentDate = new Date();
    const messageDate = new Date(dateString);
    const timeDifferenceInSeconds =
      (currentDate.getTime() - messageDate.getTime()) / 1000;

    if (timeDifferenceInSeconds < 60) {
      return `${Math.floor(timeDifferenceInSeconds)}s ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      return `${Math.floor(timeDifferenceInSeconds / 60)}m ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      return `${Math.floor(timeDifferenceInSeconds / 3600)}h ago`;
    } else {
      return "";
    }
  };

  const handleMemberClick = (member: Member) => {
    onPersonClick(member);
  };

  useEffect(() => {
    const filtered = groups.flatMap((group) =>
      group.members.filter((member) =>
        member.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredMembers(filtered);
  }, [groups, searchQuery]);

  useEffect(() => {}, [selectedPerson]);

  return (
    <div className="flex flex-row w-96 h-full flex-shrink-0 relative bg-gray-100 dark:bg-[#637685] [#0B0E14] dark:text-white p-4">
      <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <div className="text-xl font-semibold ">Messages</div>
            {/* <div className="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium">
              {new_messages}
            </div> */}
          </div>
          <div className="ml-auto">
            <div className="relative">
              <input
                type="text"
                className="h-7 w-28 pl-8 pr-4 bg-gray-200 text-gray-500 rounded-full"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-2 flex items-center justify-center">
                <svg
                  className="w-4 h-4 stroke-current text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <ul className="flex flex-row items-center justify-between">
            <li>
              <a
                href="#"
                className="flex items-center pb-3 text-xs font-semibold relative text-indigo-800 dark:text-indigo-900"
              >
                <span>All Conversations</span>
                <span className="absolute left-0 bottom-0 h-1 w-6 bg-indigo-800 dark:text-indigo-600 rounded-full"></span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center pb-3 text-xs text-gray-700 dark:text-gray-300 font-semibold"
              >
                <span>Archived</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center pb-3 text-xs text-gray-700 dark:text-gray-300 font-semibold"
              >
                <span>Starred</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          {groups.map((group) => (
            <div key={group.type} className="group-container mt-6">
              <div className="text-xs text-gray-400 mt-8 dark:text-slate-300 font-semibold uppercase">
                Groups
              </div>
              <div
                className="group-content mt-3"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => handleMemberClick(member)}
                  >
                    <div
                      key={member.id}
                      onClick={() => handleMemberClick(member)}
                      className="cursor-pointer"
                    >
                      <div className="flex flex-row items-center p-4 relative">
                        <div className="absolute text-xs text-gray-500 dark:text-slate-300 right-0 top-0 mr-4 mt-3">
                          {member.messages.length > 0 &&
                            formatTimeDifference(
                              member.messages[member.messages.length - 1]
                                .createdAt || ""
                            )}
                        </div>

                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                          {member.avatar}
                        </div>
                        <div className="flex flex-col flex-grow ml-3">
                          <div className="text-sm flex gap-2 flex-row font-medium">
                            {member.username}
                            {member.isActive && (
                              <span className="justify-center h-2 mt-1 w-2 bg-green-500 text-white text-xs rounded-full"></span>
                            )}
                          </div>
                          <div className="flex flex-row">
                            <div className="text-xs truncate w-40">
                              {member.messages.length > 0 ? (
                                <span>
                                  {
                                    member.messages[member.messages.length - 1]
                                      .content
                                  }
                                </span>
                              ) : (
                                ""
                              )}
                            </div>

                            {member.messages.length > 0 && (
                              <div className="flex-shrink-0 absolute right-0 self-end mb-1">
                                <span className="flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
                                  {member.new_messages}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-2 self-end mb-1"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="flex items-center bottom-2 absolute right-2 justify-center shadow-sm h-10 w-10 bg-red-500 text-white rounded-full">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Messages;
