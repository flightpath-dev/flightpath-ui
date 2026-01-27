import { Logo } from './Logo';
import { Navigation } from './Navigation';

export function TopBar() {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] h-14 px-4 border-b">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Logo />
      </div>

      {/* Center Section - Mode Navigation */}
      <Navigation />

      {/* Right Section */}
      <div className="flex items-center gap-5 justify-end">Right Section</div>
    </header>
  );
}
