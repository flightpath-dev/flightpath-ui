import { MapView } from '../../../components/MapView/MapView';

/**
 * FlyView component - main flight control interface.
 */
export function FlyView() {
  return (
    <div className="flex-1 relative">
      <MapView />
    </div>
  );
}
