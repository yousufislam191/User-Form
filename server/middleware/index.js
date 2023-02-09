const { validationResult } = require("express-validator");

exports.validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     let errorsList = errors.array().map((error) => error.msg);
  //     return res.status(400).json({ errors: errorsList });
  //   }
  //   next();

  //   console.log(errors.mapped());
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      errors: mappedErrors,
    });
  }
};
