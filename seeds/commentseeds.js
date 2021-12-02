const { Comment } = require("../models");

const commentData = [
  {
    user_id: 2,
    post_id: 1,
    comment_text: "I agree 110 %!",
  },
  {
    user_id: 2,
    post_id: 1,
    comment_text: "yes!",
  },
  {
    user_id: 1,
    post_id: 1,
    comment_text: "AWESOME stuff!",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;