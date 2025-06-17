import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

export default function PromptBox({ isLoading, setIsLoading }) {
  const [prompt, setPrompt] = useState("");

  return (
    <form
      className={`w-full bg-[#404045] p-4 rounded-3xl mt-4 transition-all ${
        false ? "max-w-3xl" : "max-w-2xl"
      }`}
    >
      <textarea
        id="prompt"
        name="prompt"
        className="outline-none w-full resize-none break-words bg-transparent"
        rows={2}
        placeholder="Message DeepSeek"
        required
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />

      <div className="flex items-center justify-between text-sm">
        {/* 左侧按钮 */}
        <div className="flex items-center gap-2">
          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gra-500/20 transition">
            <Image className="h-5" src={assets.deepthink_icon} alt=""></Image>
            <span>DeepThink（R1）</span>
          </p>
          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gra-500/20 transition">
            <Image className="h-5" src={assets.search_icon} alt=""></Image>
            <span>Search</span>
          </p>
        </div>
        {/* 右侧 */}
        <div className="flex items-center gap-2">
          <Image
            className="w-4 cursor-pointer"
            src={assets.pin_icon}
            alt=""
          ></Image>
          <button
            className={`rounded-full p-2 cursor-pointer ${
              prompt ? "bg-primary" : "bg-[#71717a"
            }`}
          >
            <Image
              className="w-3.5 aspect-square"
              style={{
                width: "auto",
                height: "auto",
              }}
              src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
              alt=""
            ></Image>
          </button>
        </div>
      </div>
    </form>
  );
}
