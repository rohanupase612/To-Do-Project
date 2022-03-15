// var fs= require("fs");
var express= require("express");
var body_parser= require("body-parser");
var cookie_parser= require("cookie-parser");
var multer= require("multer");
const User = require("./models/User");
const Task = require("./models/Task");
const { json, cookie } = require("express/lib/response");

var app= express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("pages"));


 app.get("/login", function(req, res){
     res.sendFile(__dirname+"/pages/index.html");
          // res.send("Welcome to to_do_list");
 });

 
 app.get("/registerform", function(req, res){
    res.sendFile(__dirname+"/pages/register.html");
});

//     if(cookie.usertype=="user"){
//         // res.redirect("/login")
//     }
//          // res.send("Welcome to to_do_list");
app.get("/user", function(req, res){
    res.sendFile(__dirname+"/user.html");
         // res.send("Welcome to to_do_list");
});

      app.post("/register", async(req,res)=>{
          let body= req.body;
          let user= new User.User();
          user.id= 0;
          user.name= body.data.name; 
          user.email= body.data.email;
          user.password= body.data.password;
          user.register().then(result=>{
              let data= {
                    "data":{
                              "id": result.insertId,
                              "status":"Success"
                    }
              };
              res.end(JSON.stringify(data));
          },
          err=>{
                    console.log("Error : "+err);
                        let data= {
                              "data":{
                                        "status":"Failed"
                              }
                        };
                        res.end(JSON.stringify(data));
          });
      });
      app.post("/login",(req, res)=>{
        let body= req.body;
              let user= new User.User();
              user.email= body.data.email;
              user.password= body.data.password;

              user.login().then(result=>{
                let data = {
                                "status":"failure"
                }
                if(result.length != 0){
                    data= {
                        "status": "Success",
                        "data": result
                    }
                }
                res.end(JSON.stringify(data));
            },
            err=>{
                      // console.log(err);
                          let data= {
                                "data":{
                                          "status":"Failed"
                                }
                          }
                          res.end(JSON.stringify(data));
            });
        });
        app.post("/savetask",(req, res)=>{
            let body= req.body;
                  let task= new Task.Task();
                  task.id= body.data.id;
                  task.user_id= body.data.user_id;
                  task.t_date= body.data.t_date;
                  task.t_time= body.data.t_time;
                  task.task= body.data.task;
                
                  task.save().then(result=>{
                      console.log(result);
                    let data ={
                                    "status":"inserted"
            }
                   if(result.length !=0){
                        if(result.insertId==0){
                            data= {
                                "status": "inserted"
                                // "data":result
                            }
                        }
                        // else{
                        //     data= {
                        //         "status": "Succefully inserted"
                        //         // "data":result
                        //     }
                        // }
                        
                        
                    }
                    res.end(JSON.stringify(data));
                },
                err=>{
                          // console.log(err);
                              let data= {
                                    "data":{
                                              "status":"Failed"
                                    }
                              }
                              res.end(JSON.stringify(data));
                              console.log(err);
                });
            });

            app.post("/deletetask",(req, res)=>{
                let body= req.body;
                      let task= new Task.Task();
                      task.id= body.data.id;
                    //   task.status= body.data.status;
                    
                      task.deletetask().then(result=>{
                          console.log(result);
                        let data ={
                                        "status":"Deleted"
                }
                      
                        res.end(JSON.stringify(data));
                    },
                    err=>{
                              // console.log(err);
                                  let data= {
                                        "data":{
                                                  "status":"Failed"
                                        }
                                  }
                                  res.end(JSON.stringify(data));
                                  console.log(err);
                    });
                });

                app.post("/changestatus",(req, res)=>{
                    let body= req.body;
                          let task= new Task.Task();
                          task.id= body.data.id;
                          task.status= body.data.status;
                        
                          task.changestatus().then(result=>{
                              console.log(result);
                            let data ={
                                            "status":"Changed"
                    }
                          
                            res.end(JSON.stringify(data));
                        },
                        err=>{
                                  // console.log(err);
                                      let data= {
                                            "data":{
                                                      "status":"Failed"
                                            }
                                      }
                                      res.end(JSON.stringify(data));
                                      console.log(err);
                        });
                    });
    
                    app.post("/gettask",(req,res)=>{
                        let body = req.body;
                        let task = new Task.Task();
                        task.id = body.data.id;
                        task.gettask().then(result=>{
                            // console.log("Result");
                            // console.log(result);
                            let data ={
                                "status":"Failed"
                            }
                            if(result.length !=0){
                                data ={
                                    data: result
                                }            
                            }
                            res.end(JSON.stringify(data));
                        },
                        err=>{
                            console.log("Error : " + err);
                            let data = {
                                "data":{
                                    "status":"fail"
                                }
                            };
                            res.end(JSON.stringify(data));
                        });
                    });
                    
                    app.post("/listtask",(req,res)=>{
                        let body = req.body;
                        let task = new Task.Task();
                        task.user_id = body.data.user_id;
                        
                        task.select().then(result=>{
                            console.log("Result");
                            console.log(result);
                            let data ={
                                "status":"fail"
                            }
                            if(result.length !=0){
                                data = {
                                    "status" : "success",
                                    "data" : result
                                     }
                            }
                            console.log(data);
                            res.end(JSON.stringify(data));
                        },
                        err=>{
                            console.log("Error : " + err);
                            let data = {
                                "data":{
                                    "status":"fail"
                                }
                            };
                            res.end(JSON.stringify(data));
                        });
                    });
                    // app.post("/select",(req, res)=>{
                    //     let body= req.body;
                    //           let task= new Task.Task();
                    //           task.id= body.data.id;
                    //           task.status= body.data.status;
                            
                    //           task.changestatus().then(result=>{
                    //               console.log(result);
                    //             let data ={
                    //                             "status":"Changed"
                    //     }
                              
                    //             res.end(JSON.stringify(data));
                    //         },
                    //         err=>{
                    //                   // console.log(err);
                    //                       let data= {
                    //                             "data":{
                    //                                       "status":"Failed"
                    //                             }
                    //                       }
                    //                       res.end(JSON.stringify(data));
                    //                       console.log(err);
                    //         });
                    //     });

 app.listen(8081, function(){
           console.log("Server Started");
 });