// requiring dotenv should be on top
require("dotenv").config();

// db connection
const db = require("./server-src/utils/database");

// this codeblock will be generated once - you can delete after running server once
// const { users: User, roles: Role } = db;
// const runOnce = (function () {
//   let executed = false;
//   return async function () {
//     if (!executed) {
//       executed = true;
//       let rolename1 = 'admin';
//       let rolename2 = 'user';

//       let permission2 =
//         [ '/admin-panel/dashboard'];
//       let permission1 =
//         ['/admin-panel/dashboard'];

//       await Role.create({ rolename: rolename1, permissions: permission1 });
//       await Role.create({ rolename: rolename2, permissions: permission2 });

//       let admin = User.build({
//         username: 'admin',
//         email: 'email@email.com',
//         password: '123456',
//         permissions: permission1
//       });
//       await admin.save()

//     }
//   };
// })();

// runOnce()
// temporary code block ends

db.sequelize
  .sync({ alter: true })
  .then(() => console.log("sync done"))
  .catch((err) => console.log(err));

// starting node
const path = require("path")
const express = require("express");
const { cloudinary } = require('./server-src/utils/cloudinary');
const cors = require("cors");
const cookieParser = require("cookie-parser");

// custom required files
const errorHandler = require("./server-src/middlewares/error");

const app = express();

// app.use(express.static("production"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/image", express.static(path.join(__dirname, "Images")))
// app.use(express.static(path.join(__dirname, "images")))
// let test = path.basename(__dirname);
// console.log(__dirname)

// app middlewares
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ credentials: true, origin: true })); 
// app.use(cors({credentials: true}))
app.use(cookieParser(process.env.COOKIE_SECRET));

// routes
app.use("/api/auth", require("./server-src/routes/auth"));
app.use("/api/private", require("./server-src/routes/private"));
app.use("/api/public", require("./server-src/routes/publicRoutes"));

app.use("/api/conversation", require("./server-src/routes/conversations"));
app.use("/api/message", require("./server-src/routes/messages"));

app.use("/api/pages", require("./server-src/routes/pages"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})
// custom error handler -- should be the last piece of middleware
app.use(errorHandler);

// estabishing node connection
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`app is running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error Log: ${err}`);
});
