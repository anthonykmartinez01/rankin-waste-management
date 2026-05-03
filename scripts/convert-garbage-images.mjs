import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'C:/Users/Anthony Martinez/Downloads/rankin-images/Garbage Collection Service';
const OUT = 'public/images/garbage-collection';

const jobs = [
  { src: 'pexels-filirovska-7141072.jpg', name: 'weekly-pickup' },
  { src: 'pexels-thirdman-7656998.jpg', name: 'rural-collection' },
  { src: 'pexels-franzileim-10628555.jpg', name: 'bulk-pickup' },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  const input = path.join(SRC, job.src);
  // Desktop: 1400w, quality 72 (smartSubsample for sharper edges)
  await sharp(input)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6, smartSubsample: true })
    .toFile(path.join(OUT, `${job.name}.webp`));

  // Mobile: 800w, quality 68
  await sharp(input)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 68, effort: 6, smartSubsample: true })
    .toFile(path.join(OUT, `${job.name}-mobile.webp`));

  // Get dimensions of desktop output
  const meta = await sharp(path.join(OUT, `${job.name}.webp`)).metadata();
  console.log(`${job.name}: ${meta.width}x${meta.height}`);
}
