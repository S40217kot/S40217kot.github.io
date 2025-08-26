import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

// JSONファイルを読み込む関数
function loadUsers() {
  const data = fs.readFileSync("./users.json", "utf8");
  return JSON.parse(data);
}

// ログインAPI
app.post("/login", (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return res.status(400).json({ message: "IDとパスワードを入力してください" });
  }

  const users = loadUsers();
  const user = users.find(u => u.id === id && u.password === password);

  if (user) {
    res.json({ message: `${id} 様、ようこそ！` });
  } else {
    res.status(401).json({ message: "IDまたはパスワードが違います" });
  }
});

app.listen(3000, () => {
  console.log("サーバー起動中: http://localhost:3000");
});
