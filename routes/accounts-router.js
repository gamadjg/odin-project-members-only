const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const accountController = require("../controllers/account-controller");
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("index", {
    title: "User Account",
    page: "account-user",
    user: req.user,
  });
});

router.get("/log-in", function (req, res) {
  res.render("index", {
    title: "Account Login",
    page: "account-log-in",
    user: req.user,
  });
});

router.post(
  "/log-in",
  passport.authenticate(
    "local",
    {
      successRedirect: "/",
      failureRedirect: "/account/log-in",
      //    failureRedirect: "/account/log-in",
    },
    (req, res, info) => {
      console.log(req.session.messages);
    }
  )
);

// (req, res, next) => {
//   console.log(req.session.messages);
//   res.render("index", {
//     title: "Account Login",
//     page: "account-log-in",
//     user: req.user,
//   });
// }
// );

//   function (err, user, info) {
//     console.log("authenticating");
//     if (err) {
//       res.render("404", { title: "ERROR", user: req.user });
//     }
//     if (!user) {
//       res.render("index", {
//         title: "Account Login",
//         page: "account-log-in",
//         user: req.user,
//         alert: info.message,
//       });
//     }
//   })
// );
// function (req, res) {
//   check("username", "Email is not valid.").isEmail();
//   check("password", "Missing password.").exists();

//   console.log("login validation complete");

// const errors = validationResult(req);

// if (!errors.isEmpty()) {
//   console.log("errors");
//   const alert = errors.array();
//   console.log(alert);
//   res.render("index", {
//     title: "Account Login",
//     page: "account-log-in",
//     user: req.user,
//     alert,
//   });
// } else {
// passport.authenticate("local", function (err, user, info) {
//   console.log("authenticating");
//   if (err) {
//     res.render("404", { title: "ERROR", user: req.user });
//   }
//   if (!user) {
//     res.render("index", {
//       title: "Account Login",
//       page: "account-log-in",
//       user: req.user,
//       alert: info.message,
//     });
//   }
// req.logIn(user, function (err) {
//   if (err) {
//     return next(err);
//   }
//   return res.redirect("/");
// });
// });
//  }
//accountController.login(req, res);
//});
//);

router.get("/sign-up", (req, res) => {
  res.render("index", {
    title: "Account Sign Up",
    page: "account-sign-up",
    user: req.user,
  });
});

router.post(
  "/sign-up",
  [
    check("username", "Email is not valid.").isEmail(),
    check("password", "Missing password.").exists(),
    check("confirmPassword", "Passwords do not match.")
      .trim()
      .custom((confirmPassword, { req }) => {
        const password = req.body.password;

        if (password !== confirmPassword) {
          throw new Error("Passwords must be same");
        }
      }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors) {
      const alert = errors.array();
      res.render("index", {
        title: "Account Sign Up",
        page: "account-sign-up",
        user: req.user,
        alert,
      });
    } else {
      accountController.createUser(req, res);
    }
  }
);

router.get("/update-account-type", (req, res) => {
  res.render("index", {
    title: "Update Membership Form",
    page: "account-membership-update",
    user: req.user,
  });
});

router.post("/update-account-type", (req, res) => {
  accountController.updateAccountType(req, res);
});

router.get("/log-out", (req, res) => {
  accountController.logout(req, res);
});

module.exports = router;
