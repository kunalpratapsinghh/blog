const express = require("express");
const UserSignUp = require("../Schema/UserSignUpSchema");
const app = express();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const router = express.Router();
const CLIENT_ID = "6236d5994de754884d21";
const CLIENT_SECRET = "dd93fd6625391b971e5886dc628b05943f093b3e";
app.use(express.json());

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
        { expiresIn: "24 hr" }
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
      return res.status(201).send({
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

router.post("/refresh", async (req, res) => {
  const refreshtoken = req.headers["authorization"];
  try {
    const verification = jwt.verify(refreshtoken, "refreshsecretkey");
    if (verification) {
      delete verification.iat;
      delete verification.exp;
      const primary = jwt.sign(verification, "secretkey", {
        expiresIn: "1 hr",
      });
      res.send({ Token: primary });
    } else {
      res.send("login again");
    }
  } catch (error) {
    res.send(error);
    // console.log(error)
    //tell frontend to login again
  }
});

router.get("/", async (req, res) => {
  const token = req.headers["authorization"];
  try {
    const validity = jwt.verify(token, "secretkey");

    if (validity) {
      return res.send("Authenticated");
    }
  } catch (error) {
    return res.send("Not Authorized");
  }
});

router.get("/callback/:id", async (req, res) => {
  const code = req.params.id;
  console.log(code,"code")
    const accesstoken = await axios.post(
      `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    // console.log(accesstoken);
    const userdata = await axios
    .get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accesstoken.data.access_token}`,
      },
    })
    .catch(console.error)
    
    // console.log(typeof userdata)
    // console.log(userdata)
      // return res.send(userdata)
    return res.json({ message: "Signin successfull", "code":code});
});

module.exports = router;
