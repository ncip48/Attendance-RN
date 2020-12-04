"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Worker.hasOne(models.Position, {
      //   as: "position",
      //   foreignKey: {
      //     name: "positionId",
      //   },
      // });
      Worker.belongsTo(models.Position, {
        as: "position",
        foreignKey: {
          name: "positionId",
        },
      });
    }
  }
  Worker.init(
    {
      positionId: DataTypes.INTEGER,
      nrp: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      photoProfile: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Worker",
    }
  );
  return Worker;
};
