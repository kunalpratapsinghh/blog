const express = require("express");
const UserSignUp = require("../Schema/UserSignUpSchema");
const app = express();
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const router = express.Router();

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await UserSignUp.findOne({ email });
    const verification = await argon2.verify(user.password, password);
    if (user && verification) {
      const Primarytoken = jwt.sign(
        {
          id: user._id,
          name: user.name,
          mobile: user.mobile,
          email: user.email,
        },
        "secretkey",
        { expiresIn: "1 hr" }
      );
      const Refreshtoken = jwt.sign(
        {
          id: user._id,
          name: user.name,
          mobile: user.mobile,
          email: user.email,
        },
        "refreshsecretkey",
        { expiresIn: "24 hr" }
      );
      return res
        .status(201)
        .send({
          token: Primarytoken,
          Refreshtoken: Refreshtoken,
          name: user.name,
        });
    } else {
      res.send("Invalid credentials");
    }
  } catch (error) {
    res.send("User Not Found");
  }
});

router.post("/signup", async (req, res) => {
  try {
    let data = req.body;
    data.password = await argon2.hash(data.password);
    const user = await UserSignUp.create(data);
    res.send(user);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.post("/refresh", async(req, res) => {
  const refreshtoken = req.headers["authorization"];
  try {
    const verification=jwt.verify(refreshtoken,"refreshsecretkey")
    if(verification){
      delete verification.iat;
			delete verification.exp;
      const decode=jwt.decode(refreshtoken)
      delete decode.iat;
			delete decode.exp;
      const primary = jwt.sign(decode, "secretkey",{expiresIn: "1 hr"});
      res.send(primary);
    }
    else{
      res.send("login again")
    }
  } catch (error) {
    res.send(error)
    // console.log(error)
    //tell frontend to login again
  }
});

module.exports = router;
