import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateAvailability,
  deleteProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);
router.post(
  "/",
  //? VALIDACIÓN
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio")
    .custom((v) => v > 0)
    .withMessage("Precio no válido"),
  handleInputErrors,
  createProduct
);
router.put(
  "/:id", //? VALIDACIÓN
  param("id").isInt().withMessage("ID no válido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio")
    .custom((v) => v > 0)
    .withMessage("Precio no válido"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no válido"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  updateAvailability
);
router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  deleteProduct
);

export default router;