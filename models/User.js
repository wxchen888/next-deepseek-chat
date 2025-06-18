import mongoose from "mongoose";

// 定义用户数据模式 Schema(结构)
const UserSchema = new mongoose.Schema(
  // 字段定义
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
  },
  //   会自动为文档添加两个时间戳字段：
  // - createdAt ：文档创建时间（自动生成）。
  // - updatedAt ：文档最后更新时间（自动更新）。
  {
    timestamps: true,
  }
);
// mongoose.models.User 检查是否已存在名为 User 的模型（例如在热重载时，避免重复定义模型导致的错误）。
// 如果不存在，通过 mongoose.model("User", UserSchema) 创建新模型，模型名称为 User
const User = mongoose.models.User || mongoose.model("User", UserSchema);

// 通过Mongoose的Schema和Model，定义了MongoDB中用户数据的结构（字段类型、必填验证），
// 并提供了操作用户数据的接口（如 User.create() 、 User.find() 等）
export default User;
