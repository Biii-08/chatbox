"use client";
import React, { useState, useEffect } from "react";
import { Member } from "../app/Interfaces";

interface ChatProps {
  member: Member;
}

const Chat: React.FC<ChatProps> = ({ member }) => {
  const [inputValue, setInputValue] = useState("");
  const [isButtonBlue, setIsButtonBlue] = useState(false);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsButtonBlue(value.trim().length > 0);
  };

  useEffect(() => {
    if (inputValue.trim().length > 0) {
      const sendButton = document.getElementById("sendButton");
      if (sendButton) {
        sendButton.classList.add("bg-blue-500");
      }
    } else {
      const sendButton = document.getElementById("sendButton");
      if (sendButton) {
        sendButton.classList.remove("bg-blue-500");
      }
    }
  }, [inputValue]);
  const handleButtonClick = () => {
    logInputValue();
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      logInputValue();
    }
  };

  const logInputValue = () => {
    if (inputValue.trim().length > 0) {
      console.log("Input value:", inputValue);
      setInputValue("");
    }
  };
  const handleFileButtonClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";

    fileInput.addEventListener("change", (event) => {
      const inputElement = event.target as HTMLInputElement;
      const selectedFile = inputElement?.files?.[0];
      if (selectedFile) {
        console.log("Selected file:", selectedFile);
      }
    });

    fileInput.click();
  };
  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-700 [#191E29] px-4 py-6">
      <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow dark:shadow-slate-500">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
          {member.avatar}
        </div>
        <div className="flex flex-col ml-3">
          <div className="font-semibold text-sm text-black dark:text-white">
            {member.username}
          </div>
          <div className="text-xs text-gray-500 dark:text-slate-300">
            {member.isActive ? (
              <div className="flex flex-row gap-2">
                <span className="text-gray text-xs">Active</span>
                <span className="flex items-center mt-1 justify-center h-2 w-2 ml-1 bg-green-500 text-white text-xs rounded-full"></span>
              </div>
            ) : (
              <span className={` text-gray text-xs `}>
                {formatTimeDifference(member.last_online)}
              </span>
            )}
          </div>
        </div>
        <div className="ml-auto">
          <ul className="flex flex-row items-center space-x-2">
            <li>
              <a
                href="#"
                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 dark:bg-slate-600 dark:text-slate-200 rounded-full"
              >
                <span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    stroke="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center bg-gray-100 dark:bg-slate-600 dark:text-slate-200 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full"
              >
                <span>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    stroke="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center bg-gray-100 dark:bg-slate-600 dark:text-slate-200 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full"
              >
                <span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    ></path>
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col flex-grow mt-4 ml-2 overflow-y-auto">
        {member.messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-row items-center my-2 ${
              message.isUser ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`flex items-center justify-center mr-2 h-10 w-10 rounded-full bg-${
                message.isAdmin ? "purple" : "pink"
              }-500 text-pink-300 font-bold flex-shrink-0`}
            >
              {message.isUser ? member.avatar : ""}
            </div>
            <div className="relative text-sm bg-white py-2 max-w-[500px] px-4 shadow rounded-xl">
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center w-full border dark:border-slate-500 rounded-3xl h-12 px-2">
          <button className="flex items-center justify-center h-10 w-10 text-gray-400 ml-1">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              ></path>
            </svg>
          </button>
          <div className="w-full">
            <input
              type="text"
              className="border border-transparent dark:text-white w-full dark:bg-slate-700 focus:outline-none text-sm h-10 flex items-center"
              placeholder="Type your message...."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
            />
          </div>
          <div className="flex flex-row">
            <button
              className="flex items-center justify-center h-10 w-8 text-gray-400"
              onClick={handleFileButtonClick}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </button>
            <button className="flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="ml-6">
          <button
            type="button"
            className={`flex items-center justify-center h-10 w-10 rounded-full text-indigo-800 text-white ${
              isButtonBlue ? "bg-blue-500" : "bg-gray-200"
            }`}
            id="sendButton"
            onClick={handleButtonClick}
          >
            <svg
              className="w-5 h-5 transform rotate-90 -mr-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
