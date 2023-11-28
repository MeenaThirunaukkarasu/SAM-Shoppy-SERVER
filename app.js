// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

const { isAuthenticated } = require("./middleware/jwt.middleware");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const productsRoutes = require("./routes/products.routes");
app.use("/products", productsRoutes);

const dbCreateRoutes = require("./routes/dbCreate.routes");
app.use("/dbCreate", dbCreateRoutes);

const cartRoutes = require("./routes/cart.routes");
app.use("/cart", isAuthenticated, cartRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

const orderRoutes = require("./routes/order.routes");
app.use("/order", orderRoutes);

const addressRoutes = require("./routes/address.routes");
app.use("/address", addressRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
