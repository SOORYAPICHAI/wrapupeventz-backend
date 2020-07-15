const models = require('../models');
var uuid4 = require('uuid4');
const fs = require('fs');

module.exports = (req, res) => {
    const {
profile_id
    } = req.body;
    const {
     answers,
    profile,
    questions,
    category
    } = models;

    const created_at = new Date(),
        updated_at = new Date();

    const idUUID = uuid4();
   
const FetchCategory = () =>{
    const _variable = {profile_id:profile_id}
    let _arr = []
    answers.findAll({
        where: _variable,
        include: 
            {
                model: questions
            }
            
    })
        .then((data) => {

            return res.send(data)

        }).catch((error) => {
            console.log(error)
            res.status(500).send({ message: 'username and Password not valid', status: false });
        });
}   

    try {
        // create visit record
       if(profile_id){

        FetchCategory()
        }
       
    } catch (e) {
        console.log(e);
        res.status(200).send({ message: 'internal server error', status: 500 });
    }
}