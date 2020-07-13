'use strict';

const cart = require("./cart");

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Produk extends Model {}
  Produk.init({
    merk: DataTypes.STRING,
    ukuran: DataTypes.STRING,
    harga: DataTypes.STRING,
    jenis: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Produk"
  });
  Produk.associate = function(models) {
    // associations can be defined here
    Produk.hasMany(models.Cart)
  };
  return Produk;
};