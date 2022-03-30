import Stripe from "stripe";
import { v4 as uuidV4 } from "uuid";
import MyCart from "../../Models/MyCart";
import jwt from "jsonwebtoken";
import Order from "../../Models/Order";
import product from '../../Models/Products'
import initDb from "../../helpers/initDB";

initDb();

const stripe = Stripe(process.env.STRIPE_SECRET);
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { paymentInfo,productId } = req.body;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "you must logged in" });
  }

  try {
    const { userId } = jwt.verify(authorization, process.env.JWT_TOKEN);
    const cart = await MyCart.findOne({ user: userId }).populate(
      "products.product"
    );
    let price = 0;
    cart.products.forEach((item) => {
      price = price + item.quantity * item.product.price;
    });
    const prevCustomer = await stripe.customers.list({
      email: paymentInfo.email,
    });
    const isExistingCustomer = prevCustomer.data.length > 0;
    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentInfo.email,
        source: paymentInfo.id,
      });
    }
    // const  indiProduct = await product.findOne({_id:productId})
    // console.log(indiProduct)

    // await stripe.charges.create(
    //   {
    //     currency: "INR",
    //     amount: price * 100,
    //     receipt_email: paymentInfo.email,
    //     customer: isExistingCustomer ? prevCustomer.data[0].id : newCustomer.id,
    //     description: `you purchased a product | ${paymentInfo.email}`,
    //   },
    //   {
    //     idempotencyKey: uuidV4(),
    //   }
    // );

    // console.log(indiProduct)
    // console.log(cart.products)
    await new Order({
      user:userId,
      email:paymentInfo.email,
      total:price,
      products:cart.products 
  }).save() 
    await MyCart.findOneAndUpdate(
      { _id: cart._id },
      { $set: { products: [] } }
    );
    res.status(200).json({ message: "payment was successful" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "error processing payment" });
    // return res.status(401).json({message:"Payment was Successful"})
  }
};
