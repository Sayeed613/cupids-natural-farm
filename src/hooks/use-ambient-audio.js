import { useRef, useCallback, useEffect, useState } from "react";

/**
 * useAmbientAudio — Creates a subtle ambient nature soundscape using Web Audio API.
 * No external audio files needed.
 *
 * Returns: [isPlaying, toggle]
 *   isPlaying — boolean, whether audio is currently active
 *   toggle    — call to start/stop
 */
export function useAmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const startedRef = useRef(false);

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.04; // Very subtle volume
    masterGain.connect(ctx.destination);

    const allNodes = [masterGain];

    // ── 1. Wind layer: filtered noise ──
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = "lowpass";
    windFilter.frequency.value = 250;

    const windGain = ctx.createGain();
    windGain.gain.value = 0.3;

    // Slow modulation for natural wind feel
    const windLfo = ctx.createOscillator();
    windLfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.2;
    windLfo.connect(lfoGain);
    lfoGain.connect(windGain.gain);

    noiseSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(masterGain);

    windLfo.start();
    noiseSource.start();
    allNodes.push(noiseSource, windFilter, windGain, windLfo, lfoGain);

    // ── 2. Gentle cricket-like tone layer ──
    const cricketOsc = ctx.createOscillator();
    cricketOsc.type = "sine";
    cricketOsc.frequency.value = 3200;

    const cricketGain = ctx.createGain();
    cricketGain.gain.value = 0;

    // Pulse the cricket sound for a more organic feel
    const cricketPulse = ctx.createOscillator();
    cricketPulse.frequency.value = 2.8;
    const pulseGain = ctx.createGain();
    pulseGain.gain.value = 0.04;
    cricketPulse.connect(pulseGain);
    pulseGain.connect(cricketGain.gain);

    cricketOsc.connect(cricketGain);
    cricketGain.connect(masterGain);

    cricketOsc.start();
    cricketPulse.start();
    allNodes.push(cricketOsc, cricketGain, cricketPulse, pulseGain);

    // ── 3. Low drone (earth tone) ──
    const droneOsc = ctx.createOscillator();
    droneOsc.type = "sine";
    droneOsc.frequency.value = 72;

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.15;

    // Slight pitch wobble for organic feel
    const droneLfo = ctx.createOscillator();
    droneLfo.frequency.value = 0.05;
    const droneLfoGain = ctx.createGain();
    droneLfoGain.gain.value = 4;
    droneLfo.connect(droneLfoGain);
    droneLfoGain.connect(droneOsc.frequency);

    droneOsc.connect(droneGain);
    droneGain.connect(masterGain);

    droneOsc.start();
    droneLfo.start();
    allNodes.push(droneOsc, droneGain, droneLfo, droneLfoGain);

    nodesRef.current = allNodes;
    setIsPlaying(true);
  }, []);

  const stop = useCallback(() => {
    const ctx = ctxRef.current;
    if (ctx && ctx.state !== "closed") {
      // Fade out gently
      const masterGain = nodesRef.current[0];
      if (masterGain) {
        masterGain.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
      }
      setTimeout(() => {
        ctx.close();
        startedRef.current = false;
        nodesRef.current = [];
        ctxRef.current = null;
        setIsPlaying(false);
      }, 1200);
    }
  }, []);

  const toggle = useCallback(() => {
    if (startedRef.current) {
      stop();
    } else {
      start();
    }
  }, [start, stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const ctx = ctxRef.current;
      if (ctx && ctx.state !== "closed") {
        ctx.close();
      }
    };
  }, []);

  return [isPlaying, toggle];
}
