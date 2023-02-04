const path = require('path');

module.exports = {
  // Type check
  '**/*.(ts|tsx)': () => 'tsc-files --skipLibCheck --noEmit',

  // Lint
  '**/*.(ts|tsx|js)': (filenames) =>
    `eslint ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(' ')} --fix`,

  // Format
  '**/*.(ts|tsx|js|md|json)': (filenames) =>
    `prettier --write ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(' ')}`,
};
