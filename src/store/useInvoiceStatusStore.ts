import { create } from 'zustand';

import { getEcho } from '@/api/echo.config';
import { WS_STATUS_EVENT } from '@/utils/helpers/constants';
import { StateEnum, type StateEnumType } from '@/utils/helpers/enums';

interface IInvoiceStatusStore {
  status: StateEnumType | null;
  setStatus: (status: StateEnumType | null) => void;
  initSubscription: (id: string) => () => void;
}

export const useInvoiceStatusStore = create<IInvoiceStatusStore>((set, get) => ({
  status: null,

  setStatus: (status) => set({ status }),

  initSubscription: (id) => {
    const echo = getEcho();
    const channelName = `invoice.${id}`;

    echo.channel(channelName).listen(WS_STATUS_EVENT, (e: { status: StateEnumType }) => {
      const status = e.status;

      if (status === StateEnum.PAID || status === StateEnum.EXPIRED) {
        get().setStatus(status);
      }
    });

    return () => {
      echo.leave(channelName);
    };
  },
}));
