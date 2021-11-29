const User = require('./user');
const Comment = require('./comment');
const Blog = require('./blog');

// details  -------

// user and his blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
  
});
// blog with many comments
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

// Comment belong to blog
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id'
});


// Comment has only one user
User.hasMany(Comment, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

// Comment belongs to a single user
Comment.belongsTo(User, {
	foreignKey: 'user_id',
});




module.exports = {
  User,
  Comment,
  Blog
  };