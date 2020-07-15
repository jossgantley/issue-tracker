/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var Issue = require("../issueModel")

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
MongoClient.connect(CONNECTION_STRING, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, (err, db)=>{
  
})




module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
      Issue.find(req.query, (err, issues)=>{})
      .then(issues=>res.json(issues))
      .catch(err=>console.log(err))
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      const issue_title = req.body.issue_title;
      const issue_text = req.body.issue_text;
      
      const created_by = req.body.created_by;
      const assigned_to = req.body.assigned_to;
      const open = true;
      const status_text = req.body.status_text;
      
    
      if(!issue_title || !issue_text || !created_by ){
      res.status(200).send("required fields not filled in")
        
      } else {
      const newIssue = new Issue({
        issue_title,
        issue_text,
         created_on: new Date(),
        updated_on: new Date(),
        created_by,
        assigned_to,
        open,
        status_text
      }).save().then((issue)=>res.json(issue))
      .catch(err=>console.log(err))
    }})
    
    .put(function (req, res){
      var project = req.params.project;
      
    Issue.findById(req.body._id)
    .then(issue=>{
      
      const issue_title = req.body.issue_title;
      
      const issue_text = req.body.issue_text;
      
      const created_by = req.body.created_by;
      const assigned_to = req.body.assigned_to;
      
      const open = req.body.open;
      
      const status_text = req.body.status_text;
    
    if(!issue_title && !issue_text && !created_by && !assigned_to && !status_text && open===undefined){
      res.send("no updated field sent")
    } else {
      function isTruth(property){
        if (property){return property}
      }
      
      issue.issue_title =isTruth(issue_title)
      issue.issue_text= isTruth(issue_text)
      issue.created_by =isTruth(created_by)
      issue.assigned_to= isTruth(assigned_to)
      issue.status_text= isTruth(status_text)
      issue.updated_on = new Date();
      if (open==="checked"){
        issue.open = false
      }
    }
    
    issue.save(err=>{
      if(err){console.log(err)}
      else{res.send("successfully updated")}
    })
      
    })
    
    .catch(()=>res.send("could not update"+req.body._id))

      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      let id = req.body._id
      if (id){
      Issue.findByIdAndDelete(id, err=>{
        if (err){res.send("could not delete " + id)
      }else{res.send("deleted " +id)}})
      
      }else {
        res.status(200).send("_id error")
      }
    });
    
};
