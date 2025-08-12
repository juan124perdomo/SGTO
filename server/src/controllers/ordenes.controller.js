// Se importa el modelo de Orden para poder interactuar con la colección de 'ordenes' en la base de datos.
import Orden from "../models/orden.model.js";

/**
 * @description Obtiene todas las órdenes asociadas al usuario autenticado.
 * @param {object} req - El objeto de solicitud de Express. `req.user.id` es añadido por el middleware `authRequired`.
 * @param {object} res - El objeto de respuesta de Express.
 */
export const getOrdenes = async (req, res) => {
    // Busca en la base de datos todas las órdenes donde el campo 'user' coincida con el ID del usuario logueado.
    const ordenes = await Orden.find({ user: req.user.id });
    // Devuelve las órdenes encontradas en formato JSON.
    res.json(ordenes);
};

/**
 * @description Crea una nueva orden.
 * @param {object} req - El objeto de solicitud de Express.
 * @param {object} res - El objeto de respuesta de Express.
 */
export const createOrden = async (req, res) => {
    // Extrae los datos para la nueva orden del cuerpo de la solicitud (req.body).
    const { title, descripcion, date, type, priority } = req.body;

    // Crea una nueva instancia del modelo 'Orden' con los datos recibidos.
    // Asocia la orden con el usuario actual usando `req.user.id`.
    const newOrden = new Orden({
    user: req.user.id,
    title,
    descripcion,
    date,
    type,
    priority,
    });

    // Guarda la nueva orden en la base de datos.
    const ordenSaved = await newOrden.save();
    // Después de guardar, busca la orden recién creada por su ID y usa `.populate("user")`
    // para reemplazar el ID del usuario con el documento completo del usuario.
    const ordenPopulada = await Orden.findById(ordenSaved._id).populate("user");
    // Devuelve la orden guardada y populada como respuesta.
    res.json(ordenPopulada);
};

/**
 * @description Obtiene una única orden por su ID.
 * @param {object} req - El objeto de solicitud de Express.
 * @param {object} res - El objeto de respuesta de Express.
 */
export const getOrden = async (req, res) => {
    // Busca una orden por el ID proporcionado en los parámetros de la URL (req.params.id).
    // `.populate("user")` trae la información completa del usuario asociado.
    const orden = await Orden.findById(req.params.id).populate("user");
    // Si no se encuentra la orden, devuelve un error 404 (Not Found).
    if (!orden) return res.status(404).json({ message: "orden no encontrada" });
    // Si se encuentra, la devuelve en formato JSON.
    res.json(orden);
};

/**
 * @description Elimina una orden por su ID.
 * @param {object} req - El objeto de solicitud de Express.
 * @param {object} res - El objeto de respuesta de Express.
 */
export const deleteOrden = async(req, res)=>{
    // Busca y elimina una orden por su ID.
    const orden = await Orden.findByIdAndDelete(req.params.id);
    // Si no se encuentra la orden para eliminar, devuelve un error 404.
    if(!orden) return res.status(404).json({message: "orden no encontrada"});
    // Si la eliminación es exitosa, devuelve un estado 204 (No Content),
    // que indica que la operación se completó pero no hay nada que devolver en el cuerpo de la respuesta.
    return res.sendStatus(204);

} 

/**
 * @description Actualiza una orden existente por su ID.
 * @param {object} req - El objeto de solicitud de Express.
 * @param {object} res - El objeto de respuesta de Express.
 */
export const updateOrden = async (req, res) => {
    // Busca una orden por su ID y la actualiza con los datos del cuerpo de la solicitud (req.body).
    // La opción `{ new: true }` asegura que el método devuelva el documento modificado, no el original.
    const orden = await Orden.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    });

    // Si no se encuentra la orden para actualizar, devuelve un error 404.
    if (!orden) return res.status(404).json({ message: "orden no encontrada" });
    // Devuelve la orden actualizada en formato JSON.
    res.json(orden);
};
