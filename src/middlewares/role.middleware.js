const authorizeRoles = (...allowedRoles) => (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
        const error = new Error("Forbidden");
        error.statusCode = 403;
        return next(error);
    }

    if (!allowedRoles.includes(userRole)) {
        const error = new Error("Akses ditolak untuk role ini");
        error.statusCode = 403;
        return next(error);
    }

    next();
};

export default authorizeRoles;
