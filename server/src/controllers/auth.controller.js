// Se importan los módulos necesarios.
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
// `createAccesToken` es una función personalizada para crear JSON Web Tokens (JWT).
import createAccesToken from "../libs/jwt.js" ;


/**
 * @description Registra un nuevo usuario en el sistema.
 * @param {object} req - El objeto de solicitud de Express.
 * @param {object} res - El objeto de respuesta de Express.
 */
export const register =  async (req, res) => {
  // Extrae los datos del cuerpo de la solicitud.
  const {email,password,username,telefono} = req.body
  
  try {
    // 1. VERIFICACIÓN DE USUARIO: Busca si ya existe un usuario con el mismo correo electrónico.
    const userFound = await User.findOne({email});
    // Si se encuentra, devuelve un error 400 (Bad Request) indicando que el correo ya está en uso.
    if(userFound) return res.status(400).json(["El correo ya está en uso"])

    // 2. HASH DE CONTRASEÑA: Encripta la contraseña antes de guardarla en la base de datos por seguridad.
    // El '10' es el "salt round", que determina la complejidad del hash.
    const passwordhashs = await bcrypt.hash(password,10)

    // 3. CREACIÓN DE USUARIO: Crea una nueva instancia del modelo `User` con los datos del formulario.
    const newUser =new User({
    username,
    email,
    password:passwordhashs,
    telefono,
  });

    // 4. GUARDADO EN BD: Guarda el nuevo usuario en la base de datos MongoDB.
    const userSaved = await newUser.save();
    // 5. CREACIÓN DE TOKEN: Crea un token de acceso (JWT) para el usuario recién registrado.
    // El token contiene el ID del usuario, que servirá para identificarlo en futuras solicitudes.
    const token = await createAccesToken({id:userSaved._id}); 
    // 6. ENVÍO DE COOKIE: Establece el token en una cookie del navegador. Al ser HTTP-Only,
    // no puede ser accedida por JavaScript en el cliente, lo que aumenta la seguridad.
    res.cookie("token",token)
    // 7. RESPUESTA AL CLIENTE: Responde con los datos del usuario (sin la contraseña) para que el frontend
    // pueda actualizar su estado y mostrar la información del usuario.
   res.json({
    id: userSaved._id,
    username: userSaved.username,
    email: userSaved.email,
    telefono: userSaved.telefono,
  });
  } catch (error) {
    // MANEJO DE ERRORES: Si ocurre un error en cualquier punto del `try`, se captura aquí
    // y se envía una respuesta de error 500 (Internal Server Error) al cliente.
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Inicia sesión para un usuario existente.
 * @param {object} req - El objeto de solicitud de Express.
 * @param {object} res - El objeto de respuesta de Express.
 */
export const login = async (req, res) => {
  // Extrae las credenciales del cuerpo de la solicitud.
  const { email, password } = req.body;

  try {
    // 1. BÚSQUEDA DE USUARIO: Busca al usuario por su correo electrónico en la base de datos.
    // `.select('+password')` es crucial porque el esquema del usuario (user.model.js)
    // tiene `select: false` para la contraseña, por lo que no se devuelve por defecto.
    // Esto es una medida de seguridad para no exponer la contraseña hasheada accidentalmente.
    const userFound = await User.findOne({ email }).select("+password"); // aseguramos que incluya el password
    // Si no se encuentra ningún usuario con ese correo, se devuelve un error 400.
    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // 2. VERIFICACIÓN DE CONTRASEÑA: Comprueba si el usuario encontrado tiene una contraseña. Es una medida de seguridad adicional.
    if (!userFound.password) {
      return res.status(500).json({ message: "El usuario no tiene contraseña guardada" });
    }

    // 3. COMPARACIÓN DE CONTRASEÑAS: Compara la contraseña proporcionada en la solicitud con la contraseña hasheada
    // que está almacenada en la base de datos. `bcrypt.compare` se encarga de esta comparación segura.
    const isMatch = await bcrypt.compare(password, userFound.password);
    // Si las contraseñas no coinciden, se devuelve un error 400.
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // 4. CREACIÓN Y ENVÍO DE TOKEN: Si las credenciales son correctas, crea un token de acceso y lo envía como cookie.
    const token = await createAccesToken({ id: userFound._id });
    res.cookie("token", token);
    // 5. RESPUESTA AL CLIENTE: Se responde con los datos públicos del usuario.
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      telefono: userFound.telefono,
    });
  } catch (error) {
    // MANEJO DE ERRORES: Captura y responde a cualquier error del servidor.
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Cierra la sesión del usuario eliminando la cookie del token.
 * @param {object} req - El objeto de solicitud de Express.
 * @param {object} res - El objeto de respuesta de Express.
 */
export const logout = (req, res) => {
  // Para cerrar la sesión, se sobrescribe la cookie 'token' con un valor vacío
  // y se establece una fecha de expiración en el pasado (new Date(0)).
  // Esto le indica al navegador que elimine la cookie inmediatamente.
  res.cookie("token","",{
    expires: new Date(0)
  });
  // Se envía una respuesta con estado 200 (OK) para indicar que el cierre de sesión fue exitoso.
  return res.sendStatus(200);
}

/**
 * @description Obtiene el perfil del usuario autenticado actualmente.
 * @param {object} req - El objeto de solicitud de Express. El middleware `authRequired` ya ha verificado el token y añadido `req.user`.
 * @param {object} res - El objeto de respuesta de Express.
 */
export const profile = async(req, res) => {
  // El middleware `authRequired` (en validateToken.js) ya ha verificado el JWT
  // y ha extraído el payload (que contiene el ID del usuario) en `req.user`.
  // Aquí, usamos ese ID para buscar al usuario completo en la base de datos.
  const userFound = await User.findById(req.user.id)
  
  // Si por alguna razón el usuario no se encuentra (por ejemplo, fue eliminado después de
  // que se emitió el token), se devuelve un error 400.
  if (!userFound) return  res.status(400).json({ message: "usuario no encontrado" });
  
  // Se devuelve un objeto JSON con la información pública del perfil del usuario.
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    telefono: userFound.telefono,
    createAt: userFound.createAt,
    updateAt: userFound.updateAt,
  });
  
  
};
