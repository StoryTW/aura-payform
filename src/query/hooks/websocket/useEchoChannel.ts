import { useEffect } from 'react';

import { getEcho } from '@/api/echo.config';

interface IUseEchoChannel {
  channelName: string;
  event: string;
  callback: (data: any) => void;
}

export function useEchoChannel({ channelName, event, callback }: IUseEchoChannel) {
  useEffect(() => {
    const echo = getEcho();

    echo.channel(channelName).listen(event, callback);

    return () => {
      echo.leaveChannel(channelName);
    };
  }, [channelName, event, callback]);
}
