const models = require('../models');
var uuid4 = require('uuid4');
const fs = require('fs');
module.exports = (req, res) => {
    const {
email,mobile,name,photo,gender,dob,city_state,pincode
    } = req.body;
    const {
     profile,
    } = models;

    const created_at = new Date(),
        updated_at = new Date();

    const idUUID = uuid4();
   
    try {
        // create visit record
        try {
            const __id = idUUID
            const _newcategory = {
                _id : idUUID,
                email:email,
                mobile:mobile,
                name:name,
                photo:photo,
                gender:gender,
                dob:dob,
                city_state:city_state,
                pincode:pincode,
                createdAt:created_at,
                updatedAt: updated_at
            }
            profile.create(_newcategory).then(val=>{

                res.status(200).send({ message: 'Saved successfully', _val:val});
            })
            .catch(err=>{
                console.log(err)
                res.status(500).send({ message: 'internal     error 2', status: false });
            })
          
        } catch (error) {
            
        }
    } catch (e) {
        console.log(e);
        res.status(200).send({ message: 'internal server error', status: 500 });
    }
}