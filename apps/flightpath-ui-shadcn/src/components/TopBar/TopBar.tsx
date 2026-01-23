import FlightPathLogo from '../../assets/flightpath-logo.png';

export function TopBar() {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] h-14 px-4 border-b">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <img
          alt="Flightpath Logo"
          height={36}
          src={FlightPathLogo}
          width={36}
        />
      </div>

      {/* Center Section - Mode Navigation */}
      <div className="flex items-center gap-2">Mode Navigation</div>

      {/* Right Section */}
      <div className="flex items-center gap-5 justify-end">Right Section</div>
    </header>
  );
}
