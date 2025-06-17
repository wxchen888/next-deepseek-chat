import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import ChatLabel from "./ChatLabel";

// --spacing为0.25rem
export default function Sidebar({ expand, setExpand }) {
  const { openSignIn } = useClerk();
  const { user } = useAppContext();
  const [openMenu, setOpenMenu] = useState({ id: 0, open: false });

  return (
    // media 768px时, expand展开时为w-64(16rem)即256px,
    // expand关闭时, @media查询为>768px时, width为w-20(5rem)即80px, <768px的移动端时width为w-0即为0px并设置内容hidden
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all
    z-50 max-md:absolute max-md:h-screen ${
      expand ? "p-4 w-64" : "md:w-20 w-0 max-md:overflow-hidden"
    }`}
    >
      {/* 顶部区域内容 */}
      <div>
        <div
          className={`flex ${
            expand ? "flex-row gap-10" : "flex-col items-center gap-8"
          }`}
        >
          <Image
            className={expand ? "w-36" : "w-10"}
            src={expand ? assets.logo_text : assets.logo_icon}
            alt=""
          ></Image>

          <div
            className="group relative flex items-center justify-center
            hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square
            rounded-lg cursor-pointer"
            onClick={() => (expand ? setExpand(false) : setExpand(true))}
          >
            <Image className="md:hidden" src={assets.menu_icon} alt=""></Image>
            <Image
              className="md:block hidden w-7"
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              alt=""
            ></Image>
            {/* hover 文字及背景 三角 */}
            <div
              className={`absolute w-max ${
                expand ? "left-1/2 -translate-x-1/2 top-12" : "-top-12 left-0"
              }
                opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg
                shadow-lg pointer-events-none`}
            >
              <span>{expand ? "Close siderbar" : "Open sidebar"}</span>
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand
                    ? "left-1/2 -translate-x-1/2 -top-1.5"
                    : "left-4 -bottom-1.5"
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* 新对话按钮 */}
        <button
          className={`mt-8 flex items-center justify-center cursor-pointer
          ${
            expand
              ? "bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max"
              : "group relative h-9 w-9 mx-auto hover:bg-gray-500/30"
          } rounded-lg`}
        >
          <Image
            className={expand ? "w-6" : "w-7"}
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt=""
          ></Image>
          <div
            className="absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 
          transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none"
          >
            <span>New Chat</span>
            <div className="w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5"></div>
          </div>
          <p
            className={`text-white text-sm font-medium ${
              expand ? "block" : "hidden"
            }`}
          >
            New Chat
          </p>
        </button>
        {/* 对话历史列表 */}
        <div
          className={`mt-8 text-white/25 text-sm ${
            expand ? "block" : "hidden"
          }`}
        >
          <p className="my-1">Recents</p>
          <ChatLabel openMenu={openMenu} setOpenMenu={setOpenMenu}></ChatLabel>
        </div>
      </div>

      {/* 底部区域内容 */}
      <div>
        {/* 二维码 */}
        <div
          className={`flex items-center cursor-pointer group relative
          ${
            expand
              ? "gap-1 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10"
              : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg"
          }`}
        >
          <Image
            className={expand ? "w-5" : "w-6.5 mx-auto"}
            src={expand ? assets.phone_icon : assets.phone_icon_dull}
            alt=""
          ></Image>
          <div
            className={`absolute -top-60 pb-8 ${
              expand ? "" : "-right-40"
            } opacity-0 
              group-hover:opacity-100 hidden group-hover:block transition`}
          >
            <div className="relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg">
              <Image className="w-44" src={assets.qrcode} alt=""></Image>
              <p>Scan to get DeepSeek App</p>
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand ? "right-1/2 translate-x-1/2" : "left-4"
                } -bottom-1.5`}
              />
            </div>
          </div>
          {expand ? (
            <>
              <span>Get App</span>
              <Image src={assets.new_icon} alt=""></Image>
            </>
          ) : null}
        </div>
        {/* 个人设置 */}
        <div
          onClick={() => (user ? null : openSignIn())}
          className={`flex items-center ${
            expand ? "hover:bg-white/10 rounded-lg" : "justify-center w-full"
          }
          gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer`}
        >
          {user ? (
            <UserButton></UserButton>
          ) : (
            <Image className="w-7" src={assets.profile_icon} alt=""></Image>
          )}
          <span className={`${expand ? "block" : "hidden"}`}>My Profile</span>
        </div>
      </div>
    </div>
  );
}
