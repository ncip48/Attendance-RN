const express = require("express");
const router = express.Router();

const { getPosition } = require("../controller/position");
const { getWorker } = require("../controller/worker");
const { login, checkAuth } = require("../controller/auth");

const { authenticated } = require("../middleware/authentication");

router.post("/login", login);
router.get("/auth", authenticated, checkAuth);

router.get("/positions", getPosition);

router.get("/workers", getWorker);

module.exports = router;
