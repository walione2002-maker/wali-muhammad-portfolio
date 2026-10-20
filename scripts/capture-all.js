const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const projectsDir = path.resolve(__dirname, '../public/projects');

if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

const projects = [
  { id: 'zynnco-chauffeurs', url: 'https://zynnco-rkgn4e6vy-wali-muhammad-s-projects.vercel.app' },
  { id: 'corpassion-events', url: 'https://corpassion-events.vercel.app' },
  { id: '3d-resume-builder', url: 'https://3d-resume-builder-self.vercel.app' },
  { id: 'nexus-bay', url: 'https://nexus-bay.vercel.app' },
  { id: 'amirs-kalonji-oil', url: 'https://amirs-kalonji-oil.vercel.app' },
  { id: 'digital-wedding-suite', url: 'https://fatima-ali-wedding.vercel.app' },
  { id: 'commercial-sanitary-hub', url: 'https://federal-sanitary.vercel.app' },
  { id: 'fintech-risk-engine', url: 'https://market-structure.vercel.app' },
];

console.log('Starting screenshot capture for', projects.length, 'projects...');

for (const p of projects) {
  const outputPath = path.join(projectsDir, `${p.id}.png`);
  console.log(`\nCapturing [${p.id}] from ${p.url}...`);

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1280,800',
    '--virtual-time-budget=3000',
    `--screenshot=${outputPath}`,
    p.url,
  ];

  try {
    const res = spawnSync(chromePath, args, { stdio: 'inherit', timeout: 35000 });
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      console.log(`✓ Saved ${p.id}.png (${stats.size} bytes)`);
    } else {
      console.error(`✗ Failed to create ${p.id}.png`);
    }
  } catch (err) {
    console.error(`Error capturing ${p.id}:`, err.message);
  }
}

console.log('\nAll capture attempts completed!');
