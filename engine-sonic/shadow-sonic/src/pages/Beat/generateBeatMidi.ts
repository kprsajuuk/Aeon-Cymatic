import { writeMidi } from "midi-file";

let patternStyle = () => {};

function generateBeatMidi(bpm){
    // 定义简单鼓点音色 (General MIDI Percussion channel 10)
    const drumMap = {
        kick: 36,
        snare: 38,
        hihat: 42,
    };

    const ticksPerBeat = 480; // 分辨率
    const track = [];

    // 设置 tempo
    const microsecondsPerBeat = Math.floor((60 * 1e6) / bpm);
    track.push({
        deltaTime: 0,
        meta: true,
        type: "setTempo",
        microsecondsPerBeat,
    });

    // 生成 4 小节鼓点 (16 步)
    for (let step = 0; step < 16; step++) {
        const time = step * (ticksPerBeat / 4); // 16 分音符

        // 随机 kick
        if (Math.random() > 0.7) {
            track.push({ deltaTime: time, channel: 9, type: "noteOn", noteNumber: drumMap.kick, velocity: 100 });
            track.push({ deltaTime: 60, channel: 9, type: "noteOff", noteNumber: drumMap.kick, velocity: 0 });
        }

        // 随机 snare
        if (Math.random() > 0.7) {
            track.push({ deltaTime: time, channel: 9, type: "noteOn", noteNumber: drumMap.snare, velocity: 100 });
            track.push({ deltaTime: 60, channel: 9, type: "noteOff", noteNumber: drumMap.snare, velocity: 0 });
        }

        // hi-hat 每拍几率更高
        if (Math.random() > 0.3) {
            track.push({ deltaTime: time, channel: 9, type: "noteOn", noteNumber: drumMap.hihat, velocity: 80 });
            track.push({ deltaTime: 40, channel: 9, type: "noteOff", noteNumber: drumMap.hihat, velocity: 0 });
        }
    }

    // 结束事件
    track.push({ deltaTime: ticksPerBeat, meta: true, type: "endOfTrack" });

    const midiData:any = {
        header: { format: 1, numTracks: 1, ticksPerBeat },
        tracks: [track],
    };

    console.log(midiData);
    return;
    const bytes = writeMidi(midiData);

    // 下载文件
    const blob = new Blob([new Uint8Array(bytes)], { type: "audio/midi" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `random_drums_${bpm}bpm.mid`;
    a.click();
    URL.revokeObjectURL(url);
};

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

function getPattern (style, instruments, totalSteps, defaultChance) {
    switch (style) {
        case "simple": 
            return loop(instruments, totalSteps, defaultChance, simpleStyle)
        case "rock": 
            return loop(instruments, totalSteps, defaultChance, rockStyle)
        case "jazz": 
            return loop(instruments, totalSteps, defaultChance, simpleStyle)
        case "random": 
            return loop(instruments, totalSteps, defaultChance, simpleStyle)
        default:
            return [];
    }
}

function loop (instruments, totalSteps, defaultChance, patternFunc) {
    let newPattern = instruments.map((item) => {
        let steps =[];
        for (let i=0; i<totalSteps; i++) {
            let chance = patternFunc(item.name, i, defaultChance);
            let activate = Math.random() < chance ? 1 : 0
            steps.push(activate);
        }
        return { name: item.name, note: item.note, steps };
    });
    return newPattern;
}

const exportMidi = (pattern, bpm, bars) => {
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

    const stepsPerBar = 16;
    const totalSteps = bars * stepsPerBar;
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