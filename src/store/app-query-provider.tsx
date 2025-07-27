import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FunctionComponent, PropsWithChildren } from 'react';

export const queryClient = new QueryClient();

export const AppQueryProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
