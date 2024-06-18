const router = require('express').Router();

const todoItemsModel = require("../models/todoItem.model");

//Create todo:
router.post("/api/item", async (req, res, next) => {
    try {
        const newItem = new todoItemsModel({
            item: req.body.item
        });
        const saveItem = await newItem.save();
        res.status(200).json(saveItem);
    } catch (error) {
        res.json(error);
    }
});

router.get('/api/items', async (req, res) => {
    try {
        const allItems = await todoItemsModel.find({});
        res.status(200).json(allItems);
    } catch (error) {
        console.log(error);
    }
});

//Edit todo:
router.put('/api/item/:id', async(req, res) => {
    try {
        const updatedItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json(updatedItem);
    } catch (error) {
        console.log(error);
    }
});

//Delete todo:
router.delete('/api/item/:id', async(req, res) => {
    try {
        const deletedItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json(`Item delete successfully`);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;