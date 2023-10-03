require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const { Deepgram } = require("@deepgram/sdk");
const fs = require("fs");
const { v4:uuidv4 } = require('uuid');

const port = process.env.PORT || 3000;

const deepgramApiKey = process.env.DEEPGRAM_API_KEY;

const app = express();
const command = ffmpeg();

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// configure body-parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

let videoId = uuidv4();

let uploadedChunks = [];

const uploadDir = path.join(__dirname, '/uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Start video Route
app.post('/api/start',  (req, res) => {
    try{

        const videoId = uuidv4();
        
        return res.status(200).json({
            status: 'success',
            message: 'UUID generated',
            videoId: videoId
        });
        
        

    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong'
        });
    }
});

// Upload video route
app.post('/api/uploadFIle', upload.single('myFile'), async (req, res) => {
    try {

        const {
            file,
            videoId
        } = req.body;

        await uploadedChunks.push(req.file.buffer);

        const videoPath = path.join(uploadDir, `${videoId}.webm`);

        await fs.promises.writeFile(videoPath, uploadedChunks);

        const audioPath = path.join(uploadDir, `audio-${videoId}.mp3`);

        command.input(videoPath);
        command.audioCodec('libmp3lame');
        command.toFormat('mp3');
        command.output(audioPath);
        command
            .on('end', () => {
                const mimetype = 'audio/mp3';

                const deepgram = new Deepgram(deepgramApiKey);

                const audio = fs.readFileSync(audioPath);
                source = {
                    buffer: audio,
                    mimetype: mimetype
                };

                deepgram.transcription
                    .preRecorded(source, {
                        smart_format: true,
                        model: 'nova'
                    })
                    .then((response) => {
                        const transcript = response.results.channels[0].alternatives[0].transcript;

                        const transcriptPath = path.join(uploadDir, `transcript-${videoId}.srt`);

                        fs.promises.writeFile(transcriptPath, transcript, (err) => {
                            if (err) {
                                console.log('Error writing .srt file:', err)
                            } 
                        });

                        return res.status(200).json({
                            status: 'success',
                            message: 'Video & Transcript ready',
                            video: videoPath,
                            transcript: transcriptPath
                        });
                    })
                    .catch ((err) => {
                        console.log(err);
                    });
            })
            .on('error', (err) => {
                console.log(err);
            })
            .run();



    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: "invalid video file"
        });

    }
})

// Stop video route
app.post('/api/stop', async (req, res) => {
    try {
        videoId = req.body.videoId;

        if (uploadedChunks.length === 0 || !videoId) {
            return res.status(400).json({
                message: 'No video received'
            });
        }

        const receivedChunks = Buffer.concat(uploadedChunks);

        return res.status(200).json({
            videoId: videoId,
            videoFile: receivedChunks,
            transcription: transcript 
        });



    } catch (error) {
        res.status(500).json({
            status: failed,
            message: 'Internal Error'
        });
    }

})

//Get video route
app.get("/api/getVideo/:id", async (req, res) => {
    try {
      const videoId = req.params.id;
      
      const videoPath = path.join(uploadDir, `${videoId}.webm`);
  
      const stream = fs.createReadStream(videoPath);
  
      stream.pipe(videoFile);

      return res.status(200).json({
        status: 'success',
        video: videoFile
      });

      
      
    } catch (error) {
      res.json({
        status: "Fail",
        error,
      });
    }
});

const server = app.listen(port, () => {
    console.log('Server is up listening on port:' + port);
});

process.on("unhandledRejection", (error) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});


