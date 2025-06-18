//是MongoDB的Node.js ODM（对象文档映射）库，用于简化MongoDB的操作（如定义模式、查询数据等
import mongoose from "mongoose";
// Node.js的 global 对象跨模块共享缓存（避免热重载时重复连接）
// - conn ：存储已建立的数据库连接（初始为 null ）
// - promise ：存储正在进行的连接Promise（初始为 null ）
let cached = global.mongoose || { conn: null, promise: null };

// 确保在Node.js应用中（尤其是支持热重载的开发环境）只建立一次MongoDB连接，避免因重复连接导致的性能问题和连接数耗尽
export default async function connectDB() {
  if (cached.conn) return cached.conn;
  //   单例连接
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URL).then((cb) => cb);
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }

  return cached.conn;
}
