process.chdir(__dirname);
process.argv.push('--port', '5173');
import('./node_modules/vite/bin/vite.js');
