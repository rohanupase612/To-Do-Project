var Database = require("../models/Database");

class Task {
  id = 0;
  user_id = 0;
  t_date = "";
  t_time = "";
  task = "";
  db = new Database.Database();

  constructor() {
    this.id = 0;
    this.user_id = 0;
    this.t_date = "";
    this.t_time = "";
    this.task = "";
    this.status = "";
  }


  save = () => {
    if (this.id == 0) {
      this.query = "INSERT INTO tasks(user_id, t_date, t_time, task, status) ";
      this.query += " VALUES(" + this.user_id + ", '" + this.t_date + "', '" + this.t_time + "', '" + this.task + "', 'open')";
    }
    else {
      this.query = "UPDATE tasks SET user_id= " + this.user_id + ",t_date='" + this.t_date + "',t_time='" + this.t_time + "',task= '" + this.task + "'";
      this.query += "WHERE id='" + this.id + "'";
    }

    console.log(this.query);
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
    //  console.log("save task");
  }
  deletetask = () => {
    this.query = "DELETE FROM tasks WHERE id= '" + this.id + "'";
    return new Promise((resolve, reject) => {
      this.db.query(this.query, (err, result) => {
        this.db.close();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

    changestatus = () => {
      this.query = "UPDATE tasks SET status=  '"+ this.status+"' " ;
      this.query+=  "WHERE id="+this.id;
      return new Promise((resolve, reject) => {
        this.db.query(this.query, (err, result) => {
          this.db.close();
          if (err){
            return reject(err);
          }
          resolve(result);
        });
      });
    }

    select = () => {
      this.query = "select * FROM tasks " ;
      this.query+=  " WHERE user_id= "+this.user_id;
     // console.log(this.query);
      return new Promise((resolve, reject) => {
        this.db.query(this.query, (err, result) => {
          this.db.close();
          if (err){
            return reject(err);
          }
          resolve(result);
        });
      });
    }

    gettask = () => {
      this.query = "select * FROM tasks " ;
      this.query+=  " WHERE id= "+this.id;
     // console.log(this.query);
      return new Promise((resolve, reject) => {
        this.db.query(this.query, (err, result) => {
          this.db.close();
          if (err){
            return reject(err);
          }
          resolve(result);
        });
      });
    }
}
module.exports = {
  Task: Task
}