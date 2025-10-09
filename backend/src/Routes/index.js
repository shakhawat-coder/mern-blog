const express = require("express");

const _ = express.Router();
const coategory = require("./api/category.apiRoutes");
const blog = require("./api/blog.apiRoutes");
const user = require("./api/auth.apiRoutes");
const banner = require("./api/homepage/banner.apiRoutes");
const baseApi = process.env.BASE_API || "/api/v1";

_.use(baseApi, coategory);
_.use(baseApi, blog);
_.use(baseApi, banner);
_.use(baseApi, user);

module.exports = _;
