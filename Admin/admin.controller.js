const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const Role = require("_helpers/role");

const adminService = require("./admin.service");

// routes
// router.get('/', (req, res) => res.send('Example Home page!'))
router.get("/failed", (req, res) => res.send("You Failed to log in!"));

router.get("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logOut();
    return res.redirect("/admin"); // Handle valid logout
  }

  return res.status(401); // Handle unauthenticated response
});

// In this route you can see that if the user is logged in u can acess his info in: req.user

router.post("/authenticate", authenticateSchema, authenticate);
router.post("/refresh-token", refreshToken);
router.post("/revoke-token", authorize(), revokeTokenSchema, revokeToken);
router.post("/register", registerSchema, register);

router.post("/verify-email", verifyEmailSchema, verifyEmail);
router.post("/forgot-password", forgotPasswordSchema, forgotPassword);
router.post(
  "/validate-reset-token",
  validateResetTokenSchema,
  validateResetToken
);
router.post("/reset-password", resetPasswordSchema, resetPassword);
router.get("/", getAll);
router.get("/:id", authorize(), getById);
// router.post('/', authorize(Role.Admin), createSchema, create);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/block/:id", _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  console.log("hello controller");
  const { email, password } = req.body;
  const ipAddress = req.ip;
  adminService
    .authenticate({
      email,
      password,
      ipAddress,
    })
    .then(({ refreshToken, ...account }) => {
      setTokenCookie(res, refreshToken);
      res.json(account);
    })
    .catch(next);
}

function refreshToken(req, res, next) {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;
  adminService
    .refreshToken({
      token,
      ipAddress,
    })
    .then(({ refreshToken, ...account }) => {
      setTokenCookie(res, refreshToken);
      res.json(account);
    })
    .catch(next);
}

function revokeTokenSchema(req, res, next) {
  const schema = Joi.object({
    token: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}

function revokeToken(req, res, next) {
  // accept token from request body or cookie
  const token = req.body.token || req.cookies.refreshToken;
  const ipAddress = req.ip;

  if (!token)
    return res.status(400).json({
      message: "Token is required",
    });

  // users can revoke their own tokens and admins can revoke any tokens
  if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
    return res.status(401).json({
      message: "Unauthorizedd",
    });
  }

  adminService
    .revokeToken({
      token,
      ipAddress,
    })
    .then(() =>
      res.json({
        message: "Token revoked",
      })
    )
    .catch(next);
}

function registerSchema(req, res, next) {
  console.log("validation se phle");
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    mobile: Joi.string().required(),
    super: Joi.boolean(),
    email: Joi.string().email().required(),
    gender: Joi.string().required(),
    dob: Joi.string().required(),
    password: Joi.string().min(6).required(),
    social_provider: Joi.string(),
    // confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    // acceptTerms: Joi.boolean().valid(true).required(),
  });
  validateRequest(req, next, schema);
  console.log("validation se bad");
}

function register(req, res, next) {
  console.log("api se phle");
  adminService
    .register(req.body, req.get("origin"))
    .then(() =>
      res.json({
        message:
          "Registration successful.",
      })
    )
    .then(() => console.log("api k baad"))
    .catch(next);
}

