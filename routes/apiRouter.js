"use strict";
var express = require("express");
var router = express.Router();

var apiControl = require("../controllers/apiControl");
var authControl = require("../controllers/authControl");

router.use(function timeLog(req, res, next) {
  next();
});
// apiControl API Routes

router.route("/").get(apiControl.send_greeting);

router.route("/employee/").get(apiControl.send_employees);

router.route("/employee/:employeeId").get(apiControl.send_employee);

router
  .route("/xml/:employeeId")
  .get(apiControl.send_xml_employee)
  .post(apiControl.add_xml_employee);

router.route("/callInfo/").post(apiControl.send_callInfo);
//API Routes for Accounts

router
  .route("/accounts")
  .post(apiControl.create_account)
  //TODO: do not include get method in production API
  .get(authControl.isValidAccount, apiControl.read_accounts);

router
  .route("/accounts/:accountId")
  //TODO: do not include get method in production API
  .get(authControl.isValidAccount, apiControl.read_account)
  .put(authControl.isValidAccount, apiControl.update_account)
  .delete(authControl.isValidAccount, apiControl.delete_account);

//API Routes for Customers
router
  .route("/customers")
  .post(authControl.isValidAccount, apiControl.create_customer)
  .get(authControl.isValidAccount, apiControl.read_customers);

router
  .route("/customers/:customerId")
  .get(authControl.isValidAccount, apiControl.read_customer)
  .put(authControl.isValidAccount, apiControl.update_customer)
  .delete(authControl.isValidAccount, apiControl.delete_customer);

module.exports = router;
