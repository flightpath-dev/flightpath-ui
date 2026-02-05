import { Flex } from '@radix-ui/themes';
import { Outlet } from 'react-router';

import { BottomBar } from '../components/BottomBar/BottomBar';
import { StatusMessageBar } from '../components/StatusMessageBar/StatusMessageBar';
import { TopBar } from '../components/TopBar/TopBar';

import styles from './root.module.css';

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
    <Flex direction="column" height="100vh" position="relative">
      <TopBar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <StatusMessageBar />
      <BottomBar />
    </Flex>
  );
}
