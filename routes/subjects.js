const express = require("express");
const route = express.Router();
const {
    Subject
} = require("../db/db");
const {
    Teacher
} = require("../db/db");
route.get('/', (req, res) => {
    Subject.findAll().then((subjects) => {
            res.status(200).send({
                success: true,
                subjects: subjects
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
    Subject.findById(req.params.id)
        .then((subjects) => {
            res.status(200).send({
                success: true,
                subjects: subjects
            })
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: "Error! Something is not right"
            })
        })
});

route.get('/:id/teachers', (req, res) => {
    let subjectId = req.params.id;
    Teacher.findAll({
            where: {
                subjectId: subjectId
            }
        })
        .then((teachers) => {
            res.status(200).send({
                success: true,
                teachers: teachers
            })
        })
        .error((error) => {
            res.status(500).send({
                success: false,
                message: "Error! Something is not right"
            })
        })
});

route.post('/addsubject', (req, res) => {
    Subject.create(req.body)
        .then((subject) => {
            res.status(200).send({
                success: true
            })
        })
        .catch(function (err) {
            res.status(500).send({
                success: false,
                message: "Error! Something is not right"
            })
        })
});

module.exports = route;