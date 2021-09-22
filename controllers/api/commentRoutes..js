
// new ???

const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async(req, res) => {
    try {
        const commentData = await Comment.create(req.body);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;

// old info to review ??-----------------------


// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../../config/connection');

// class Comments extends Model {}


//   //  to confirn info below....
// Comments.init(
//   {

  

//        //   TBA------------
       
// //        id: {
// //       type: DataTypes.INTEGER,
// //       allowNull: false,
// //       primaryKey: true,
// //       autoIncrement: true,
// //     },
// //     name: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //     description: {
// //       type: DataTypes.STRING,
// //     },
// //     date_created: {
// //       type: DataTypes.DATE,
// //       allowNull: false,
// //       defaultValue: DataTypes.NOW,
// //     },
// //     needed_funding: {
// //       type: DataTypes.FLOAT,
// //       allowNull: false,
// //     },
// //     user_id: {
// //       type: DataTypes.INTEGER,
// //       references: {
// //         model: 'user',
// //         key: 'id',
// //       },
// //     },
// //   },
// //   {
// //     sequelize,
// //     timestamps: false,
// //     freezeTableName: true,
// //     underscored: true,
// //     modelName: 'project',
// //   }
// );

// module.exports = Comments;
