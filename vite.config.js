import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";

/*
   Função para obter hash do commit atual */

   
function getGitCommit() {
  try {
    // pega o hash curto do commit atual (ex: a1b2c3d)
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    // fallback se o projeto não estiver num repositório Git
    return "dev";
  }
}

/* Gera versão automática a cada build*/

const COMMIT = getGitCommit(); // ex: a1b2c3d
const BUILT_AT = new Date().toISOString(); // ex: 2025-10-24T15:31:00.000Z
const VERSION = `${BUILT_AT}+${COMMIT}`;  // versão única por build

   /*---
    Configuração principal do Vite
   ---- */
export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_COMMIT__: JSON.stringify(COMMIT),
    __BUILD_TIME__: JSON.stringify(BUILT_AT),
    __BUILD_VERSION__: JSON.stringify(VERSION),
  },
});
