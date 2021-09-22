const User = require('./user');
const Comment = require('./comment');
const Blog = require('./blog');

// details  -------

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

User.belongsTo(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


module.exports = {
  User,
  Blog,
  Comment
};