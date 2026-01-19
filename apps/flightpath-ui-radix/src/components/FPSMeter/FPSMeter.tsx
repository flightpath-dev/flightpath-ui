import { useEffect, useState } from 'react';

import { MetricDisplay } from '../MetricDisplay/MetricDisplay';

import type { AccentColor } from '../../types/AccentColor';

// Measures and displays frames per second (FPS) in real time
export function FPSMeter() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;
    let animationFrameId: number;

    /*
     * ------------------------------------------------------------
     * Calculate FPS and updates the state
     * ------------------------------------------------------------
     * Increments the number of frames every time this function is called.
     * If current time is greater than last time + 1000ms, calculates the FPS and updates the state.
     * Then resets the frames counter and updates the last time.
     */
    const calculateFPS = () => {
      const currentTime = performance.now();
      frames++;

      if (currentTime >= lastTime + 1000) {
        const newFps = Math.round((frames * 1000) / (currentTime - lastTime));
        // React will not re-render if the new FPS is the same as the old FPS
        setFps(newFps);
        frames = 0;
        lastTime = currentTime;
      }

      // Request the browser to call calculateFPS() before the next repaint
      animationFrameId = requestAnimationFrame(calculateFPS);
    };

    /*
     * Start the animation frame loop
     * Requests the browser to call calculateFPS() before the next repaint
     */
    animationFrameId = requestAnimationFrame(calculateFPS);

    // Clean up the animation frame when the component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const getFPSColor = (): AccentColor => {
    if (fps >= 50) return 'green';
    if (fps >= 30) return 'amber';
    return 'red';
  };

  return (
    <MetricDisplay
      color={getFPSColor()}
      label="Frame Rate"
      unit="FPS"
      value={fps.toString()}
    />
  );
}
