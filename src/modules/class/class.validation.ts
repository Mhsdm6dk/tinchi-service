import Joi from "joi";
import { CLASS_STAUTUS } from "./class.enum";

const getClassInforValidation = async (args: any) =>
  Joi.object({
    email: Joi.string()
      .optional()
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    phone_number: Joi.string()
      .optional()
      .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/),
  }).validateAsync(args, { stripUnknown: true });

const createClassValidation = async (args: any) =>
  Joi.object({
    name: Joi.string().required(),
    status: Joi.string()
      .optional()
      .valid(...Object.values(CLASS_STAUTUS)),
    max_student: Joi.number().required().min(0),
    tinchi_number: Joi.number().required().min(0),
  }).validateAsync(args, { stripUnknown: true });

const classValidation = {
  getClassInforValidation,
  createClassValidation,
};

export default classValidation;
