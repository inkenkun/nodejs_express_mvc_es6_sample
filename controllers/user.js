import User_Model from '../models/user';
import User_Validation from '../validation/user';
const util = require('util');
const model = new User_Model();
const Validation = new User_Validation();

export default class User_Controller {

  getUser(req, res, next){

    let id = req.params.id;

    model.getUser(id);

    model.once(`getuser_${id}`, function(result){
      res.json(result);
    });

  };

  addUser(req, res, next) {

    Validation.add_user_vd(req);
    let errors = req.validationErrors();

    if(errors){
      res.json({ "status": 1, "error": errors});
    } else {

      let param = {
        "name": req.body.name,
        "tel" : req.body.tel
      }

      model.addUser(param);

      model.once('adduser', function(result){
        res.json({ "status": 0, "user_id": result});
      });
    }
      
  };

}

process.on('uncaughtException', function (err) {
  util.log('Caught exception: ' + err);
});

