const cart = require(`./../models/index`).cart;
const cart_detail = require(`./../models/index`).cart_detail;
const product = require(`./../models/index`).product;
const user = require(`./../models/index`).user;
const sequelize = require("sequelize");
const transaction = require("../models/index").transaction;
const transaction_detail = require("../models/index").transaction_detail;

exports.addCart = async (req, res) => {
  try {
    console.log(req.user);
    const idUser = req.session.idUser || req.user.id_user;
    const idProduct = req.params.idProduct;
    const quantity = req.body.quantity;
    if (idUser == null) {
      res.json({
        success: false,
        message: "Please login first",
      });
    }
    const Product = await product.findOne({
      where: {
        id_product: idProduct,
      },
    });
    console.log(idProduct, quantity);
    if (Product.stock > 0 && quantity <= Product.stock) {
      const User = await user.findOne({
        where: {
          id_user: idUser,
        },
      });
      const existItem = await cart_detail.findOne({
        where: {
          id_user: idUser,
          id_product: idProduct,
        },
      });

      if (!existItem) {
        const Cart = await cart.create({
          user: User.username,
          product: Product.name,
          quantity: quantity,
          total_price: Product.price * quantity,
        });

        console.log(Cart.id_cart);
        const CartDetail = await cart_detail.create({
          id_cart: Cart.id_cart,
          id_product: idProduct,
          id_user: idUser,
          price: Product.price,
        });
        if (Cart) {
          const updatedstock = await product.update(
            { stock: Product.stock - quantity },
            { where: { id_product: idProduct } }
          );
          res.json({
            success: true,
            message:
              quantity +
              " items of " +
              Product.name +
              " have been added to your shopping cart",
          });
        }
      } else {
        const existItem2 = await cart_detail.findOne({
          where: {
            id_user: idUser,
            id_product: idProduct,
          },
        });
        const existCart = await cart.findOne({
          where: {
            id_cart: existItem2.id_cart,
          },
        });
        const Cart = await cart.update(
          {
            quantity: existCart.quantity + quantity,
            total_price: existCart.total_price + Product.price * quantity,
          },
          {
            where: {
              id_cart: existCart.id_cart,
            },
          }
        );

        if (Cart) {
          res.json({
            success: true,
            message:
              quantity +
              " " +
              Product.name +
              " have been added to your shopping cart",
          });
        }
      }
    } else if (Product.stock == 0) {
      res.json({
        success: false,
        message: "out of stock",
      });
    } else if (quantity > Product.stock) {
      res.json({
        success: false,
        message: "Stock is " + Product.stock,
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "An error occurred",
    });
  }
};
exports.deleteAllCart = async (req, res) => {
  try {
    const idUser = req.session.idUser || req.user.id_user;
    const deleted = await cart_detail.findOne({
      where: {
        id_user: idUser,
      },
    });
    const ActuallyDeleted2 = await cart.destroy({
      where: {
        id_cart: deleted.id_cart,
      },
    });
    const reset = await cart.sequelize.query(
      "ALTER TABLE `cart` AUTO_INCREMENT = 1"
    );
    const reset2 = await cart_detail.sequelize.query(
      "ALTER TABLE `cart_detail` AUTO_INCREMENT = 1"
    );
    if (ActuallyDeleted2) {
      res.json({
        success: true,
        message: "Your shopping cart has been cleared",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};
exports.DeleteItemFromCart = async (req, res) => {
  const idUser = req.session.idUser || req.user.id_user;
  const idProduct = req.params.idProduct;
  const deleted = await cart_detail.findOne({
    where: {
      id_product: idProduct,
      id_user: idUser,
    },
  });
  const name = await product.findOne({
    where: {
      id_product: idProduct,
    },
  });
  const delete1 = await cart.destroy({
    where: {
      id_cart: deleted.id_cart,
    },
  });

  if (delete1) {
    res.json({
      success: true,
      message: name.name + " Has Been Deleted From Your Shopping Cart",
    });
  } else {
    res.json({
      success: false,
      message: "An error occurred",
    });
  }
};
exports.ChangeQuantity = async (req, res) => {
  const idUser = req.session.idUser || req.user.id_user;
  const idProduct = req.params.idProduct;
  const newquantity = req.body.quantity;

  if (newquantity == 0) {
    const deleted = await cart_detail.findOne({
      where: {
        id_product: idProduct,
        id_user: idUser,
      },
    });
    const name = await product.findOne({
      where: {
        id_product: idProduct,
      },
    });
    const delete1 = await cart.destroy({
      where: {
        id_cart: deleted.id_cart,
      },
    });
    if (delete1) {
      res.json({
        success: true,
        message: name.name + " Has Been Deleted From Your Shopping Cart",
      });
    } else {
      res.json({
        success: false,
        message: "An error occurred",
      });
    }
  } else {
    const deleted = await cart_detail.findOne({
      where: {
        id_user: idUser,
      },
    });
    const name = await product.findOne({
      where: {
        id_product: idProduct,
      },
    });
    const UpdatedCart = await cart.update(
      {
        quantity: newquantity,
        total_price: newquantity * name.price,
      },
      {
        where: {
          id_cart: deleted.id_cart,
        },
      }
    );

    if (UpdatedCart) {
      res.json({
        success: true,
        message:
          name.name +
          " Has Been Deleted From Your Shopping Cart Because You Input The Value 0",
      });
    }
  }
};
exports.SeeCart = async (req, res) => {
  try {
    const idUser = req.session.idUser || req.user.id_user;
    const CartD = await cart_detail.findAll({
      where: {
        id_user: idUser,
      },
    });

    if (CartD.length > 0) {
      const idCarts = CartD.map((cart) => cart.id_cart);
      const Cart = await cart.findAll({
        where: {
          id_cart: idCarts,
        },
      });

      if (Cart.length > 0) {
        res.json({
          success: true,
          message: Cart,
        });
      } else {
        res.json({
          success: false,
          message: "Your Shopping Cart Is Empty",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Your Shopping Cart Is Empty",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "An error occurred",
    });
  }
};
exports.buy = async (req, res) => {
  try {
    const cartdetail = await cart_detail.findAll({
      where: {
        id_user: req.session.idUser || req.user.id_user,
      },
    });
    if (cartdetail.length > 0) {
      const idCarts = cartdetail.map((cart) => cart.id_cart);
      const Cart = await cart.findAll({
        where: {
          id_cart: idCarts,
        },
      });
      const User = await user.findOne({
        where: {
          id_user: req.session.idUser || req.user.id_user,
        },
      });
      const Card = req.body.methodPayment;
      const money = req.body.paid;
      const total = Cart.map((cart) => cart.total_price).reduce(
        (acc, curr) => acc + curr,
        0
      );
      let transaction1;
      if (
        money > total ||
        money == total ||
        User.balance > total ||
        User.balance == total
      ) {
        if (Card === "Credit Card" || Card === "Debit Card") {
          const today = new Date();
          const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
          transaction1 = await transaction.create({
            metode_pembayaran: Card,
            user: User.username,
            paid: money,
            kembalian: money - total,
            purchased: formattedDate,
            status: "pending",
          });
        } else if (Card === "Balance") {
          const today = new Date();
          const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
          console.log(formattedDate);
          transaction1 = await transaction.create({
            metode_pembayaran: Card,
            user: User.username,
            paid: User.balance,
            kembalian: User.balance - total,
            purchased: formattedDate,
            status: "pending",
          });
          const updateBalance = await user.update(
            { balance: User.balance - total },
            { where: { id_user: req.session.idUser || req.user.id_user } }
          );
        }

        for (let i = 0; i < cartdetail.length; i++) {
          const cartdetail = await cart_detail.findOne({
            where: {
              id_user: req.session.idUser || req.user.id_user,
            },
          });
          const Cart = await cart.findOne({
            where: {
              id_cart: cartdetail.id_cart,
            },
          });
          const transactiondetail = await transaction_detail.create({
            id_transaction: transaction1.id_transaction,
            id_user: req.session.idUser || req.user.id_user,
            id_product: cartdetail.id_product,
            product: Cart.product,
            quantity: Cart.quantity,
            price: cartdetail.price,
          });
          const delete1 = await cart.destroy({
            where: {
              id_cart: Cart.id_cart,
            },
          });
        }
        res.json({
          success: true,
          message: "Payment Success",
        });
      } else {
        res.json({
          success: false,
          message: "You Don't Have Enough Money",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Your Shopping Cart Is Empty",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
exports.History = async (req, res) => {
  try {
    const idUser = req.session.idUser || req.user.id_user;
    const History = await transaction_detail.findAll({
      where: {
        id_user: idUser,
      },
    });

    if (History.length > 0) {
      const TD = History.map(
        (transaction_detail) => transaction_detail.id_transaction
      );
      const Transaction = await transaction.findAll({
        where: {
          id_transaction: TD,
        },
        include: [
          {
            model: transaction_detail,
            as: "transaction_detail", // alias specified in the association
            attributes: ["product", "quantity"],
          },
        ],
      });
      res.json({
        success: true,
        message: Transaction,
      });
    } else {
      res.json({
        success: false,
        message: "Your History Is Empty",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "An error occurred",
    });
  }
};
exports.topup = async (req, res) => {
  const idUser = req.session.idUser || req.user.id_user;
  const newBalance = req.body.balance;
  const User = await user.findOne({
    where: {
      id_user: idUser,
    },
  });
  const newUser = await user.update(
    { balance: User.balance + newBalance },
    { where: { id_user: idUser } }
  );
  if (newUser) {
    res.json({
      success: true,
      message: "Topup Success",
    });
  } else {
    res.json({
      success: false,
      message: "Topup Failed",
    });
  }
};
exports.complete = async (req, res) => {
  try {
    const idUser = req.session.idUser || req.user.id_user;
    const status = req.body.status;
    const Transaction = await transaction_detail.findAll({
      where: {
        id_user: idUser,
      },
    });
    const idTrans = Transaction.map(
      (transaction) => transaction.id_transaction
    );
    const transaction1 = await transaction.update(
      { status: status },
      { where: { id_transaction: idTrans } }
    );
    if (transaction1) {
      res.json({
        success: true,
        message: "Status Updated Successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Failed To Update Status",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "An error occurred",
    });
  }
};
