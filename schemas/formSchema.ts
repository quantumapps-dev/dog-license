// eslint-disable-next-line @typescript-eslint/ban-ts-comment 

// @ts-nocheck 
 import { z } from "zod";

const todayStart = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const FormSchema = z
  .object({
    ownerName: z
      .string({ required_error: "Owner name is required" })
      .trim()
      .min(2, "Owner name must be at least 2 characters")
      .max(100, "Owner name must be at most 100 characters"),

    ownerEmail: z
      .string({ required_error: "Email is required" })
      .trim()
      .email("Please provide a valid email address"),

    ownerPhone: z
      .string({ required_error: "Phone number is required" })
      .trim()
      .min(10, "Phone number must be at least 10 digits")
      .max(20, "Phone number must be at most 20 characters")
      .regex(/^[0-9+()\-\s]+$/i, "Phone number contains invalid characters"),

    addressLine1: z
      .string({ required_error: "Address is required" })
      .trim()
      .min(5, "Address must be at least 5 characters")
      .max(200, "Address must be at most 200 characters"),

    addressLine2: z
      .string()
      .trim()
      .max(200, "Address line 2 must be at most 200 characters")
      .optional(),

    city: z
      .string({ required_error: "City is required" })
      .trim()
      .min(2, "City must be at least 2 characters")
      .max(100, "City must be at most 100 characters"),

    state: z
      .string({ required_error: "State is required" })
      .trim()
      .length(2, "Use 2-letter state code, e.g. PA")
      .regex(/^[A-Z]{2}$/, "State must be 2 uppercase letters"),

    zip: z
      .string({ required_error: "ZIP code is required" })
      .trim()
      .regex(/^\d{5}(-\d{4})?$/, "ZIP code must be 5 digits or ZIP+4"),

    dogName: z
      .string({ required_error: "Dog name is required" })
      .trim()
      .min(1, "Dog name must be at least 1 character")
      .max(60, "Dog name must be at most 60 characters"),

    breed: z.enum([
      "Labrador Retriever",
      "Golden Retriever",
      "German Shepherd",
      "Beagle",
      "Bulldog",
      "Mixed",
      "Other",
    ], { required_error: "Breed is required" }),

    sex: z.enum(["Male", "Female", "Unknown"], {
      required_error: "Sex is required",
    }),

    dob: z.coerce.date({
      required_error: "Date of birth is required",
      invalid_type_error: "Date of birth is invalid",
    }).refine((d) => d <= todayStart(), {
      message: "Date of birth cannot be in the future",
    }),

    weightLbs: z.coerce.number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
      .min(1, "Weight must be at least 1 lb")
      .max(300, "Please enter a realistic weight"),

    spayedNeutered: z.boolean({ required_error: "Spay/Neuter info is required" }),

    microchipped: z.boolean({ required_error: "Microchip info is required" }),

    chipId: z
      .string()
      .trim()
      .min(5, "Microchip ID must be at least 5 characters")
      .max(50, "Microchip ID must be at most 50 characters")
      .regex(/^[A-Za-z0-9\-]+$/, "Microchip ID contains invalid characters")
      .optional(),

    rabiesVaccinationDate: z.coerce.date({
      required_error: "Rabies vaccination date is required",
      invalid_type_error: "Rabies vaccination date is invalid",
    }).refine((d) => d <= todayStart(), {
      message: "Rabies vaccination date cannot be in the future",
    }),

    rabiesCertificateUrl: z
      .string()
      .trim()
      .url("Provide a valid URL for the rabies certificate")
      .optional(),

    licenseType: z.enum(["new", "renewal"], {
      required_error: "License type is required",
    }),

    licenseDuration: z.enum(["1_year", "3_years"], {
      required_error: "License duration is required",
    }),

    agreeTerms: z.boolean({ required_error: "Agreement is required" }).refine(
      (v) => v === true,
      { message: "You must agree to the terms and conditions" }
    ),
  })
  .superRefine((data, ctx) => {
    if (data.microchipped && (!data.chipId || data.chipId.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Microchip ID is required when microchipped is checked",
        path: ["chipId"],
      });
    }
  });

export type FormData = z.infer<typeof FormSchema>;
