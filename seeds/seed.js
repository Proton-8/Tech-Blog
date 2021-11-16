const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const userData = require('./userData');
const blogData = require('./blogData');
const commentsData = require('./commentsData');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // await User.bulkCreate(userData);
  await userData();
  // await Blog.bulkCreate(blogData);
 await blogData();
  // await Comment.bulkCreate(commentsData);
  await commentsData();




  // TO REVIEW   ______________

  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  // for (const project of projectData) {
  //   await Project.create({
  //     ...project,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
