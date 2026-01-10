module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: { msg: "Email required" },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "Password required" },
        len: { args: [8, 255], msg: "Password must be at least 8 chars" },
      },
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Users.associate = (models) => {
    Users.hasOne(models.Profile, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Users.hasMany(models.ChatLog, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Users.hasOne(models.WorkoutPlan, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Users.hasMany(models.NutritionChat, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    Users.hasOne(models.NutritionPlan, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };
  return Users;
};
