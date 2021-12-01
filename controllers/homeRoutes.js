const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// set Home Page
router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map(blogs => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
     blogs, 
     title: 'BLOG',
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Render the template for the current logged-in user's dashboard
router.get('/dashboard', withAuth, async (req, res) => {
	try {
		// Find the logged in user based on the session's user_id
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
			include: [{ model: Blog }],
		});
		const user = userData.get({ plain: true });

		res.render('userdashboard', {
			...user,
			title: 'Personal Dashboard',
			logged_in: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});



router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
					model: Comment,
					include: [
						{
							model: User,
							attributes: ['name'],
						},
					],
				},
      ],
    });

    const blogs = blogData.get({ plain: true });

    res.render('comments', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Post }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');

});

// Render the template for creating a new post
router.get('/blog', (req, res) => {
	res.render('blog', {
		title: 'Personal Dashboard',
		logged_in: req.session.logged_in,
	});
});


// Logout Page
router.get('/logout', (req, res) => {
  console.log("Logging Out");
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect("/");
    });
  }else{ 
    res.status(204).redirect("/");
  }
});





// Signup Page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});


module.exports = router;
