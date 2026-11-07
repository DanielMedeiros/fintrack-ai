const serviceName = 'fintrack-worker';

function start(): void {
  console.info({ level: 'info', service: serviceName, message: 'Worker foundation started. No queues are registered yet.', timestamp: new Date().toISOString() });
}

start();
