# webcam-control-stream-service

## How to run the project

### Prerequisites

1. Node & npm
2. ffmpeg

```
$ sudo apt update
$ sudo apt install ffmpeg
```

### App install

```
$ npm install
$ npm run build #build FE
```

### App start
```
$ npm start #start streaming server
$ bash stream-camera.linux.sh #stream your default device
```

To stop you can invoke `npm run stop`

Info about webcam streaming: [https://trac.ffmpeg.org/wiki/Capture/Webcam](https://trac.ffmpeg.org/wiki/Capture/Webcam)

## Some app info

* `:3001/api/v1/webcam-stream` - video stream
* `:3002/api/v1/users` - users list, sign in new user


