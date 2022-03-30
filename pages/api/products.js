import initDB from "../../helpers/initDB";
import Products from "../../Models/Products";
import Product from "../product/[id]";

//connection of mongodb
initDB();

//helloword api
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getallProducts(req, res);

      break;

    case "POST":
      await saveProduct(req, res);

      break;

    default:
      break;
  }
};

const getallProducts = async (req, res) => {
  try {
    const data = await Products.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};

const saveProduct = async (req, res) => {
  const { name, price, description, mediaUrl,productBy } = req.body;
  try {
    if (!name || !price || !description || !mediaUrl) {
      return res.status(422).json({ error: "Please add all the fields" });
    }

    const product = await new Products({
      name,
      price,
      description,
      mediaUrl,
      productBy:req.user
    }).save();

    return res.status(201).json({product,message: "Product save successfully" });
  } catch (e) {
    console.log(e);
  }
};
