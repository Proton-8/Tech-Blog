const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "created_at", "blogContent"],
    include: [
      {
        model: Comment,
        attributes: ["id", "blogInfo", "blog_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: "username"
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "created_at", "blogContent"],
    include: [
      {
        model: Comment,
        attributes: ["id", "blogInfo", "post_id", "user_id", "created_at"],
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
    .then(blogData => {
      if (!blogData) {
        res.status(404).json({ message: "No blog found" });
        return;
      }

      const post = blogData.get({ plain: true });

      res.render("edit-blog", {
        post,
        loggedIn: true,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/create/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "created_at", "blogContent"],
    include: [
      {
        model: Comment,
        attributes: ["id", "blogInfo", "post_id", "user_id", "created_at"],
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
    .then(blogData => {
      const posts = blogData.map((post) => post.get({ plain: true }));
      res.render("add-post", { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;