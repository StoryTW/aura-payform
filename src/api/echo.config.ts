import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

let echo: Echo<'pusher'> | null = null;

export function getEcho() {
  if (!echo) {
    echo = new Echo<'pusher'>({
      broadcaster: 'pusher',
      client: new Pusher(import.meta.env.VITE_REVERB_KEY, {
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: 80,
        wssPort: 443,
        cluster: 'mt1',
        forceTLS: false,
        enabledTransports: ['ws', 'wss'],
      }),
    });
  }

  return echo;
}
