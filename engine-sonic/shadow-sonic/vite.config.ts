import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        // 可选：将 monaco-editor 加入预构建
        include: ['monaco-editor'],
    },
    build: {
        target: 'es2019', // 或 'es2019'
    },
    esbuild: {
        target: 'es2019', // 确保 esbuild 也使用相同的目标
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        }
    },
    server: {
        port: 7666,
        host: true,
        open: true,
        proxy: {
            '/sonic': {
                target: "http://192.168.1.44:58033",
                changeOrigin: true,
            }
        }
    }
})
