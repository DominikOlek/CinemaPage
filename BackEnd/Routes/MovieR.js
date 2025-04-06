const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Cntrl = require("../Controllers/MovieController.js");
const Auth = require("../Authorize.js");
const multer = require('multer');


router.post('/add', Auth.authenticate, asyncHandler(Cntrl.addOne));

router.post('/add/:id/:idL/:idS', Auth.authenticate, asyncHandler(Cntrl.addOneVersion)); // dodawanie tylko wersji jezykowych

router.patch('/edit:id', Auth.authenticate, asyncHandler(Cntrl.editInfo)); //edycja tylko info

router.delete('/delete:id', Auth.authenticate, asyncHandler(Cntrl.delOne)); // usuwanie tylko wersji jezykowych

router.get('/category', Auth.authenticate, asyncHandler(Cntrl.getAllCategory));

router.post('/category', Auth.authenticate, asyncHandler(Cntrl.AddCategory));

router.get('/:id', asyncHandler(Cntrl.getOne));

router.get('/', asyncHandler(Cntrl.getAll));

const src = "D:\\WDAI\\Projekt2\\KinoFront\\public\\posters";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, src);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }
})
const image = multer({ storage: storage })
router.post('/uploadImage', image.array("file"), (reg, res) => { res.status(200).send("OK"); });




module.exports = router;