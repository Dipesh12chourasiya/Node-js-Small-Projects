const express = require("express");

const {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
} = require('../controllers/user')

const router = express.Router();

//Rest APIs
router
    .route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser);

router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

module.exports = router;