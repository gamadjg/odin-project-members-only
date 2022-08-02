const express = require("express");
const router = express.Router();
const { body, validationResult, check } = require("express-validator");
const accountController = require("../controllers/account-controller");

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

router.post("/log-in", (req, res) => {
  accountController.login(req, res);
});

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
