const extractToken = async (req, res, next) => {
  try {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      // Split at the space
      const bearer = await bearerHeader.split(" ");
      // Get token from array & get the token
      req.token = bearer[1];
      // Next middleware
      next();
    } else {
      // Forbidden
      res
        .status(403)
        .json({ errors: [{ msg: "Forbidden :you are not authorized " }] });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "server failed" }] });
  }
};

module.exports = extractToken;
