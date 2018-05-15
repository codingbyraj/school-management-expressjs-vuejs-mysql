const express = require("express");
const route = express.Router();
const {
    Student
} = require("../db/db");

route.get('/', (req, res) => {
    Student.findAll().then((students) => {
            res.status(200).send({
                success: true,
                students: students
            })

        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: "Error! Something is not right"
            })
        })
});

route.get('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then((students) => {
            res.status(200).send({
                success: true,
                students: students
            })
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: "Error! Something is not right"
            })
        })
});

route.post('/addstudent', (req, res) => {
    Student.create(req.body)
        .then((student) => {
            res.status(200).send({
                success: true,
                message: "Student Added to Database"
            })
        })
        .catch(function (err) {
            res.status(500).send({
                success: false,
                message: "Error! Something is not right"
            })
        })
});

route.get('/:id/batches', (req, res) => {
    let studentId = req.params.id;
    Batch.findAll({
            where: {
                studentId: studentId
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
module.exports = route;