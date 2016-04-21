
export default class User_Validation {
  
  add_user_vd(req){
    req.checkBody('name', 'nameを入力してください').notEmpty();
    req.checkBody('tel', 'telを入力してください').notEmpty();
  };
}
