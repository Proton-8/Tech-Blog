const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init({

  //  to confirn info below....

  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blogtext: {
    type: DataTypes.STRING,
  },
  date_created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id',
    },
  },
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'project',
});

module.exports = Blog;