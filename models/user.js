'use strict';
const jwt = require('jsonwebtoken');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
          User.hasMany(models.Todo, {
            foreignKey: 'user_id',
            as: 'todos'
          })
    }

    static register = ({ pin }) => {
      return this.create({ pin });
    };

    generateToken = () => {
      const payload = {
        id: this.id,
        pin: this.pin
      };

      const key = process.env.SECRET_OR_KEY;

      const token = jwt.sign(payload, key);
      return token;
    };

    checkPin = (pin) => {
      return pin === this.pin;
    };

    static authenticate = async ({ pin }) => {
      try {
        const user = await this.findOne({ where: { pin } });

        if (!user) {
          throw new Error('User not found');
        }

        const isPinValid = user.checkPin(pin);
        if (!isPinValid) {
          throw new Error('Wrong PIN');
        }

        return user;
      } catch (err) {
        throw err;
      }
    };
  }
  User.init({
    pin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 4],
        isNumeric: true,
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};