const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

server.post("/users/:id/avatar", upload.single("avatar"), (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync("data.json"));
    const userId = parseInt(req.params.id);
    const user = db.users.find((u) => u.id === userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.avatar = `/uploads/${req.file.filename}`;

    fs.writeFileSync("data.json", JSON.stringify(db, null, 2));

    res.json({ avatar: user.avatar });
  } catch (error) {
    res.status(500).json({ message: "Error uploading avatar" });
  }
});
