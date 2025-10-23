var indexRouter = require('./routes/index');
var search = require('./routes/search');
var albumMusic = require('./routes/albumMusic');
var artistMusic = require('./routes/artistMusic');
var artistAlbum = require('./routes/artistAlbum');
var download = require('./routes/download');

const express = require("express");

const noteRoute = require('./routes/noteRoute');
const test = require('./routes/test');

const router = express.Router();

router.use("/note", noteRoute);
//router.use("/test", test);

module.exports = router