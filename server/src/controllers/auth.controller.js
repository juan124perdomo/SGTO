import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createAccesToken from "../libs/jwt.js" ;


//Crea el usuario

export const register =  async (req, res) => {
  const {email,password,username,telefono} = req.body
  
  try {

    const passwordhashs = await bcrypt.hash(password,10)

    const newUser =new User({
    username,
    email,
    password:passwordhashs,
    telefono,
    
  });

    const userSaved = await newUser.save();
    const token = await createAccesToken({id:userSaved._id}); 
    res.cookie("token",token)
   res.json({
    id: userSaved._id,
    username: userSaved.username,
    email: userSaved.email,
    telefono: userSaved.telefono,
  });
} catch (error) {
    console.log(error);
  }

  
};

//inicia seccion con el usuario

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const userFound = await User.findOne({ email }).select("+password"); // aseguramos que incluya el password
    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    if (!userFound.password) {
      return res.status(500).json({ message: "El usuario no tiene contraseña guardada" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = await createAccesToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      telefono: userFound.telefono,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};


export const logout = (req, res) => {
  res.cookie("token","",{
    expires: new Date(0)
  });
  return res.sendStatus(200);
}

export const profile = async(req, res) => {

  const userFound = await User.findById(req.user.id)
  if (!userFound) return  res.status(400).json({ message: "usuario no encontrado" });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    telefono: userFound.telefono,
    createAt: userFound.createAt,
    updateAt: userFound.updateAt,
  });
  
  
};

