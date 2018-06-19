'use strict';
var express = require('express');
var router = express.Router();

var crudControl = require('../controllers/crudControl');
var authControl = require('../controllers/authControl');

router.use(function timeLog (req, res, next) {
  next()
});
// crudControl API Routes

  router.route('/')
    .get(crudControl.send_greeting);

router.route('/employee/')
  .get(crudControl.send_employees);

router.route('/employee/:employeeId')
  .get(crudControl.send_employee);

router.route('/xml/:employeeId')
  .get(crudControl.send_xml);

//API Routes for Accounts

  router.route('/accounts')
  .post(crudControl.create_account)
  //TODO: do not include get method in production API
  .get(authControl.isValidAccount, crudControl.read_accounts);

  router.route('/accounts/:accountId')
    //TODO: do not include get method in production API
    .get(authControl.isValidAccount, crudControl.read_account)
    .put(authControl.isValidAccount, crudControl.update_account)
    .delete(authControl.isValidAccount, crudControl.delete_account);

//API Routes for Customers
  router.route('/customers')
    .post(authControl.isValidAccount, crudControl.create_customer)
    .get(authControl.isValidAccount, crudControl.read_customers);

  router.route('/customers/:customerId')
    .get(authControl.isValidAccount, crudControl.read_customer)
    .put(authControl.isValidAccount, crudControl.update_customer)
    .delete(authControl.isValidAccount, crudControl.delete_customer);


module.exports = router;
