const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Blog, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
// set Home Page
router.get("/", withAuth, (req, res) => {
  Blog.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "blog_name", "blog_text","date_created" ],
    include: [
      {
        model: Comment,
        attributes: ["id", "commentText", "date_created","blog_id", "user_id" ],
        include: {
          model: User,
          attributes: "name"
        },
      },
       ],
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render("homepage", { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "blog_name", "blog_text","date_created" ],
    include: [
      {
        model: Comment,
        attributes: ["id", "commentText", "date_created","blog_id", "user_id" ],
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
  Blog.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "blog_name", "blog_text","date_created" ],
    include: [
      {
        model: Comment,
        attributes: ["id", "commentText", "date_created", "blog_id", "user_id"],
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
    .then(blogData => {
      const posts = blogData.map((blog) => blog.get({ plain: true }));
      res.render("add-blog", { blogs, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;