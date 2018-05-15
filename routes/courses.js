const express = require("express")
const route = express.Router();
const {
    Course
} = require('../db/db');
const {
    Batch
} = require('../db/db');

route.get('/', (req, res) => {
    Course.findAll().then((courses) => {
            res.status(200).send({
                success: true,
                courses: courses
            })

        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: "Error! Something is not right"
            })
        })
})

route.get('/:id', (req, res) => {
    Course.findById(req.params.id)
        .then((courses) => {
            res.status(200).send({
                success: true,
                courses: courses
            })
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: "Error! Something is not right"
            })
        })
});

route.get('/:id/batches', (req, res) => {
    let courseId = req.params.id;
    Batch.findAll({
            where: {
                courseId: courseId
            }
        })
        .then((batches) => {
            res.status(200).send({
                success: true,
                batches: batches
            })
        })
        .error((error) => {
            res.status(500).send({
                success: false,
                message: "Error! Something is not right"
            })
        })
});

route.get('/:id/batches/:bid', (req, res) => {
    let courseId = req.params.id;
    Batch.findOne({
            where: {
                courseId: courseId,
                id: req.params.bid
            }
        })
        .then((batch) => {
            res.status(200).send({
                success: true,
                batch: batch
            })
        })
        .error((error) => {
            res.status(500).send({
                success: false,
                message: "Error! Something is not right"
            })
        })
});

route.post('/addcourse', (req, res) => {
    Course.create(req.body)
        .then((course) => {
            res.status(200).send({
                success: true,
                message: "saved to database"
            })
        })
        .catch(function (err) {
            res.status(500).send({
                success: false,
                message: "Error in database connectivity"
            })
        })
});

route.get('/:id/batches', (req, res) => {
    Batch.findAll({
            where: {
                courseId: req.params.id
            }
        })
        .then((res) => {
            res.status(200).send({
                success: true,
                batches: res.data
            })
        })
        .catch((error) => {
            res.status(500).send({
                success: false
            })
        })
});

module.exports = route;