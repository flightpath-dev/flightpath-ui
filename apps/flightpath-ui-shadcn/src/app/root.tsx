import { Outlet } from 'react-router';

import { BottomBar } from '../components/BottomBar/BottomBar';
import { StatusMessageBar } from '../components/StatusMessageBar/StatusMessageBar';
import { TopBar } from '../components/TopBar/TopBar';

/**
 * Root layout component that wraps the entire application.
 * - The application takes up the full height of the viewport.
 * - The top bar, StatusMessageBar, and BottomBar are all fixed height.
 * - The main content area takes up the remaining space and is scrollable.
 * - The routes are rendered in the main content area.
 *
 * |-------------------|
 * |       TopBar      |
 * |-------------------|
 * | Main Content Area |
 * |     <Outlet>      |
 * |-------------------|
 * |  StatusMessageBar |
 * |-------------------|
 * |     BottomBar     |
 * |-------------------|
 */
export function RootLayout() {
  return (
    <div className="flex flex-col h-screen relative">
      <TopBar />
      <main className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto flex flex-col">
        <Outlet />
      </main>
      <StatusMessageBar />
      <BottomBar />
    </div>
  );
}
