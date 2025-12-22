module.exports = (sequelize, DataTypes) => {
  const ChatLog = sequelize.define("ChatLog", {
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
  });

  return ChatLog;
};
