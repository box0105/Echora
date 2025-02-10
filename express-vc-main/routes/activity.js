import express from 'express'
import multer from 'multer'
import cors from "cors"
const upload = multer();

// live server(5500), next.js(3000)
const whiteList = ["http://localhost:5500", "http://localhost:3000"];
const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    // 主機 或 白名單中
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("不允許連線"));
    }
  },
};

const router = express.Router();
router.use(cors(corsOptions));
// 允許接收 Json 格式
router.use(express.json());
// 允許接收格式 account=user1&password=123，轉為 { account: "user1", password: "123" }
router.use(express.urlencoded({ extended: true }));


/* 路由 */
app.get("/api/activities", async (request, response) => {
  try {
    const [rows] = await db.execute("SELECT * FROM `users`");
    response.status(200).json({
      statu: "success",
      data: rows,
      message: "取得活動列表成功",
    });
  } catch (err) {
    console.log(err);
    response.status(400).json({
      status: "error",
      message: err.message ? err.message : "取得活動列表失敗",
    });
  }
});


export default router
