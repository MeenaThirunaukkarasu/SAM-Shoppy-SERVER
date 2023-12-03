const Cart = require("./../models/Cart.model.js");

const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model.js");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  // Check if email or password or name are provided as empty strings
  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  // This regular expression check that the email is of a valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // This regular expression checks password for special characters and minimum length
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then(async (foundUser) => {
      try {
        if (foundUser) {
          res.status(400).json({ message: "User already exists." });
          return;
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const { _id: cartId } = await Cart.create({ products: [] });
        return await User.create({
          email,
          password: hashedPassword,
          name,
          cartId,
        });
      } catch (e) {
        console.log(`Error`, e);
      }
    })
    .then((createdUser) => {
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      if (!createdUser) {
        res.status(500).json({ message: "Error creating user." });
        return;
      }
      const { email, name, _id, role, cartId } = createdUser;

      // Create a new object that doesn't expose the password
      const user = { role, email, name, _id, cartId };

      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { name, password } = req.body;

  // Check if email or password are provided as empty string
  if (name === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ name })
    .then(async (foundUser) => {
    
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      if (!foundUser.cartId) {
        const { _id } = await Cart.create({ products: [] });
        // console.log(_id)
        foundUser = await User.findByIdAndUpdate(foundUser._id, { cartId: _id }, { new: true });
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name, role, cartId ,orders,userDetails} = foundUser;

        // Create an object that will be set as the token payload
        const payload = { role, _id, email, name, cartId ,orders,userDetails};
          // console.log(payload)
        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken,user: foundUser});
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  // console.log(`req.payload`, req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

router.put("/update/:id", (req, res, next) => {
  const userId = req.params.id;
  const updatedUserInfo = req.body;

  let {
    email,
    password,
    name,
    role,
    userDetails,
    newPassword,
  } = updatedUserInfo;
  if (
    email === "" ||
    password === "" ||
    name === "" ||
    firstname === "" ||
    lastname === ""
  ) {
    res
      .status(400)
      .json({
        message: "Provide email, password , name , firstname and lastname",
      });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }
  // // This regular expression checks password for special characters and minimum length
  // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  // if (!passwordRegex.test(password)) {
  //   res.status(400).json({
  //     message:
  //       "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
  //   });
  //   return;
  // }

  if (newPassword === "") {
    newPassword = password;
  }
  User.findById(userId)
    .then((foundUser) => {
      
      // If the user with the same email already exists, send an error response
      if (!foundUser) {
        res.status(400).json({ message: "User Not Found." });
        return;
      }
      const isSamePassword = bcrypt.compareSync(password, foundUser.password);

      if (!isSamePassword) {
        res.status(400).json({ errorMessage: "Wrong credentials." });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);

      
      return User.findByIdAndUpdate(
        userId,
        {
          email,
          password: hashedPassword,
          name,
          role,
          userDetails,
        },
        { new: true }
      ).then((updatedUser) => {
        console.log("updated user", updatedUser);
        if (!updatedUser) {
          res.status(500).json({ message: "Error creating user." });
          return;
        }
        const { email, username, _id, role } = updatedUser;
        const user = { email, username, _id, role };
        console.log(user);
        // Send a json response containing the user object
        res.status(201).json({ user: user });
      });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.


});


router.put("/addAddr/:id", (req, res, next) => {
  const { contactNumber, addr } = req.body.userDetails;
  const userID = req.params.id;
console.log(contactNumber, addr)
User.findByIdAndUpdate(userID,{
  $set: {
    "userDetails.contactNumber": contactNumber,
  },
  $push: {
    "userDetails.address": addr,
  },
},{new:true})
.then(updatedUser=>{
  res.json(updatedUser)
})
.catch(error=>{
  console.log('error',error)
})
})
router.get("/", (req, res, next) => {
  User.find()
    .then((foundUser) => {
      res.json(foundUser);
    })
    .catch((error) => {
      console.log("error getting all users", error);
    });
});

module.exports = router;
