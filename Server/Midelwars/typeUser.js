const isAdmin = (req, res, next) => {
  console.log(req.user);
  try {
    if ((req.user.role = "Professor") || (req.user.role = "Parent")) {
      res.status(400).json({ msg: "only admin has the right" });
    }
    if ((req.user.role = "Administrator")) {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

const isProf = (req, res, next) => {
  console.log(req.user);
  try {
    if ((req.user.role = "Administrator") || (req.user.role = "Parent")) {
      res.status(400).json({ msg: "only professor has the right" });
    }
    if ((req.user.role = "Professor")) {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

const isParent = (req, res, next) => {
  console.log(req.user);
  try {
    if ((req.user.role = "Professor") || (req.user.role = "Administrator")) {
      res.status(400).json({ msg: "only admin has the right" });
    }
    if ((req.user.role = "Parent")) {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};


module.exports = {isAdmin, isProf, isParent};
