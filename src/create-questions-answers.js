const models = require('../models');
var uuid4 = require('uuid4');
const fs = require('fs');

module.exports = (req, res) => {
    const {
questions:_questions,
category:_category,
category_id
    } = req.body;
console.log(_questions.constructor === Array,"_questions")
    const {
     category,
     questions
    } = models;

    const created_at = new Date(),
        updated_at = new Date();

    const idUUID = uuid4();
   
   

    try {
        // create visit record
       if(category_id){
        _questions.map(val=>{
        const __questions = {
            category_id:category_id,
            question:val,
            _id:idUUID,
            createdAt:created_at,
            updatedAt: updated_at
        }
        questions.create(__questions)
        .then(async (data) => {
            res.status(200).send({message:'data saved successfully'});
        }).catch((error) => {
            console.log(error)
            res.status(500).send({ message: 'internal server error 2', status: false });
        });
       })
        }
        else{
try {
    const __id = idUUID
    const _newcategory = {
        _id : __id,
        type:_category,
        createdAt:created_at,
        updatedAt: updated_at
    }
    category.create(_newcategory).then(val=>{
        _questions.map(val=>{
            const __questions = {
                category_id:__id,
                question:val,
                _id:idUUID,
                createdAt:created_at,
                updatedAt: updated_at
            }
            questions.create(__questions)
            .then(async (data) => {
                res.status(200).send({message:'data saved successfully'});
            }).catch((error) => {
                console.log(error)
                res.status(500).send({ message: 'internal server error 2', status: false });
            });
           })
    })
    .catch(val=>{
        res.status(500).send({ message: 'internal server error 2', status: false });
    })
  
} catch (error) {
    
}
        }
    } catch (e) {
        console.log(e);
        res.status(200).send({ message: 'internal server error', status: 500 });
    }
}