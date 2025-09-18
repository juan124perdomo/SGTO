
export const roleRequired = (allowedRoles) => {
  return (req, res, next) => {
    const { roleId } = req.user;

    if (!allowedRoles.includes(roleId)) {
      return res.status(403).json({ message: "Acceso denegado. No tienes el rol requerido." });
    }

    next();
  };
};