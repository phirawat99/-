// Creepy Audio Engine using HTML5 Web Audio API - Heavy, Loud & Atmospheric Edition
// ออกแบบเสียงบรรยากาศหลอนแบบจัดเต็ม เพิ่มระดับเสียงให้ดังกระหึ่ม พร้อมเอฟเฟกต์เลือดหยดและเสียงหวีดวิญญาณ

class SpookySoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.ambientGain = null;
    this.masterVolume = 0.65; // เสียงดังสะใจตามคำขอ
    this.oscillators = [];
    this.noiseNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.masterVolume = parseFloat(val);
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
    }
  }

  toggleAmbience() {
    this.init();
    if (this.isPlaying) {
      this.stopAmbience();
      return false;
    } else {
      this.startAmbience();
      return true;
    }
  }

  startAmbience() {
    if (this.isPlaying) return;

    // Master Ambient Gain - ปรับให้ดังกระหึ่ม (Loud & Punchy)
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.ambientGain.gain.exponentialRampToValueAtTime(this.masterVolume, this.ctx.currentTime + 1.5);
    this.ambientGain.connect(this.ctx.destination);

    // 1. Deep Sub Rumble (เสียงความถี่ต่ำสั่นสะเทือน 42Hz)
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(42, this.ctx.currentTime);

    const subFilter = this.ctx.createBiquadFilter();
    subFilter.type = 'lowpass';
    subFilter.frequency.setValueAtTime(110, this.ctx.currentTime);

    subOsc.connect(subFilter);
    subFilter.connect(this.ambientGain);
    subOsc.start();
    this.oscillators.push(subOsc);

    // 2. Howling Wind Noise (เสียงลมกรรโชกในป่าช้า)
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
    windFilter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    // LFO to sweep wind frequency up and down
    const windLFO = this.ctx.createOscillator();
    windLFO.frequency.setValueAtTime(0.15, this.ctx.currentTime);
    const windLFOGain = this.ctx.createGain();
    windLFOGain.gain.setValueAtTime(180, this.ctx.currentTime);
    windLFO.connect(windLFOGain);
    windLFOGain.connect(windFilter.frequency);
    windLFO.start();
    this.oscillators.push(windLFO);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    whiteNoise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.ambientGain);
    whiteNoise.start();
    this.noiseNode = whiteNoise;

    // 3. Eerie Dissonant Drone (คอร์ดหลอนลอยในอากาศ)
    [108, 114, 216].forEach(freq => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

      osc.connect(droneGain);
      droneGain.connect(this.ambientGain);
      osc.start();
      this.oscillators.push(osc);
    });

    this.isPlaying = true;
  }

  stopAmbience() {
    if (!this.isPlaying) return;
    if (this.ambientGain) {
      this.ambientGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch (e) {}
        });
        if (this.noiseNode) {
          try { this.noiseNode.stop(); this.noiseNode.disconnect(); } catch(e) {}
        }
        this.oscillators = [];
        this.noiseNode = null;
        this.isPlaying = false;
      }, 800);
    }
  }

  // เสียงเลือดหยด (Blood Drip Squelch Sound)
  playBloodDrip() {
    this.init();
    const now = this.ctx.currentTime;
    
    // Quick water/blood squelch drip
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.12);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);

    // Follow-up drip
    setTimeout(() => {
      if (!this.ctx) return;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1100, this.ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.09);
      gain2.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start();
      osc2.stop(this.ctx.currentTime + 0.11);
    }, 120);
  }

  // เสียงผีลอยผ่าน / กระซิบ
  playGhostWhisper() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.45);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(550, now);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.55);
  }

  // เสียงหัวใจเต้นกระแทกแรงๆ (Heavy Heartbeat)
  playHeartbeat() {
    this.init();
    const now = this.ctx.currentTime;
    [0, 0.24].forEach((delay, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(idx === 0 ? 85 : 70, now + delay);
      osc.frequency.exponentialRampToValueAtTime(28, now + delay + 0.18);

      gain.gain.setValueAtTime(0.55, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.24);
    });
  }
}

window.spookySound = new SpookySoundEngine();
