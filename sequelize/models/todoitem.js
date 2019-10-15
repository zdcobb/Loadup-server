'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    description: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  TodoItem.associate = (models) => {
    // associations can be defined here
    TodoItem.belongsTo(models.Todo, {
      foreignKey: 'todoId',
      onDelete: 'CASCADE'
    })
  };
  return TodoItem;
};