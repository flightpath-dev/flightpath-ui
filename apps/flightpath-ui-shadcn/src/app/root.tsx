import { Outlet } from 'react-router';

import { BottomBar } from '../components/BottomBar/BottomBar';
import { StatusMessageBar } from '../components/StatusMessageBar/StatusMessageBar';
import { TopBar } from '../components/TopBar/TopBar';

export function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <TopBar />
      <Outlet />
      <StatusMessageBar />
      <BottomBar />
    </div>
  );
}
