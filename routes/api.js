var express = require('express');
var router = express.Router();

const Distributors = require('../models/distributors');

router.get('/get-list-distributor', async (req, res) => {
    try {
        const data = await Distributors.find().populate();
        res.json({
            "status": 200,
            "messenger": "List of distributors",
            "data": data
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const newDistributors = new Distributors({
            name: data.name
        });
        const result = await newDistributors.save();

        const list = await Distributors.find().populate();

        if (result) {
            res.json({
                "status": 200,
                "messenger": "Item added successfully",
                "data": list
            });
        } else {
            res.json({
                "status": 400,
                "messenger": "Failed to add item",
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.put('/update-distributor-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const data = req.body;
        const updateDistributor = await Distributors.findById(id);
        let result = null;
        if (updateDistributor) {
            updateDistributor.name = data.name ?? updateDistributor.name;
            result = await updateDistributor.save();
        }

        if (result) {
            res.json({
                "status": 200,
                "messenger": "Item updated successfully",
                "data": list
            });
        } else {
            res.json({
                "status": 400,
                "messenger": "Failed to update item",
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.delete('/delete-distributor-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Distributors.findByIdAndDelete(id);

        if (result) {
            const list = await Distributors.find().populate();
            res.json({
                "status": 200,
                "messenger": "Item deleted successfully",
                "data": result
            });
        } else {
            res.json({
                "status": 400,
                "messenger": "Failed to update item",
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/search-distributor', async (req, res) => {
    try {
        const key = req.query.key;
        const data = await Distributors.find({ name: { "$regex": key, "$options": "i" } }).sort({ createdAt: -1 });

        if (data) {
            res.json({
                "status": 200,
                "messenger": "Successfully",
                "data": data
            });
        } else {
            res.json({
                "status": 400,
                "messenger": "Failed",
                "data": []
            });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;