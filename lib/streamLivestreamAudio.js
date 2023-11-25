const fs = require('fs')
const { AudioStream, MediaUdp } = require('@dank074/discord-video-stream')
const {StreamOutput} = require("@dank074/fluent-ffmpeg-multistream-ts")
const prism = require("prism-media")
const ffmpeg = require("fluent-ffmpeg")

/**
 * 
 * @param {string} input 
 * @param {MediaUdp} udp 
 * @returns {Promise<string>}
 */
module.exports = (input, udp) => {
    return new Promise((resolve, reject) => {
        const headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.3",
            "Connection": "keep-alive"
        }

        let isHttpUrl = false;
        let isHls = false;

        if(typeof input === "string")
        {
            isHttpUrl = input.startsWith('http') || input.startsWith('https');
            isHls = input.includes('m3u');
        }        

        try {
            const opus = new prism.opus.Encoder({ channels: 2, rate: 48000, frameSize: 960 });
            const audioStream = new AudioStream(udp);
            command = ffmpeg(input)
            .addOption('-loglevel', '0')
            .addOption('-fflags', 'nobuffer')
            .addOption('-analyzeduration', '0')
            .on('end', () => {
                command = undefined;
                resolve("video ended")
            })
            .on("error", (err, stdout, stderr) => {
                command = undefined;
                reject('cannot play video ' + err.message)
            })
            .on('stderr', console.error)
            .output(StreamOutput(opus).url, { end: false})
            .audioChannels(2)
            .audioFrequency(48000)
            .format('s16le')
            .audioCodec('pcm_s16le')

            if(isHttpUrl) {
                command.inputOption('-headers', 
                    Object.keys(headers).map(key => key + ": " + headers[key]).join("\r\n")
                );
                if(!isHls) {
                    command.inputOptions([
                        '-reconnect 1',
                        '-reconnect_at_eof 1',
                        '-reconnect_streamed 1',
                        '-reconnect_delay_max 4294'
                    ]);
                }
            }
            
            opus.pipe(audioStream,{end: false})
            command.run();
        } catch(e) {
            command = undefined;
            reject("cannot play video " + e.message);
        }
    })
}