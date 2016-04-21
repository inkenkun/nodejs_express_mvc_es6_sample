import Auth_Validation from '../validation/auth';
const Validation = new Auth_Validation();

export default class Auth_Controller {

  login(req, res, next) {

    Validation.login_vd(req);
    let errors = req.validationErrors();

    if(errors){
      res.json({ "status": 1, "error": errors});
    } else {

      req.session.uid = req.body.id;
      res.json({ "status": 0});
    }
      
  };

  logout(req, res, next) {

    req.session.destroy();
    res.json({ "status": 0});
      
  };
}

process.on('uncaughtException', function (err) {
  util.log('Caught exception: ' + err);
});

