import { isRouteErrorResponse, useRouteError } from 'react-router';

import { ApiError } from '@/api/api-error';
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage';

export const RouteErrorBoundary = () => {
  const error = useRouteError();

  let status = 500;
  let message: string | undefined;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText || error.data?.message;
  } else if (error instanceof ApiError) {
    status = error.status;
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return <ErrorPage status={status} message={message} />;
};
