"use client"; //客户端组件 用于Next.js的App Router架构，确保代码在客户端（浏览器）渲染
import { useUser } from "@clerk/nextjs"; //来自Clerk（身份认证库）的钩子，用于获取当前登录用户信息。
import { createContext, useContext } from "react"; //React的上下文API，用于创建和消费上下文。

export const AppContext = createContext(); //初始值未显式设置，默认值为 undefined
// 封装 useContext(AppContext) 为自定义钩子 useAppContext
// 方便组件中获取上下文值（避免直接使用 useContext ，提高可维护性）
export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const { user } = useUser();
  const value = {
    user,
  };
  //所有被 AppContextProvider 包裹的子组件，均可通过 useAppContext() 访问到 user 信息
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
