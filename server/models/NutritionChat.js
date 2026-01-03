module.exports = (sequelize, DataTypes) => {
  const NutritionChat = sequelize.define("NutritionChat", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    sender: {
      type: DataTypes.ENUM("user", "ai"),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recipeCards: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  });

  return NutritionChat;
};
