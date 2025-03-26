const adminAuth = (req, res, next) => {
    if (req.user && req.user.firstName === "Admin") {
        next();
    } else {
        res.status(403).json({ errorMessage: "Access denied. Admins only." });
    }
};

module.exports = { adminAuth };
