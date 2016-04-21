
export default class Auth_Validation {

  login_vd(req){
    req.checkBody('id', 'idを入力してください').notEmpty();
    req.checkBody('pass', 'passを入力してください').notEmpty();
    req.checkBody('id', 'idかpassが違います').equals('id');
    req.checkBody('pass', 'idかpassが違います').equals('pass');
  };
}
