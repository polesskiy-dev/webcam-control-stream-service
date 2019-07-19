#!/bin/bash
ffmpeg \
	-f avfoundation \
		-framerate 30 -video_size 1280x720 -i "default" \
	-f mpegts \
		-codec:v mpeg1video -s 1280x720 -b:v 4M -bf 0 \
	http://localhost:3001/stream-receiver