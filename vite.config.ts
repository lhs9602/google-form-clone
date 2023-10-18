import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/google-form-clone/",
  plugins: [react()],
});
