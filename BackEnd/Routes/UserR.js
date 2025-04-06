const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Cntrl = require("../Controllers/UserController.js");
const Auth = require("../Authorize.js");


router.post('/register', asyncHandler(Cntrl.register));


router.post('/login', asyncHandler(Cntrl.login));

router.post('/refresh', asyncHandler(Cntrl.refresh));

router.post('/logout', Auth.authenticate, asyncHandler(Cntrl.logout));

router.post('/confirm', Auth.authenticateManager, asyncHandler(Cntrl.confirm));

router.post('/role', Auth.authenticateManager, asyncHandler(Cntrl.setRole));

router.post('/', Auth.authenticateManager, asyncHandler(Cntrl.getAllUser));


module.exports = router;