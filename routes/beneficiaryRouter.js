const express = require("express");
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');
const multer = require('multer')


// MULTER CONFIG
// SET FOR SINGLE UPLOAD
// CAN SAVE UPLOAD BUT THRU POSTMAN, ALL PROPS REFLECTED IN THE FE BUT NOW THE ACTUAL IMAGE  
const multerStorage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, './public');
    },
    filename: (req, file, next) => {
        const ext = file.mimetype.split('/')[1]
        next(null, Date.now() + '.' + ext )
    }
})
const upload = multer({ storage: multerStorage})




router.get("/", upload.single('img'), (req,res) => {
    Beneficiary.find({})
    .then(beneficiary => 
        res.send(beneficiary)
        )
})

router.post("/", upload.single('img'), (req,res) => {
    let beneficiary = new Beneficiary(req.body);
    beneficiary.save()
    .then ( beneficiary => {
        res.send(beneficiary)
    })
})

router.put("/:id", (req,res) => {
    Beneficiary.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(data => {res.send(data)
    })
})

router.delete("/:id", (req,res) => {
    Beneficiary.findOneAndDelete({_id: req.params.id})
        .then( data => res.send(data))
})

module.exports = router;