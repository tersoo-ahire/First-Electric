const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const subscriberRouter = require("./routes/subscriberRoutes");
const contactRouter = require("./routes/contactRoutes");
const referralRouter = require("./routes/referralRoutes");
const transactionsRouter = require("./routes/transactionRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const orderRouter = require("./routes/orderRoutes");
const customerRouter = require("./routes/customerRoutes");
const paygoRouter = require("./routes/paygoRoutes");
const documentRouter = require("./routes/documentRoutes");

const app = express();

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
app.options("*", cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) ROUTES
app.get("/", (req, res) => {
  res.json({ message: "Hello! Welcome to First Electric" });
});
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscribers", subscriberRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/referral", referralRouter);
app.use("/api/v1/transactions", transactionsRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/paygo", paygoRouter);
app.use("/api/v1/documents", documentRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
