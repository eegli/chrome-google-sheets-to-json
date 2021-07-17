import globby from 'globby';
import fs from 'fs-extra';

(async () => {
  const outDir = 'dist';
  const rootDir = 'src';
  const manifest = 'manifest.json';

  await fs.emptyDir('dist');
  const paths = await globby(rootDir, {
    expandDirectories: {
      extensions: ['html', 'css'],
    },
  });
  console.log(paths);
  for await (let file of paths) {
    const outFile = file.replace(rootDir, outDir);
    console.log(outFile);
    await fs.copy(file, outFile, { dereference: true });
  }
  await fs.copy(manifest, outDir + '/' + manifest);
})();
