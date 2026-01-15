const os = require('os');
const { spawn } = require('child_process');

function getWifiIP() {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    if (/wireless|wi-?fi/i.test(name)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  }
  return null;
}

const ip = getWifiIP();

if (!ip) {
  console.error('WiFi IPv4 not found');
  process.exit(1);
}

console.log(`Starting serve on ${ip}:3000`);

spawn(
  'serve',
  ['-s', 'build', '-l', `tcp://${ip}:3000`],
  { stdio: 'inherit', shell: true }
);
