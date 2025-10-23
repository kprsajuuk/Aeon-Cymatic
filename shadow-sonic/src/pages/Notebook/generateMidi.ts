import { writeMidi } from "midi-file";

const generateMidiFromNoteBook = (nodes, bpm) => {
    if (nodes.length === 0) return;
    const ticksPerBeat = 480;
    const track = [];
    const microsecondsPerBeat = Math.floor((60 * 1e6) / bpm);
    track.push({
        deltaTime: 0,
        meta: true,
        type: "setTempo",
        microsecondsPerBeat,
    });

    const ticksPerStep = ticksPerBeat / 4; // 16分音符

    const events = [];
    nodes.forEach(node => {
        const time = node.start * ticksPerStep;
        events.push({
            absoluteTime: time,
            channel: 0,
            type: "noteOn",
            noteNumber: node.noteNumber,
            velocity: 100,
        });
        events.push({
            absoluteTime: time + 120*node.duration, // 120ticks后关闭
            channel: 0,
            type: "noteOff",
            noteNumber: node.noteNumber,
            velocity: 0,
        });
    })

    events.sort((a, b) => a.absoluteTime - b.absoluteTime);

    let lastTime = 0;
    events.forEach(event => {
        const delta = event.absoluteTime - lastTime;
        track.push({
            deltaTime: delta,
            channel: event.channel,
            type: event.type,
            noteNumber: event.noteNumber,
            velocity: event.velocity,
        });
        lastTime = event.absoluteTime;
    });

    track.push({ deltaTime: 0, meta: true, type: "endOfTrack" });
    const midiData:any = {
        header: { format: 1, numTracks: 1, ticksPerBeat },
        tracks: [track],
    };

    const bytes = writeMidi(midiData);

    const blob = new Blob([new Uint8Array(bytes)], { type: "audio/midi" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `midinotebook_${bpm}bpm.mid`;
    a.click();
    URL.revokeObjectURL(url);
};

export {
    generateMidiFromNoteBook,
}