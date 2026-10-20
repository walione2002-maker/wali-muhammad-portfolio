const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = 'https://corpassion-events.vercel.app';
const outputPath = path.resolve(__dirname, '../public/projects/corpassion-events.png');

console.log('Capturing:', targetUrl, 'to', outputPath);

const args = [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--window-size=1280,800',
  `--screenshot=${outputPath}`,
  targetUrl,
];

const result = spawnSync(chromePath, args, { stdio: 'inherit', timeout: 30000 });
console.log('Status:', result.status);

if (fs.existsSync(outputPath)) {
  const stat = fs.statSync(outputPath);
  console.log('Success! File size:', stat.size);
} else {
  console.log('File does not exist');
}
