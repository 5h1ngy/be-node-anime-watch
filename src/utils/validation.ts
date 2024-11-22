import { validationResult, body } from "express-validator";

export const validateRequest = [
  body("id").isUUID().withMessage("Invalid UUID format"),
  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
