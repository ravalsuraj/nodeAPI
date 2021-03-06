'use strict';
var mongoose = require('mongoose');
var Account = mongoose.model('Accounts');
var Customer = mongoose.model('Customers');
var o2x = require('object-to-xml');

exports.send_greeting = function(req, res){
  res.send({message:"Welcome to the Suraj Raval's API"});
};

exports.send_employee = function (req, res) {
  var empId = req.params.employeeId;
  if(empId=="1234"||empId=="5643"){
    res.json({ "responseCode": "0", "employeeID": empId });
  }
  else{
    res.json({"responseCode":"40"});
  }
};

exports.send_xml_employee = function(req, res){
  const empId = req.params.employeeId;
  let response ={responseCode:"",employeeID:""};

  if (empId == "1234" || empId == "5643") {
   
    response.responseCode=0;
    response.employeeID = empId;
  }
  else{
    response.responseCode = 40;
  }
  res.set('Content-Type', 'application/xml');
  res.send(o2x({ '?xml version="1.0" encoding="utf-8"?': null, response}));
  
}

exports.send_callInfo = function(req, res) {
  let response = {employeeID: req.body.request.id};
  
  res.set('Content-Type', 'application/xml');
  res.send(o2x({ '?xml version="1.0" encoding="utf-8"?': null, response }));
  
};
exports.insetCallInfo = function (req, res) {
  console.log("Insert Call Info called__");
  let response = {reasonCode: "", timestamp:""};
  response.reasonCode = 0;
  //respons.timestamp = new Date().toString();
  res.set('Content-Type', 'application/xml');
  res.send(o2x({ '?xml version="1.0" encoding="utf-8"?': null, response }));
};

exports.add_xml_employee = function(req, res){
  let id = req.body.id;
  console.log(id);
  res.send("Received: " + id)
}

exports.send_employees = function (req, res) {
  
  res.send({ "responseCode": "0", "employeeID": "5643" });
};

exports.read_customers = function(req, res){
  Customer.find({},function(err,customer){
    if(err){
      res.send(err);
    }
    res.json(customer);
  });
};

exports.create_customer = function(req, res){
  var new_customer = new customer(req.body);
  new_customer.save(function(err,customer){
    if(err){
      res.send(err);
    }
    res.json(Customer);
  });

};

exports.read_customer = function(req, res){
  Customer.findById(req.params.customerId,function(err,customer){
    if(err){
      res.send(err);
    }
    res.json(Customer);

  });
};

exports.update_customer = function(req, res) {
  Customer.findOneAndUpdate(
    {
      _id: req.params.customerId
    },
    req.body, {new: true},
    function(err, customer) {
    if (err)
      res.send(err);
    res.json(Customer);
  });
};
exports.delete_customer = function(req, res) {
  Customer.remove({_id: req.params.customerId}, function(err, customer) {
    if (err)
      res.send(err);
    res.json({ message: 'customer successfully deleted' });
  });
};

/*********************************************
**********************************************/


exports.create_account = function(req, res){
  var new_account = new Account(req.body);
  new_account.save(function(err,account){
    if(err){
      res.send(err);
    }
    res.json(account);
  });

};

exports.read_accounts = function(req, res){
  Account.find({},function(err,account){
    if(err){
      res.send(err);
    }
    res.json(account);
  });
};

exports.read_account = function(req, res){
  Account.findById(req.params.accountId,function(err,account){
    if(err){
      res.send(err);
    }
    res.json(account);

  });
};

exports.update_account = function(req, res) {
  Account.findOneAndUpdate({_id: req.params.accountId}, req.body, {new: true},
    function(err, account) {
    if (err)
      res.send(err);
    res.json(account);
  });
};

exports.delete_account = function(req, res) {
  Account.remove({_id: req.params.accountId}, function(err, account) {
    if (err)
      res.send(err);
    res.json(
      {
        message: 'Account: '+ req.params.accountId + ' successfully deleted'
      }
    );
  });
};

