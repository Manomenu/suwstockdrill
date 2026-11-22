import tailwindcss from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
    server: {
        port: 3340,
        strictPort: true,
        proxy: {
            "/api": {
                target: process.env["API_PROXY_TARGET"] ?? "http://127.0.0.1:6340",
                changeOrigin: true,
            },
        },
    },
});
