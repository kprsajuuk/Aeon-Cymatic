import { writeMidi } from "midi-file";

function simpleStyle (instrument, step, defaultChance) {
    switch (instrument) {
        case "Kick":
            if (step % 4 === 0) return 0.9;
            break
        case "Snare":
            if (step % 8 === 4) return 0.9
            break
        case "Closed Hi-Hat":
            return 0.7
        default:
            break;
    }
    return defaultChance;
}

function rockStyle (instrument, step, defaultChance) {
    switch (instrument) {
        case "Kick":
            if (step % 4 === 0 || step % 8 === 6) return 0.8;
            break
        case "Snare":
            if (step % 8 === 4) return 0.9
            break
        case "Closed Hi-Hat":
            return 0.6
        default:
            break;
    }
    return defaultChance;
}

function jazzStyle (instrument, step, defaultChance) {
    switch (instrument) {
        case "Kick":
            if (step % 4 === 0) return 0.7;
            break
        case "Snare":
            if (step % 8 === 4) return 0.6
            break
        case "Closed Hi-Hat":
            return 0.5
        case "Open Hi-Hat":
            return 0.6
        default:
            break;
    }
    return defaultChance;
}

function randStyle (instrument, step, defaultChance) {
    return defaultChance;
}

function getPattern (style, instruments, totalSteps, defaultChance) {
    switch (style) {
        case "simple": 
            return loop(instruments, totalSteps, defaultChance, simpleStyle)
        case "rock": 
            return loop(instruments, totalSteps, defaultChance, rockStyle)
        case "jazz": 
            return loop(instruments, totalSteps, defaultChance, jazzStyle)
        case "random": 
            return loop(instruments, totalSteps, defaultChance, randStyle)
        default:
            return [];
    }
}

function loop (instruments, totalSteps, defaultChance, patternFunc) {
    let newPattern = instruments.map((item) => {
        let steps =[];
        for (let i=0; i<totalSteps; i++) {
            let chance = patternFunc(item.name, i+1, defaultChance);
            let activate = Math.random() < chance ? 1 : 0
            steps.push(activate);
        }
        return { name: item.name, note: item.note, steps };
    });
    return newPattern;
}

const exportMidi = (pattern, bpm, bars, stepsEachBar) => {
    if (pattern.length === 0) return;
    const ticksPerBeat = 480;
    const track = [];
    const microsecondsPerBeat = Math.floor((60 * 1e6) / bpm);
    track.push({
        deltaTime: 0,
        meta: true,
        type: "setTempo",
        microsecondsPerBeat,
    });

    const totalSteps = bars * stepsEachBar;
    const ticksPerStep = ticksPerBeat / 4; // 16分音符

    for (let step = 0; step < totalSteps; step++) {
        const time = step * ticksPerStep;
        pattern.forEach((row) => {
            if (row.steps[step] === 1) {
                track.push({
                    deltaTime: time,
                    channel: 9,
                    type: "noteOn",
                    noteNumber: row.note,
                    velocity: 100,
                });
                track.push({
                    deltaTime: 60,
                    channel: 9,
                    type: "noteOff",
                    noteNumber: row.note,
                    velocity: 0,
                });
            }
        });
    }

    track.push({ deltaTime: ticksPerBeat, meta: true, type: "endOfTrack" });
    console.log(track);


    const midiData:any = {
        header: { format: 1, numTracks: 1, ticksPerBeat },
        tracks: [track],
    };

    const bytes = writeMidi(midiData);

    const blob = new Blob([new Uint8Array(bytes)], { type: "audio/midi" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `drums_${bpm}bpm_${bars}bars.mid`;
    a.click();
    URL.revokeObjectURL(url);
};

export {
    exportMidi,
    getPattern
}