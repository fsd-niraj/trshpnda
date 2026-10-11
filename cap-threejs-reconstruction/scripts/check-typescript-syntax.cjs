const fs = require('fs');
const path = require('path');
const ts = require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript');
const root = path.resolve(__dirname, '../src');
let count = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx)$/.test(entry.name)) {
      const source = fs.readFileSync(full, 'utf8');
      const result = ts.transpileModule(source, {
        fileName: full,
        reportDiagnostics: true,
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
          jsx: ts.JsxEmit.Preserve,
        },
      });
      const errors = (result.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error);
      if (errors.length) {
        console.error(`FAIL ${path.relative(root, full)}`);
        for (const e of errors) console.error(ts.flattenDiagnosticMessageText(e.messageText, '\n'));
        process.exitCode = 1;
      } else {
        console.log(`PASS ${path.relative(root, full)}`);
        count++;
      }
    }
  }
}
walk(root);
if (!process.exitCode) console.log(`Syntax transpilation passed for ${count} TypeScript files.`);
