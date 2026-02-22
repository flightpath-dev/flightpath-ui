import { FlyMap } from './components/FlyMap';
import { Footer } from './components/Footer';
import { StatusBar } from './components/StatusBar';

export function FlyPage() {
  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto flex flex-col">
        <FlyMap />
      </div>
      <StatusBar />
      <Footer />
    </div>
  );
}
