import Model from './model';
import {getConnection} from './db';
const con = getConnection();

export default class User_Model extends Model {

  getUser(id){

    let sql = 'SELECT * FROM user WHERE id=? ';

    con.query(sql, [id], (err,result) => {
      this.emit(`getuser_${id}`,result[0]);
    });

  };

  addUser(param) {

    let sql = 'UPDATE sec_user_id SET id = LAST_INSERT_ID( id + 1 )';
    con.query(sql,(err,result) => {

      let id = result.insertId;

      let sql = `INSERT INTO user (id,
                                  name,
                                  tel) 
                            VALUES(?,?,?)`;

      let data = [
        id,
        param.name,
        param.tel
      ];

      con.query(sql, data, (err) => {
        if (err) throw err;
        this.emit('adduser', id);
      });
    });

  };

}
