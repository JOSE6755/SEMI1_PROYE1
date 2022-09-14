const express = require('express');
const router = new express.Router();

const users = require('../controllers/user')
const file = require('../controllers/file')
const friendship = require('../controllers/friendship')

const upload = require('./uploads.js')
// const httpStatus = require("http-status");


router.post('/usuario/registro', upload.uploadAvatar.single('imagen'), users.postRegister );

router.post('/usuario/upload', upload.uploadFile.single('file'), users.uploadFile )

router.get('/usuario/login/:enter', users.postLogin);

router.post('/usuario/deleteFile', users.deleFile);

router.post('/usuario/editFile', users.editFile)

router.get('/usuario/getFilesFriends/:username', users.getFilesFromFriends)

router.post('/usuario/delete/getFiles',  file.deleteGetFiles)

router.get('/usuario/getAllUsers/:username', users.getAllUsers)

router.post('/usuario/findUser', users.searchUser)

router.post('/usuario/addFriend', friendship.addFriend )

router.get('/usuario/seeAllFiles/:username', friendship.getAllFilesFromFriends)

router.post('/usuario/findFile', friendship.getAllFilesFromFriends)

router.get('/user/:username', file.getAllFilesUser )

module.exports = router;
