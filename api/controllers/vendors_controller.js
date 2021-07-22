const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validRegisterInput = require("../validation/valid_Vregister");
const validLoginInput = require("../validation/valid_Vlogin");

let Vendor = require("../models/vendors_model");

//function to change vendor status to ready
exports.changeStatus = (req, res) => {
  console.log(req.body);
  Vendor.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { status: "Ready", location: req.body.location } },
    (error, response) => {
      res.json(response);
    }
  );
};

//function to change vendor status to closed
exports.changeStatusClosed = (req, res) => {
  console.log(req.body);
  Vendor.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { status: "Not-Ready", location: "N/A" } },
    (error, response) => {
      res.json(response);
    }
  );
};

exports.getVendor = (req, res) => {
  Vendor.find({ _id: req.params.id }).exec((error, vendor) => {
    if (error) return res.status(400).json({ error });
    if (vendor) {
      console.log(vendor);
      res.status(200).json({ vendor });
    }
  });
};

//function to get all vendors
exports.get_all_vendors = (req, res) => {
  Vendor.find()
    .then((vendors) => res.json(vendors))
    .catch((err) => res.status(400).json("Error: " + err));
};

//function to register a vendor
exports.register = (req, res) => {
  const { errors, isValid } = validRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Vendor.findOne({ Vname: req.body.Vname }).then((vendor) => {
    if (vendor) {
      return res.status(400).json({ Vname: "Vendor name already exists" });
    }
  });

  const newVendor = new Vendor({
    Vname: req.body.Vname,
    password: req.body.password,
  });

  //storing it as a hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newVendor.password, salt, (err, hash) => {
      if (err) throw err;
      newVendor.password = hash;
      newVendor
        .save()
        .then((vendor) => res.json(vendor))
        .catch((err) => console.log(err));
    });
  });
};

//function to login as a vendor
exports.login = (req, res) => {
  const { errors, isValid } = validLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const Vname = req.body.Vname;
  const password = req.body.password;

  // Find user by Vname
  Vendor.findOne({ Vname }).then((vendor) => {
    // Check if user exists
    if (!vendor) {
      return res.status(404).json({ Vnamenotfound: "Vendor name not found" });
    }

    // Check password
    bcrypt.compare(password, vendor.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: vendor.id,
          Vname: vendor.Vname,
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: "3h",
          },
          (err, token) => {
            res.json({
              payload,
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};

exports.requireVendorLogin = (req, res, next) => {
  const token = req.headers.authorization;
  const vendor = jwt.verify(token, process.env.JWT_SECRET);
  req.vendor = vendor;
  next();
};
