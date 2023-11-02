const { Router } = require("express");

const {getOne,createOne,fetchMany,updateOne,removeOne}= require("../utils/crud");


const router = Router();

// api/post
router.route("/")
.get(getMany)
.post(creatOne)


// api/post/id
router.route("/:id")
.get(getOne)
.put(updateOne)
.delete(removeOne)


module.exports = router;