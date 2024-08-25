const router = require("express").Router();
const userRouter = require("./users");
const postRouter = require("./posts");
router.use(userRouter);
router.use(postRouter);

module.exports = router;