/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var Issue = require("../issueModel")

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          
          //fill me in too!
          assert.equal(res.body.issue_title, "Title")
          assert.equal(res.body.issue_text, "text")
          assert.equal(res.body.created_by, "Functional Test - Every field filled in")
          assert.equal(res.body.assigned_to, "Chai and Mocha")
          assert.equal(res.body.status_text, "In QA")
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Required fields filled in',
          
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          
          //fill me in too!
          assert.equal(res.body.issue_title, "Title")
          assert.equal(res.body.issue_text, "text")
          assert.equal(res.body.created_by, "Functional Test - Required fields filled in")
       
          done();
        });
      });
      
      test('Missing required fields', function(done) {
          chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          
          created_by: 'Functional Test - Missing required fields',
          
        })
        .end(function(err, res){
          
          assert.equal(res.status, 200);
          assert.equal(res.text, "required fields not filled in")
          
          //fill me in too!
          
       
          done();
        });
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '5f0e922917790632a80a425f',
          
        })
        .end(function(err, res){
          assert.equal(res.text, "no updated field sent");
          
          //fill me in too!
          
          done();
        });
      });
        
      
      
      test('One field to update', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '5f0e922917790632a80a425f',
          created_by: "Functional Test - One field to update"
          
        })
        .end(function(err, res){
          if (err){
            console.log(err)
          }
          assert.equal(res.text, "successfully updated");
          
          //fill me in too!
          Issue.findById("5f0e922917790632a80a425f", (err, issues)=>{
            assert.equal(issues.created_by, "Functional Test - One field to update")
          })
          
          
          done();
        });
        
      });
      
      test('Multiple fields to update', function(done) {
           chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '5f0e922917790632a80a425f',
          issue_title: "Title updated" ,
          issue_text: 'text updated',
          created_by: "Functional Test - Multiple fields to update",
          assigned_to: 'Chai and Mocha updated',
          status_text: 'In QA updated',
          open: false
          
        })
        .end(function(err, res){
          if (err){
            console.log(err)
          }
          assert.equal(res.text, "successfully updated");
          
          //fill me in too!
          Issue.findById("5f0e922917790632a80a425f", (err, issues)=>{
            assert.equal(issues.issue_title, "Title updated")
            assert.equal(issues.issue_text, "text updated")
            assert.equal(issues.created_by, "Functional Test - Multiple fields to update")
            assert.equal(issues.assigned_to, "Chai and Mocha updated")
            assert.equal(issues.status_text, "In QA updated")
            assert.equal(issues.open, true)
            
          })
          
          
          done();
        });
        
      });
        
      });
      
  
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
         
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
    
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({issue_title: "Title updated"})
        .end(function(err, res){
           console.log(res.body)
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          res.body.forEach(item=>{
            assert.equal(item.issue_title, "Title updated")
          })
          
          done();
        });
        
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
              chai.request(server)
        .get('/api/issues/test')
        .query({
                issue_title: "Title updated", 
                issue_text: "text updated",
                created_by: "Functional Test - Multiple fields to update",
                assigned_to: "Chai and Mocha updated",
                status_text: "In QA updated",
                open: true,
                _id: "5f0e922917790632a80a425f"
              })
        .end(function(err, res){
           console.log(res.body)
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          res.body.forEach(item=>{
            assert.equal(item.issue_title, "Title updated")
            assert.equal(item.issue_text, "text updated")
            assert.equal(item.created_by, "Functional Test - Multiple fields to update")
            assert.equal(item.assigned_to, "Chai and Mocha updated")
            assert.equal(item.status_text, "In QA updated")
            assert.equal(item.open, true)
            assert.equal(item._id, "5f0e922917790632a80a425f")
          })
          
          done();
        });
        
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        
        .end(function(err, res){
          if (err){
            console.log(err)
            return done(err)
          }
          console.log(res.status)
          assert.equal(res.status, 200);
          assert.equal(res.text, "_id error")
          //fill me in too!
          
       
          done();
        });
        
      });
      
      test('Valid _id', function(done) {
             const id="5f0e93699f0411366747a571"
           chai.request(server)
        .delete('/api/issues/test')
        .send({
          
          _id: id,
          
          
        })
        .end(function(err, res){
          if (err){
            console.log(err)
          }
          assert.equal(res.text, "deleted " +id);
          
          //fill me in too!
          Issue.find({}, (err, issues)=>{
            let attemptDel = issues.filter(item=>{
              return item._id === id
            })
            assert.deepEqual(attemptDel, [])
            
          })
          
          
          done();
        });
        
      });
      
    });
  
})


