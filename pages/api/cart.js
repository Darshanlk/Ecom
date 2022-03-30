import jwt from "jsonwebtoken";
import MyCart from "../../Models/MyCart";
import initDb from "../../helpers/initDB";
import cookie from "js-cookie";
import Authenticated from "../../helpers/Authenticated";
initDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchUserCart(req, res);
      break;
    case "PUT":
      await addProduct(req, res);
      break;
    case "DELETE":
      await removeProduct(req, res);
      break;
  }
};

//for middlewear in next Js we use HigherOrderComponent --
// higher order component recive component and return component



//fetch User and cart
const fetchUserCart = Authenticated(async (req, res) => {
  try {
    //find cart for perticuler user
    const cart = await MyCart.findOne({ user: req.userId }).populate(
      "products.product"
    );
    res.status(200).json(cart.products);
  } catch (e) {
    console.log(e);
  }
});
// add product (UPDATE PRODUCT ARRAY)

const addProduct = Authenticated(async (req, res) => {
  try {
    const { quantity, productId } = req.body;

    // we access indiviual user's cart logic

    const cart = await MyCart.findOne({ user: req.userId });

    const pExist = cart.products.some(
      (pdoc) => productId === pdoc.product.toString()
    );

    if (pExist) {
      await MyCart.findOneAndUpdate(
        { _id: cart._id, "products.product": productId }, //compare cartid then compare products array's indiviual product's id with productId  so we get product
        { $inc: { "products.$.quantity": quantity } } // we increment products's array indivial product==document and and increment.
      );
    } else {
      //we push object
      const newProduct = { quantity, product: productId };

      //logic we find userspecific cart by id and update it
      await MyCart.findOneAndUpdate(
        { _id: cart._id },
        {
          $push: { products: newProduct },
        }
      );
    }
    res.status(200).json({ message: "product added in cart" });
  } catch (e) {
    console.log();
  }
});

// delete aapde  products array ni product++ karvani che.
//tr --product id che so ae id and aapde user pase thi aaveli id match thay to pull karavi desu
const removeProduct = Authenticated(async (req,res) => {
  const { productId } = req.body;
  //response ma updated  cart mokalsu so aapde populate karvu padiyu
 const cart = await MyCart.findOneAndUpdate(
    { user: req.userId },
    { $pull: { products: { product: productId } } },  
    { new: true }
  ).populate("products.product")
  res.status(200).json(cart.products)
});

//logic ==> we have products in cart
/**
    case 1: if we add product  or if product already exist in cart then
    and if we push same product then  we only increess that product Quantity and total price.
    we use "some-method  logic in javascript"

      ----------------------logic---------------------
      const ages = [3, 10, 18, 20];

        ages.some(checkAdult);
        function checkAdult(age) {
          return age > 18;
        }

        (some)it return true or false

      if item exist in cart then return  true so we increase quantity
      else  add product


    case 2: any new product push product in array


    */
