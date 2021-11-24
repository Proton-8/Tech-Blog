const router = require('express').Router();
const { BlogNotes } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await BlogNotes.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get all blog comments
router.get("/", (req, res) => {
  Comment.findAll({})
    .then((newBlog) => res.json(newBlog))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// delete blog comment with specific id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogKill = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogKill) {
      res.status(404).json({ message: 'Sorry, no blog found with this id!' });
      return;
    }

    res.status(200).json(blogKill);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
