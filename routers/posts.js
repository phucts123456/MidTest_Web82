const router = require("express").Router();
const postController = require("../controllers/post")

router.post('/posts', (req, res) => postController.createPost(req, res));
router.put('/posts/:id', (req, res) => postController.updatePost(req, res));
module.exports = router;