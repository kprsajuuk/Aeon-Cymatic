import * as Tone from "tone";



const piano = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "fmsine", modulationIndex: 3 },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.4, release: 1.2 }
}).toDestination();

const guitar = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "triangle" },
    envelope: { attack: 0.02, decay: 0.3, sustain: 0.1, release: 0.5 }
}).toDestination();

const violin = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.5, decay: 0.1, sustain: 0.7, release: 2.5 }
}).toDestination();

const reverb = new Tone.Reverb({ decay: 2, preDelay: 0.01 }).toDestination();
piano.connect(reverb);
guitar.connect(reverb);
violin.connect(reverb);

//const instruments = { piano, guitar, violin };

export {
    piano, guitar, violin
}