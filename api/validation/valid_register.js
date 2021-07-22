const Validator = require("validator");
const isEmpty = require ("isempty");

//check validity of register inputs
module.exports = function validRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name: "";
    data.email = !isEmpty(data.email) ? data.email: "";
    data.password = !isEmpty(data.password) ? data.password: "";
    data.conpass = !isEmpty(data.conpass) ? data.conpass: "";

    if (Validator.isEmpty(data.name)){
        errors.name = "Name Required";
    }

    if (Validator.isEmpty(data.email)){
        errors.email = "Email Required";
    } else if (!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if (!Validator.isLength(data.password, { min : 6, max: 30 })){
        errors.password = "Password must be atleast 6 characters";
    }

    if (Validator.isEmpty(data.password)){
        errors.password = "password Required";
    }

    if (!Validator.equals(data.password, data.conpass)) {
        errors.conpass = "Password does not match";
    }

    if (Validator.isEmpty(data.conpass)){
        errors.conpass = "confirm password Required";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};