const models = require('../models');
var uuid4 = require('uuid4');
const fs = require('fs');

module.exports = (req, res) => {
    const {
profile_id,
answers:_answers
    } = req.body;

    console.log("hello", _answers)
    const {
answers
    } = models;

    const created_at = new Date(),
        updated_at = new Date();

    
   
   

    try {
        // create visit record
       if(profile_id){
        const _uploadQuestions = async (user_ids) => {
            return new Promise(async (resolve, reject) => {
                let calls = _answers.map(async (val) => {
                    console.log("---------------", val)
                    let idUUID = uuid4();
                    const __answers = {
                        question_id:val.id,
                        answer:val.answer,
                        _id:idUUID,
                        profile_id:profile_id,
                        createdAt:created_at,
                        updatedAt: updated_at
                    } 
                    return await answers.create(__answers)     
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