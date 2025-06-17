import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

// 历史对话列表
export default function ChatLabel({ openMenu, setOpenMenu }) {
  return (
    <div
      className="relative flex items-center justify-between p-2 text-white/80
        hover:bg-white/10 rounded-lg text-sm group cursor-pointer"
    >
      <p className="group-hover:max-w-5/6 truncate">Chat Name Here</p>
      <div>
        {/* hover时显示省略号三个点 或者选中时也显示出来 */}
        <Image
          className={`w-4 ${openMenu.open ? "" : "hidden"} group-hover:block`}
          src={assets.three_dots}
          alt=""
        ></Image>
        {/* 选中时才显示操作面板 */}
        <div
          className={`absolute -right-36 top-6 bg-gray-700 rounded-xl w-max p-2 ${
            openMenu.open ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
            <Image className="w-4" src={assets.pencil_icon} alt=""></Image>
            <p>Rename</p>
          </div>
          <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
            <Image className="w-4" src={assets.delete_icon} alt=""></Image>
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
}
