export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    // Si es un error de Zod
    if (error.issues) {
      console.log(error.issues); // Para depuración

      // Convertimos el array de issues en un objeto clave-valor
      const formattedErrors = {};
      error.issues.forEach(err => {
        formattedErrors[err.path[0]] = err.message;
      });

      return res.status(400).json({ errors: formattedErrors });
    }

    // Si es otro tipo de error
    console.error(error);
    return res.status(500).json({
      error: "Error interno del servidor"
    });
  }
};
