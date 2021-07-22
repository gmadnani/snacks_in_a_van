const Validator = require("validator");
const isEmpty = require ("isempty");

//check validity of Vendor login inputs
module.exports = function validLoginInput(data){
    let errors = {};

    data.Vname = !isEmpty(data.Vname) ? data.Vname: "";
    data.password = !isEmpty(data.password) ? data.password: "";

    if (Validator.isEmpty(data.Vname)){
        errors.Vname = "Vendor name Required";
    }

    if (Validator.isEmpty(data.password)){
        errors.password = "password Required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};