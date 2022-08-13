const Users = require("../models/account-schema");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const adminToken = process.env.ADMIN_TOKEN;
const memberToken = process.env.MEMBER_TOKEN;
const session = require("express-session");

const createUser = (req, res) => {
  //console.log(`User email: ${req.body.email}`);
  Users.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      console.log(err);
    }
    if (!user) {
      console.log("Creating user.");
      bcrypt.hash(req.body.password, 10, (err, hashedPwd) => {
        const newUser = new Users({
          userDisplayName: req.body.displayName,
          username: req.body.username,
          password: hashedPwd,
          accountType: "user",
        });
        newUser
          .save()
          .then(() => {
            res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
    if (user) {
      console.log("user already exists");
      res.redirect("/account/sign-up");
    }
  });
};

// const login = (req, res) => {
//   passport.authenticate("local", function (err, user, info) {
//     console.log("authenticating");
//     if (err) {
//       console.log(err);
//       res.redirect("/");
//     }
//     if (!user) {
//     }
//     req.logIn(user, function (err) {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect("/");
//     });
//   });
// };

// {
//   successRedirect: "/",
//   failureRedirect: "/account/log-in",
//   failWithError: true,
// }
// (req, res) => {
//   // Passport.authenticate successful. Route back to account-router with true value
//   if (req.xhr) {
//     return true;
//   }
// },
// (req, res) => {
//   // Passport.authenticate failed. Route back to account-router with false value
//   if (req.xhr) {
//     return false;
//   }
// }

const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const updateAccountType = (req, res) => {
  switch (req.body.accountUpdateType) {
    case "admin":
      if (req.body.accountUpdatePassword === adminToken) {
        Users.findByIdAndUpdate(
          req.user._id,
          { accountType: "admin" },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/");
            }
          }
        );
      } else {
        res.render("index", {
          title: "Update Membership Form",
          page: "account-membership-update",
          user: req.user,
          alert: ["Incorrect password. Please try again."],
        });
      }
      break;
    case "member":
      if (req.body.accountUpdatePassword === memberToken) {
        Users.findByIdAndUpdate(
          req.user._id.toString(),
          { accountType: "member" },
          (err) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/");
            }
          }
        );
      } else {
        res.render("index", {
          title: "Update Membership Form",
          page: "account-membership-update",
          user: req.user,
          alert: ["Incorrect password. Please try again."],
        });
      }
      break;
  }
};

module.exports = {
  createUser,
  //login,
  logout,
  updateAccountType,
};
