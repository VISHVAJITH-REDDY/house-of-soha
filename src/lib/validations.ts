import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number"
    ),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  timeSlot: z.enum(["morning", "afternoon", "evening"]),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
