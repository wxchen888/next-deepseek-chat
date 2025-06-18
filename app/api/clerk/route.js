// Next.js API路由（ app/api/clerk/route.js ）
// 用于处理Clerk（身份认证服务）发送的用户事件Webhook，实现本地数据库与Clerk用户数据的同步

// 用于验证Webhook请求的签名，确保请求来自可信的Clerk服务
import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
// Next.js提供的API路由工具，用于获取请求头和返回响应
import { headers } from "next/headers";
import { NextRequest } from "next/server";

// 处理POST请求的异步函数，所有Clerk的用户事件（如用户创建、更新、删除）都会通过此接口发送
export async function POST(req) {
  // 使用环境变量中的 SIGNING_SECRET （Clerk提供的签名密钥）初始化Svix的 Webhook 实例
  const wh = new Webhook(process.env.SIGNING_SECRET);
  const headerPayload = await headers();
  //   从请求中提取 svix-id （事件ID）和 svix-signature （签名），用于验证请求合法性
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id"),
    "svix-timestamp": headerPayload.get("svix-timestamp"),
    "svix-signature": headerPayload.get("svix-signature"),
  };

  //   获取 请求的payload 通过 wh.verify 验证签名，确保请求确实由Clerk发送（防止伪造）。
  // 验证通过后，得到事件数据（ data ）和事件类型（ type ）
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const { data, type } = wh.verify(body, svixHeaders);

  //   组装成用户数据
  const userData = {
    _id: data.id,
    email: data.email_address[0].email_address,
    name: `${data.first_name} ${data.last_name}`,
    image: data.image_url,
  };

  //   同步用户数据到数据库
  await connectDB();

  switch (type) {
    case "user.created":
      await User.create(userData);
      break;
    case "user.updated":
      await User.findByIdAndUpdate(data.id, userData);
      break;
    case "user.deleted":
      await User.findByIdAndDelete(data.id);
      break;
    default:
      break;
  }

  //   返回响应 表示事件已成功接收（Clerk会根据响应状态判断是否需要重试）
  return NextRequest.json({ message: "Event received" });
}
