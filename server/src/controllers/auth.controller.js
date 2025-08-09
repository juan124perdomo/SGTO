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
    // Validar si faltan datos
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: "usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "contraseña incorrecta" });
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
    console.log(error);
  }
};


export const logout = async (req, res) => {
  res.cookie("token","",{
    expires: new Date(0)
  });
  return res.sendStatus(200);
}

export const profile = async (req, res) => {
  res.json({ message: "Perfil de usuario" });
};

