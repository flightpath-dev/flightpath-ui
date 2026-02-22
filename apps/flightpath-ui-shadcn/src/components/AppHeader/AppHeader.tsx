import { ModeToggle } from '@flightpath/autopilot/components/ModeToggle';
import { SidebarTrigger } from '@flightpath/autopilot/components/Sidebar';

import { HeaderBrand } from './HeaderBrand';

export function AppHeader() {
  // `header-height` is set in the RootLayout
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center px-4 h-(--header-height) border-b border-border bg-card">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <HeaderBrand />
      </div>

      {/* Center Section */}
      <div />

      {/* Right Section */}
      <div className="flex items-center justify-end">
        <ModeToggle />
      </div>
    </header>
  );
}
