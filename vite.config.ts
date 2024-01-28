import { resolve } from "path";
import { UserConfig } from "vite";

export default {
    server: {
        port: 5176, // Set the desired port number for http://localhost:5174
    },
    // Other Vite configurations
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                characters: resolve(__dirname, "characters.html"),
            },
        },
    },
} satisfies UserConfig;
