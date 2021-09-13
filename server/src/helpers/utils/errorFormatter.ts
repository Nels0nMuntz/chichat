import { ValidationError } from "express-validator";

export const errorFormatter = (error: ValidationError) => ({ param: error.param, msg: error.msg });