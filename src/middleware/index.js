const { validationResult } = require("express-validator");

 const validateRequest = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        error: errors.array()[0].msg,
      });
    }
    next();
  } catch (error) {
    return res.status(422).json({
      success: false,
      error: "Some error occured , Please Try Again Later",
    });
  }
};

module.exports = validateRequest;