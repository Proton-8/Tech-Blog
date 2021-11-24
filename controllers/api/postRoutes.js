const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

//get all blogs
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "blog_name", "blog_text", "date_created"],
    order: [["date_created", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "commentText", "blog_id", "user_id", "date_created"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
      {
        model: User,
        attributes: ["name"],
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
    attributes: ["id", "blog_name", "date_created", "blog_text"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "commentText", "blog_id", "user_id", "date_created"],
        include: {
          model: User,
          attributes: ["name"],
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

//create new blog
router.post("/", withAuth, (req, res) => {
  Post.create({
    blog_name: req.body.blog_name,
    blog_text: req.body.blog_text,
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
