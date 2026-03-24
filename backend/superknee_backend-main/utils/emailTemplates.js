import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getTemplate = (templateName, data) => {
  const filePath = path.join(__dirname, "../templates", templateName);
  let template = fs.readFileSync(filePath, "utf8");

  const dateObj = new Date();
  data.date = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
  
  // Inject common variables
  if (!data.frontendUrl) data.frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  Object.keys(data).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    template = template.replace(regex, data[key]);
  });

  return template;
};