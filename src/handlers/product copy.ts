import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [["price", "DESC"]],
    // attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json({ data: products });
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    // console.log(colors.bgGreen.bold(req.params.id));
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Producto No Encontrado" });
    }
    res.json({ data: product });
  } catch (error) {
    console.log("error", error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  // console.log("req.body", req.body);
  try {
    const product = await Product.create(req.body);
    // res.json("Desde POST");
    res.status(201).json({ data: product });
  } catch (error) {
    console.log("error", error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  // res.json("Desde PUT")
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({ error: "Producto No Encontrado" });
  }
  //Actualizar
  // console.log(colors.bgGreen.bold(req.body));
  await product.update(req.body); //UPDATE SE ASEGURA DE NO DESTRUIR LOS DATOS Q NO SE PASAN EN LA SOLICITUD
  await product.save();
  res.json({ data: product });
};

export const updateAvailability = async (req: Request, res: Response) => {
  // res.json("Desde PUT")
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({ error: "Producto No Encontrado" });
  }
  //Actualizar
  product.availability = !product.dataValues.availability;
  await product.save();
  res.json({ data: product });
  // console.log(product.dataValues);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({ error: "Producto No Encontrado" });
  }
  //Borrar
  await product.destroy();
  res.json({ data: "Producto Eliminado!" });
};
