import initDB from "../../../helpers/initDB";
import Product from "../../../Models/Products";
// eslint-disable-next-line import/no-anonymous-default-export
initDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await GetProduct(req, res);
      break;
    case "DELETE":
      await DeleteProduct(req, res);
    default:
      break;
  }
};

//[pid] means api ma product name na folder ma [pid].js Dynamic api approch puro padva mate banavi
//type http://localhost:3000/api/product/623479f6e4bee3394d9030c3 in url
// Number is _id of ecom's product
// this id recive in [pid] file and we destructured it in variable and performe operation.

const GetProduct = async (req, res) => {
  //this code for get a single product and we get it so IT is GET Request code
  const { pid } = req.query;
  // console.log(req.query)

  const product = await Product.findOne({ _id: pid });

  //   res.send("done");
  // it will give indiviual product which user select
  res.status(200).json(product);
};

const DeleteProduct = async (req, res) => {
  const { pid } = req.query;
  const product = await Product.findOneAndDelete({ _id: pid });
  res.stats(200).json({ message: "Product deleted" });
};
//updateProduct
const UpdateProduct = async (req, res) => {
  const { pid } = req.query;
  const product = await Product.findByIdAndUpdate({ _id: pid });
  res.status(200).json(product);
};
//post product