function verifyEmailSchema(req, res, next) {
  const schema = Joi.object({
    otp: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  validateRequest(req, next, schema);
}

function verifyEmail(req, res, next) {
  adminService
    .verifyEmail(req.body)
    .then(() =>
      res.json({
        message: "Verification successful, you can now login",
      })
    )
    .catch(next);
}

function forgotPasswordSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  validateRequest(req, next, schema);
}

function forgotPassword(req, res, next) {
  adminService
    .forgotPassword(req.body, req.get("origin"))
    .then(() =>
      res.json({
        message: "Please check your email for password reset instructions",
      })
    )
    .catch(next);
}

function validateResetTokenSchema(req, res, next) {
  const schema = Joi.object({
    otp: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function validateResetToken(req, res, next) {
  adminService
    .validateResetToken(req.body, req.get("origin"))
    .then(() =>
      res.json({
        message: "Token is valid",
      })
    )
    .catch(next);
}

function resetPasswordSchema(req, res, next) {
  const schema = Joi.object({
    otp: Joi.string().required(),
    // email:Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  });
  validateRequest(req, next, schema);
}

function resetPassword(req, res, next) {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  var origin = req.get('origin');
  console.log("origin ====> ",origin)
  adminService
    .resetPassword(req.body, req.get("origin"))
    .then(() =>
      res.json({
        message: "Password reset successful, you can now login",
      })
    )
    .catch(next);
}

function getAll(req, res, next) {
  adminService
    .getAll()
    .then((accounts) => res.json(accounts))
    .catch(next);
}

function getById(req, res, next) {
  // users can get their own account and admins can get any account
  if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
    return res.status(401).json({
      message: "Unauthorizedd",
    });
    
  }

  adminService
    .getById(req.params.id)
    .then((account) => (account ? res.json(account) : res.sendStatus(404)))
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    role: Joi.string().valid(Role.Admin, Role.User).required(),
  });
  validateRequest(req, next, schema);
}

function create(req, res, next) {
  adminService
    .create(req.body)
    .then((account) => res.json(account))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schemaRules = {
    title: Joi.string().empty(""),
    firstName: Joi.string().empty(""),
    lastName: Joi.string().empty(""),
    email: Joi.string().email().empty(""),
    password: Joi.string().min(6).empty(""),
    confirmPassword: Joi.string().valid(Joi.ref("password")).empty(""),
  };

  // only admins can update role
  if (req.user.role === Role.Admin) {
    schemaRules.role = Joi.string().valid(Role.Admin, Role.User).empty("");
  }

  const schema = Joi.object(schemaRules).with("password", "confirmPassword");
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  // users can update their own account and admins can update any account
  console.log("0000")
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
  console.log("0000")

    return res.status(401).json({
      message: "Unauthorizedd",
    });
  }

  adminService
    .update(req.params.id, req.body)
    .then((account) => res.json(account))
    .catch(next);
}

function _delete(req, res, next) {
  // users can delete their own account and admins can delete any account
  // if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
  //     return res.status(401).json({ message: 'Unauthorized' });
  // }
  console.log("sss");
  adminService
    .delete(req.params.id)
    .then(() =>
      res.json({
        message: "Account deleted successfully",
      })
    )
    .catch(next);
}

// helper functions

function setTokenCookie(res, token) {
  // create cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  res.cookie("refreshToken", token, cookieOptions);
}

function something(req, res, next) {
  console.log("something");
}

function google(req, res, next) {
  adminService
    .google(req.user, req.get("origin"))
    .then(({ ...googleUser }) => {
      res.json(googleUser);
    })
    .catch(next);
}

function facebook(req, res, next) {
  adminService
    .facebook(req.user, req.get("origin"))
    .then(({ ...facebookUser }) => {
      res.json(facebookUser);
    })
    .catch(next);
}

function student_loginSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function student_login(req, res, next) {
  console.log("hello controller");
  const { email, password } = req.body;
  const ipAddress = req.ip;
  adminService
    .student_login({
      email,
      password,
      ipAddress,
    })
    .then(({ refreshToken, ...account }) => {
      setTokenCookie(res, refreshToken);
      res.json(account);
    })
    .catch(next);
}

function teacher_loginSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function teacher_login(req, res, next) {
  console.log("hello controller");
  const { email, password } = req.body;
  const ipAddress = req.ip;
  adminService
    .teacher_login({
      email,
      password,
      ipAddress,
    })
    .then(({ refreshToken, ...account }) => {
      setTokenCookie(res, refreshToken);
      res.json(account);
    })
    .catch(next);
}
