import fs from "fs";
import path from "path";
import glob from "fast-glob";
// check-imports.js
import fg from "fast-glob";
import fs from "fs";

//


const SRC_DIR = path.resolve("src");

function checkImports() {
  // Pega todos os arquivos .js/.jsx da pasta src
  const files = glob.sync(`${SRC_DIR}/**/*.{js,jsx}`);

  let hasError = false;

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");

    // Procura imports tipo ./pages/... ou ./components/...
    const regex = /import\s+.*?from\s+["'](.+)["']/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const importPath = match[1];

      // Só valida imports relativos
      if (importPath.startsWith(".")) {
        const absPath = path.resolve(path.dirname(file), importPath);

        // Se não tiver extensão, tenta adicionar .js ou .jsx
        let finalPath = null;
        if (fs.existsSync(absPath)) finalPath = absPath;
        else if (fs.existsSync(absPath + ".js")) finalPath = absPath + ".js";
        else if (fs.existsSync(absPath + ".jsx")) finalPath = absPath + ".jsx";

        if (!finalPath) {
          console.error(`❌ ERRO: Import inválido em ${file}: ${importPath}`);
          hasError = true;
        } else {
          console.log(`✅ OK: ${importPath} em ${path.basename(file)}`);
        }
      }
    }
  });

  if (hasError) {
    console.error("\n🚨 Corrija os erros acima antes do deploy!");
    process.exit(1);
  } else {
    console.log("\n🎉 Todos os imports estão corretos!");
  }
}

checkImports();
