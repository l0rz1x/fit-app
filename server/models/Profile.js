module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activityLevel: {
      type: DataTypes.STRING,
      allowNull: true, // sedentary, moderate, active
    },
    goal: {
      type: DataTypes.STRING,
      allowNull: true, // lose_weight, gain_weight, gain_muscle
    },
    targetWeight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return Profile;
};
