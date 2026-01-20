import { Flex } from '@radix-ui/themes';
import { Outlet } from 'react-router';

import { BottomBar } from '../components/BottomBar/BottomBar';
import { StatusMessageBar } from '../components/StatusMessageBar/StatusMessageBar';
import { TopBar } from '../components/TopBar/TopBar';

export function RootLayout() {
  return (
    <Flex direction="column" minHeight="100vh" position="relative">
      <TopBar />
      <Outlet />
      <StatusMessageBar />
      <BottomBar />
    </Flex>
  );
}
