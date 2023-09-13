import z from "zod";

export const newPatientSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  firstName: z.string().min(2, { message: "Minimum 2 characters!" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  middleName: z.string().optional(),
  status: z.string().optional(),
  diagnosis: z.string().optional(),
  sex: z.string().min(1, { message: "Sex is required" }),
  age: z
    .number({ invalid_type_error: "Enter a valid age!" })
    .min(1, { message: "Enter a valid age!" }),
  weight: z
    .number({ invalid_type_error: "Enter a valid weight!" })
    .min(1, { message: "Enter a valid weight!" }),
  height: z
    .number({ invalid_type_error: "Enter a valid heighty!" })
    .min(1, { message: "Enter a valid heighty!" }),
  phoneNumber: z.number().optional().or(z.literal("")),
  heightUom: z.string(),
  weightUom: z.string(),
});

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Minimum 6 characters" }),
});

export const signUpFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  firstName: z.string().min(2, { message: "Minimum 2 characters!" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  middleName: z.string().optional(),
  phoneNumber: z.number().optional().or(z.literal("")),
  password: z.string().min(6, { message: "Minimum 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Minimum 6 characters" }),
});

export const parseZodErrors = (zodError) => {
  let errors = {};

  zodError.error.issues.forEach((e) => {
    errors[e.path[0]] = e.message;
  });

  return errors;
};
