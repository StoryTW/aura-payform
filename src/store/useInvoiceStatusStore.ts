import { create } from 'zustand';

import { getEcho } from '@/api/echo.config';
import { WS_STATUS_EVENT } from '@/utils/helpers/constants';
import { StateEnum, type StateEnumType } from '@/utils/helpers/enums';

interface IInvoiceStatusStore {
  status: StateEnumType;
  setStatus: (status: StateEnumType) => void;
  initSubscription: (id: string) => () => void;
}

export const useInvoiceStatusStore = create<IInvoiceStatusStore>((set, get) => ({
  status: StateEnum.WAIT_PAY,

  setStatus: (status) => set({ status }),

  initSubscription: (id) => {
    const echo = getEcho();
    const channelName = `invoice.${id}`;

    echo.channel(channelName).listen(WS_STATUS_EVENT, (e: { status: StateEnumType }) => {
      if (
        e.status === StateEnum.PAID ||
        e.status === StateEnum.EXPIRED ||
        e.status === StateEnum.SELECT_METHOD
      ) {
        get().setStatus(e.status);
      }
    });

    return () => {
      echo.leave(channelName);
    };
  },
}));
