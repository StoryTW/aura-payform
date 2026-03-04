import { useParams } from 'react-router';

import { AvailableMethods } from '@/components/AvailableMethods/AvailableMethods';

export function Component() {
  const { method } = useParams<ParamsType>();

  return <AvailableMethods method={method} />;
}
