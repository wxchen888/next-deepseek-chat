"use client";
import { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Sidebar from "@/components/Sidebar";
import PromptBox from "@/components/PromptBox";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex h-screen">
        {/* sidebar */}
        <Sidebar expand={expand} setExpand={setExpand} />

        <div
          className="relative flex-1 flex flex-col items-center justify-center 
            px-4 pb-8 bg-[#292a2d] text-white"
        >
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              onClick={() => (expand ? setExpand(false) : setExpand(true))}
              className="rotate-180"
              alt=""
              src={assets.menu_icon}
            ></Image>
            <Image className="opacity-70" alt="" src={assets.chat_icon}></Image>
          </div>

          {/* 聊天列表 */}
          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image
                  style={{ width: "auto", height: "auto" }}
                  className="h-16"
                  src={assets.logo_icon}
                  alt=""
                ></Image>
                <p className="text-2xl font-medium">Hi，I am Deepseek Chat</p>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                How can I help you today?
              </p>
            </>
          ) : (
            <div>历史记录</div>
          )}

          {/* prompt box */}
          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />
          {/* 底部声明 */}
          <p className="text-xs absolute bottom-1 text-gray-500">
            AI-generated, for reference only
          </p>
        </div>
      </div>
    </div>
  );
}
