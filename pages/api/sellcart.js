import jwt from "jsonwebtoken";
import SellCart from "../../Models/SellCart";
import initDB from "../../helpers/initDB";
import Authenticated from "../../helpers/Authenticated";

initDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchInSellCart(req, res);
      break;

    case "PUT":
      await addInSellCart(req, res);
      break;

    case "DELETE":
      await deleteInSellCart(req, res);
      break;
  }
};

const fetchInSellCart = Authenticated(async (req, res) => {
  try {
    const sellcart = await SellCart.findOne({ user: req.userId }).populate(
      "products.product");
    res.status(200).json(sellcart.products);
  } catch (e) {
    console.log(e);
  }
});

const addInSellCart = Authenticated(async (req, res) => {
  try {
    const { quantity, productId } = req.body;
    const sellcart = await SellCart.findOne({ user: req.userId });

    //if product is already in sell then we show error:Already
    const pExist = sellcart.products.some(
      (pdoc) => productId === pdoc.product.toString()
    );
      
    if (pExist) {
      return res.satus(401).json({ error: "product already in sell product" });
    } else {
      const newProduct = { quantity, product: productId };
      await SellCart.findOneAndUpdate(
        {
          _id: sellcart._id,
        },
        {
          $push: { products: newProduct },
        }
      );
    }
    console.log("Product added in sell cart")
   return res.status(200).json({message:"product added in SellCart"})
  } catch (e) {
    console.log(e);
  }
});

 const deleteInSellCart = Authenticated(async (req,res) => {

  const {productId} = req.body;

  const sellcart = await SellCart.findOneAndUpdate(
    {user:req.userId},
    {$pull:{products:{product:productId}}},
    {new:true},
  ).populate("products.product")
  res.status(200).json(sellcart.products)
 })
