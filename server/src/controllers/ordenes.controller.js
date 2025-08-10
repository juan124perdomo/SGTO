import Orden from "../models/orden.model.js";

export const getOrdenes = async (req, res) => {
    const ordenes = await Orden.find({ user: req.user.id });
    res.json(ordenes);
};


export const createOrden = async (req, res) => {
    const { title, descripcion, date, type, priority } = req.body;

    const newOrden = new Orden({
    user: req.user.id,
    title,
    descripcion,
    date,
    type,
    priority,
    });

    const ordenSaved = await newOrden.save();
    const ordenPopulada = await Orden.findById(ordenSaved._id).populate("user");
    res.json(ordenPopulada);
};

export const getOrden = async (req, res) => {
    const orden = await Orden.findById(req.params.id).populate("user");
    if (!orden) return res.status(404).json({ message: "orden no encontrada" });
    res.json(orden);
};

export const deleteOrden = async(req, res)=>{
    const orden = await Orden.findByIdAndDelete(req.params.id);
    if(!orden) return res.status(404).json({message: "orden no encontrada"});
    return res.sendStatus(204);

} 

export const updateOrden = async (req, res) => {
    const orden = await Orden.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    });

    if (!orden) return res.status(404).json({ message: "orden no encontrada" });
    res.json(orden);
};


