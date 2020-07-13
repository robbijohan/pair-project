'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Cart extends Model { }
  Cart.init({
    jumlah_barang: DataTypes.STRING,
    total_harga: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ProdukId: DataTypes.INTEGER
  }, {
    sequelize, modelName: "Cart"
  });
  Cart.associate = function (models) {
    // associations can be defined here
    Cart.belongsTo(models.Produk)
    Cart.belongsTo(models.User)
  };
  return Cart;
};