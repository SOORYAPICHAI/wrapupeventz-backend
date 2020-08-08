const models = require('../models');
var uuid4 = require('uuid4');
const fs = require('fs');

module.exports = (req, res) => {
    const {
category_id
    } = req.body;
    const {
     category,
     questions
    } = models;

    const created_at = new Date(),
        updated_at = new Date();

    const idUUID = uuid4();
   
const FetchCategory = () =>{
    const _variable = {category_id: category_id}
    questions.findAll({
        where: _variable,
        attributes: ['_id', 'question', 'field_json']
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
       if(category_id){

        FetchCategory()
        }

    } catch (e) {
        console.log(e);
        res.status(200).send({ message: 'internal server error', status: 500 });
    }
}