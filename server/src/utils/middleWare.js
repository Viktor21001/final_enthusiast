const express = require("express")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const cors = require("cors")
const corsOptions = require("./cors")
// import controllers
const HomeController = require("../controllers/HomeController")
// import models
const User = require("../../db/models")

// function to create context property in every request with shared data
const applicationContext = (req, res, next) => {
  // data to share can be added in this object
  req.context = {
    models: { User },
  }
  // move on to next middleware
  next()
}

const registerMiddleware = app => {
  app.use(cors(corsOptions)) // cors headers
  app.use(cookieParser()) // parse cookies
  app.use(express.json()) // parse json bodies
  app.use(morgan("tiny")) // logging
  app.use(applicationContext) // add context object to request
  app.use("/", HomeController) // register homecontroller routes for  "/" urls
}

module.exports = registerMiddleware