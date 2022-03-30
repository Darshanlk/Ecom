// /api/signup
import initDB from "../../helpers/initDB";
import User from "../../Models/User";
import bcrypt from "bcryptjs/dist/bcrypt";
import SellCart from "../../Models/SellCart";
import MyCart from "../../Models/MyCart";


//connection of mongodb
initDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      firstname,
      lastname,
      mobilenumber1,
      mobilenumber2,
      city,
      state,
      country,
      pincode,
      address,
    } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !firstname ||
      !lastname ||
      !mobilenumber1 ||
      !mobilenumber2 ||
      !city ||
      !state ||
      !country ||
      !pincode ||
      !address
    ) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    //check there is user already available in db
    const avilUser = await User.findOne({ email });

    if (avilUser) {
      return res
        .status(422)
        .json({ error: "User already exits with thate email" });
    }
    //password hashing
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await new User({
      username,
      email,
      password: hashPassword,
      firstname,
      lastname,
      mobilenumber1,
      mobilenumber2,
      city,
      state,
      country,
      pincode,
      address,
    }).save();

    await new MyCart({user:newUser._id}).save()
    await new SellCart({user:newUser._id}).save()
    res.status(201).json({ message: "User Signup successfully" });
  } catch (e) {
    console.log(e);
  }
};
