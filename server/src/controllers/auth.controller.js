
export const register = (req, res) => {
  console.log(req.body);
  res.send("registrandouna vez que mande la solicitud post");
};


export const login = (req,res)=>{ res.send("login")};
