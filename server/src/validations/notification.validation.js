import { z } from "zod";

class NotificationValidation {
    create = z.object({
        body: z.object({
            title: z.string({
                required_error: "Title is required"
            }).min(3, "Title must be at least 3 characters")
              .max(60, "Title must not exceed 60 characters")
              .trim(),

            description: z.string()
                .max(500, "Description must not exceed 500 characters")
                .trim()
                .optional(),
                

            media: z.array(z.object({
                url: z.string({
                    required_error: "Media URL is required"
                }),
                type: z.enum(["image", "pdf"], {
                    required_error: "Media type is required"
                })
            })),

            user: z.string({
                required_error: "User ID is required"
            }),

            department: z.string({
                required_error: "Department ID is required"
            })
        })
    });

    update = z.object({
        params: z.object({
            notificationId: z.string({
                required_error: "Notification ID is required"
            })
        })
    });

    delete = z.object({
        params: z.object({
            notificationId: z.string({
                required_error: "Notification ID is required"
            })
        })
    });
}

export default new NotificationValidation();
