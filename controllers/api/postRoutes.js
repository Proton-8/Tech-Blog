const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

//get all posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "created_at", "post_content"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((blogData) => res.json(blogData))
      // error catch
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get 1 post by id
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "created_at", "post_content"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((blogData) => {
      if (!blogData) {
        res.status(404).json({ message: "Sorry, no Blog found" });
        return;
      }
      res.json(blogData);
    })
      // error catch
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create new post 
router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id,
  })
    .then((blogData) => res.json(blogData))
      // error catch
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_content: req.body.post_content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((blogData) => {
      if (!blogData) {
        res.status(404).json({ message: "Sorry, no Blog found" });
        return;
      }
      res.json(blogData);
    })
      // error catch
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//delete Blog
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((blogData) => {
      if (!blogData) {
        res.status(404).json({ message: "Sorry, no Blog found" });
        return;
      }
      res.json(blogData);
    })
    // error catch
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
