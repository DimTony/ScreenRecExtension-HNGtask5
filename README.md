# Screen Recording Chrome Extension API

This Node.js API allows you to perform video processing tasks, including uploading video chunks, concatenating videos, and transcribing the concatenated.

- [Screen Recording Chrome Extension API](#screen-recording-chrome-extension-api)
  - [1. Features](#1-features)
  - [2. Getting Started](#2-getting-started)
  - [3. Prerequisites](#3-prerequisites)
  - [4. Project Dependencies](#4-project-dependencies)
  - [5. Installation](#5-installation)
    - [Clone This Repository:](#clone-this-repository)
    - [Install Dependencies](#install-dependencies)
    - [Configure the API](#configure-the-api)
  - [6. Usage](#6-usage)
    - [Running the API](#running-the-api)
    - [API Interactions](#api-interactions)
    - [Limitations](#limitations)
    - [Live URL](#live-url)
  - [7. Contributing](#7-contributing)

## 1. Features

- Upload video chunks.
- Concatenate uploaded video chunks.
- Transcribe the concatenated video.
- Retrieve video and transcription information.

## 2. Getting Started

Follow the steps below to set up and run the API.

## 3. Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## 4. Project Dependencies

- Express
- Body-parser
- Path
- Multer
- Fluent-ffmpeg
- Deepgram SDK
- Fs
- UUID
- Dotenv

## 5. Installation
### Clone This Repository:
```
  git clone https://github.com/DimTony/HNGtask5-Extension.git
  cd HNGtask5-Extension
```


### Install Dependencies
```
  npm install
```
  This installs the packages in the package.json file.

### Configure the API

  Create a .env file in the root directory and specify your environment variables, including your Deepgram API Key and preferred port

  - PORT= The port on which the API will run (default is 3000)
  - DEEPGRAM_API_KEY= The API Key to your Deepgram instance.

  **Sample:**
  ```
  PORT=3000
  DEEPGRAM_API_KEY=YOUR_DEEPGRAM_API_KEY_HERE
  ``` 


        

## 6. Usage

### Running the API
  To start the API, run the following command:

  ```
  npm start
  ```
  The API will start and be available at http://localhost:3000 (or the port you specified in the .env file)

### API Interactions

  Use an API client (e.g., Postman) to interact with the following endpoints

  - Start Video: `POST /api/start`
  - Upload, Concatenate & Transcribe Video: `POST /api/uploadFile`
  - Retrieve Video Information: `GET /api/getVideo/:id`
### Limitations

  - A good internet connection is required when running the API as it involves video manipulations.

### Live URL

This API is hosted on Render at the following address:
[Live URL](https://chrome-api-zzsk.onrender.com)

## 7. Contributing

Contributions are welcomed! Feel free to open issues or submit pull requests or reach out through email via: [MyEmail](mailto:dhymyantt1@gmail.com).
