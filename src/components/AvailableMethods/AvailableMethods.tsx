import { Card } from '@/components/AvailableMethods/Card/Card';
import { NotFoundMethod } from '@/components/AvailableMethods/NotFoundMethod/NotFoundMethod';
import { Sbp } from '@/components/AvailableMethods/Sbp/Sbp';
import { ServiceEnum, type ServiceEnumType } from '@/utils/helpers/enums';

interface IAvailableMethods {
  method?: ServiceEnumType;
}

export const AvailableMethods = ({ method }: IAvailableMethods) => {
  switch (method) {
    case ServiceEnum.CARD:
      return <Card />;
    case ServiceEnum.SBP:
      return <Sbp />;
    default:
      return <NotFoundMethod />;
  }
};
