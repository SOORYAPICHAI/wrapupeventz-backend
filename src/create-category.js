const models = require('../models');
var uuid4 = require('uuid4');
const fs = require('fs');

module.exports = (req, res) => {
    const {
category:_category,
category_id,
view_categories
    } = req.body;
    const {
     category,
    } = models;

    const created_at = new Date(),
        updated_at = new Date();

    const idUUID = uuid4();
   
const FetchCategory = () =>{
    const _variable = _category ? {type: _category} :  {_id: category_id}
    category.findOne({
        where: _variable,
        attributes: ['_id']
    })
        .then((data) => {
            return res.send(data)

        }).catch((error) => {
            console.log(error)
            res.status(500).send({ message: 'username and Password not valid', status: false });
        });
}   


const FetchAllCategory = () =>{
    const _variable = _category ? {type: _category} :  {_id: category_id}
    category.findAll({
        // where: _variable,
        attributes: ['_id', 'type']
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
        else if(view_categories){
            FetchAllCategory()
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
        FetchCategory()
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