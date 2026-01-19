import { useEffect, useRef } from 'react';

import { Feature } from 'ol';
import { containsXY } from 'ol/extent';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { fromLonLat } from 'ol/proj';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';
import View from 'ol/View';
import { apply } from 'ol-mapbox-style';

import { config } from '../../config/AppConfig';
import { usePosition2D } from '../../providers/useServices';

// CSS imports - order matters (ol.css must come before module.css)

import 'ol/ol.css';
// eslint-disable-next-line import-x/order
import styles from './MapView.module.css';

// Boston Logan Airport Runway 09 (East Heading) [lon, lat]
const BOS_RUNWAY_LOCATION: [number, number] = [-71.011487, 42.356007];
const BOS_RUNWAY_HEADING = (77 * Math.PI) / 180; // 77 degrees in radians

const { maptilerKey } = config;
const styleJson = `https://api.maptiler.com/maps/hybrid-v4/style.json?key=${maptilerKey}`;

const DRONE_ICON_SVG = `
<svg
  width="28"
  height="50"
  viewBox="0 0 28 50"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M26.1484 47.0967L14.6504 37.2412L14 36.6826L13.3496 37.2412L1.85059 47.0967L14 3.70801L26.1484 47.0967Z"
    fill="#EF4444"
    stroke="black"
    stroke-width="2" />
</svg>
`.trim();

const DRONE_ICON_DATA_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  DRONE_ICON_SVG,
)}`;

export function MapView() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const droneMarkerRef = useRef<Feature | null>(null);
  const position = usePosition2D();

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return undefined;

    const droneLocation = fromLonLat(BOS_RUNWAY_LOCATION);

    // --- Tile Layer ---
    const tileLayer = new TileLayer({
      source: new TileJSON({
        url: `https://api.maptiler.com/maps/hybrid-v4/tiles.json?key=${maptilerKey}`,
        tileSize: 512,
        crossOrigin: 'anonymous',
      }),
    });

    // --- Drone Marker Layer ---
    const droneMarkerSource = new VectorSource();
    const droneMarkerLayer = new VectorLayer({
      source: droneMarkerSource,
    });

    const droneMarker = new Feature({
      geometry: new Point(droneLocation),
    });
    droneMarker.setStyle(
      new Style({
        image: new Icon({
          src: DRONE_ICON_DATA_URL,
          rotation: BOS_RUNWAY_HEADING,
          anchor: [0.5, 0.5],
        }),
      }),
    );
    droneMarkerSource.addFeature(droneMarker);
    droneMarkerRef.current = droneMarker;

    // --- Map Instance ---
    const map = new Map({
      target: mapContainerRef.current,
      layers: [tileLayer], // start with base tile layer only
      view: new View({
        center: droneLocation, // center map on drone location
        zoom: 20,
      }),
      controls: [], // Remove all default controls including zoom
    });

    // Apply MapTiler style, then add overlays to preserve order
    void apply(map, styleJson).then(() => {
      map.addLayer(droneMarkerLayer);
      return null; // satisfy promise/always-return
    });

    mapInstanceRef.current = map;

    return () => {
      map.setTarget(undefined);
      map.dispose(); // Properly dispose of the map
      // Set the refs to null to prevent their use in other useEffects
      mapInstanceRef.current = null;
      droneMarkerRef.current = null;
    };
  }, []);

  /**
   * Update drone marker position and rotation based on position data
   *
   * | Heading (deg) | Direction |
   * |        0      | North     |
   * |       90      | East      |
   * |      180      | South     |
   * |      270      | West      |
   * |      360      | North     |
   */
  useEffect(() => {
    if (!mapInstanceRef.current || !droneMarkerRef.current) return;

    const map = mapInstanceRef.current;
    const view = map.getView();

    const droneLocation = fromLonLat([position.lon, position.lat]);

    // Update marker position
    droneMarkerRef.current.setGeometry(new Point(droneLocation));

    // Update marker rotation
    droneMarkerRef.current.setStyle(
      new Style({
        image: new Icon({
          src: DRONE_ICON_DATA_URL,
          // Convert degrees to radians (note that 0° = north, 90° = east)
          rotation: (position.heading * Math.PI) / 180,
          anchor: [0.5, 0.5],
        }),
      }),
    );

    // Check if drone is visible in the map viewport
    const mapExtent = view.calculateExtent();
    const isDroneVisible = containsXY(
      mapExtent,
      droneLocation[0],
      droneLocation[1],
    );

    /*
     * If drone is outside viewport, smoothly pan to it.
     * Make sure to not animate if the map is already animating.
     */
    if (!isDroneVisible && !view.getAnimating()) {
      view.animate({
        center: droneLocation,
        duration: 500, // Animation duration in milliseconds
      });
    }
  }, [position.lat, position.lon, position.heading]);

  return <div className={styles.container} ref={mapContainerRef} />;
}
