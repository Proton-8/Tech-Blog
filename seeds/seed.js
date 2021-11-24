const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const userData = require('./userData');
const blogData = require('./blogData');
// const commentsData = require('./commentsData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });


	const users = await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});
// create a random user to the blog
	for (const blog of blogData) {
		await Blog.create({
			...blog,
			user_id: users[Math.floor(Math.random() * users.length)].id,
		});
	}


  process.exit(0);
};

seedDatabase();
