import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve:{
    alias:{
      src:"/src",
      components:"/src/component",
       lib:"/src/lib",
    }
  },
  plugins: [react(), tailwindcss()],
});
