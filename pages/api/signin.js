import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import initDB from "../../helpers/initDB";
import User from "../../Models/User";

initDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Please fill all the fileds." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const checkPass = await bcrypt.compare(password, user.password);

    if (checkPass) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
        expiresIn: "7h",
      });
      // console.log(JSON.parse(userId))
      const {  username, email, role } = user;
      return res.status(201).json({ token, username, email, role});
    } else {
      return res.status(401).json({ error: "email or password is invalid" });
    }
  } catch (e) {
    console.log(e);
  }
};
