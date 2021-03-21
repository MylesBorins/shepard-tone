/*
Copyright 2021 Myles Borins
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const voices = [];
const STEP_SIZE = 0.1;
const BASE_FREQUENCY = 55;
const MAX_GAIN = 0.6

function getPercent(base, val) {
  (val - base) / base
}

class Voice {
  #baseFrequency
  #stepSize
  #fade
  constructor(context, frequency=440, fade=0) {
    // Set internals
    this.#baseFrequency = frequency;
    this.#stepSize = STEP_SIZE;
    this.#fade = fade
    // Create Gain Node
    this.gain = context.createGain();
    if (fade === 1) {
      this.gain.gain.value = 0;
    }
    else {
      this.gain.gain.value = MAX_GAIN;
    }
    // Create Oscillator Node
    this.osc = context.createOscillator();
    this.osc.type = 'square';
    this.osc.frequency.value = frequency;
    // Connect all the nodes
    this.osc.connect(this.gain);
    this.gain.connect(context.destination);
  }
  start() {
    this.osc.start();
  }
  step(steps) {
    this.osc.frequency.value += (this.#stepSize * steps);
    if (this.osc.frequency.value > this.#baseFrequency * 2) {
      this.osc.frequency.value = this.#baseFrequency + (this.#stepSize * steps);
    }
    if (this.osc.frequency.value < this.#baseFrequency) {
      this.osc.frequency.value = (this.#baseFrequency * 2) - (this.#stepSize * steps);
    }
    if (this.#fade === 1) {
      this.gain.gain.value = ((this.osc.frequency.value - this.#baseFrequency) / this.#baseFrequency) * MAX_GAIN + 0.1;
    }
    if (this.#fade === 2) {
      this.gain.gain.value = ((1 - (this.osc.frequency.value - this.#baseFrequency) / this.#baseFrequency)) * MAX_GAIN + 0.1;
    }
  }
}

function createVoices(context) {
  voices.push(new Voice(context, 55, 1));
  voices.push(new Voice(context, 110, 2));
  voices.push(new Voice(context, 220, 1));
  voices.push(new Voice(context, 440, 2))
  voices.forEach(voice => {
    voice.start();
  })
}

function stepVoices(steps=1) {
  voices.forEach(voice => {
    voice.step(steps);
  });
}

function initAudio() {
  var context = new (window.AudioContext || window.webkitAudioContext)();
  createVoices(context);
  return context;
}

export {
  initAudio,
  stepVoices
}