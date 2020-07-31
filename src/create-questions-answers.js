const models = require('../models');
var uuid4 = require('uuid4');
const fs = require('fs');

module.exports = (req, res) => {
    const {
questions:_questions,
category_id
    } = req.body;
console.log("-------------------------------------------------------")
console.log(_questions.constructor)
console.log("-------------------------------------------------------")
    const {
     category,
     questions
    } = models;

    const created_at = new Date(),
        updated_at = new Date();

    
   
   

    try {
        // create visit record
       if(category_id){
        const _uploadQuestions = async (user_ids) => {
            return await new Promise(async (resolve, reject) => {
                let calls = _questions.map(async (val) => {
                    console.log(val.constructor, 'val.constructor')
                    let idUUID = uuid4();
                    const __questions = {
                        category_id:category_id,
                        question:val.label,
                        field_json:val,
                        _id:idUUID,
                        createdAt:created_at,
                        updatedAt: updated_at
                    }
                    console.log(__questions,"__questions__questions")
                    return await questions.create(__questions)    
                })
                await Promise.all(calls).then(data => {
                    resolve(true);
                })
                    .catch(err => {
                        console.log(err);
                        reject(false)
                    })
            })
        }
    
_uploadQuestions().then(val=>{
    res.status(200).send({message:'data saved successfully'});
   }).catch(()=>{})
        }
     
    } catch (e) {
        console.log(e);
        res.status(200).send({ message: 'internal server error', status: 500 });
    }
}