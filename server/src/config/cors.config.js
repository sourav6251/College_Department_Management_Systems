import cors from "cors";

const corsConfig = cors({
    origin: ['https://college-department-management-systems-njq4.vercel.app' ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
});

export default corsConfig;
