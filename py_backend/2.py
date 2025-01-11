import os
import cv2
import yt_dlp

from moviepy.editor import VideoFileClip

from deepgram import DeepgramClient, PrerecordedOptions
import json
def download_youtube_video(youtube_url, output_folder="videos"):
    """
    Downloads a YouTube video and saves it locally using yt-dlp.
    
    Args:
        youtube_url (str): URL of the YouTube video.
        output_folder (str): Folder to save the downloaded video.
        
    Returns:
        str: Path to the downloaded video file.
    """
    os.makedirs(output_folder, exist_ok=True)
    ydl_opts = {
        'outtmpl': os.path.join(output_folder, '%(title)s.%(ext)s'),
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        result = ydl.extract_info(youtube_url, download=True)
        print(f"Video downloaded: {result['title']}")
        return os.path.join(output_folder, f"{result['title']}.mp4")

def extract_keyframes(video_path, output_folder, frame_interval=30):
    """
    Extracts keyframes from a video and saves them as JPEG images.
    
    Args:
        video_path (str): Path to the input video file.
        output_folder (str): Path to the folder where extracted frames will be saved.
        frame_interval (int): Extract one frame every 'frame_interval' frames.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print("Error: Could not open video file.")
        return
    
    os.makedirs(output_folder, exist_ok=True)
    frame_count = 0
    saved_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % frame_interval == 0:
            frame_filename = os.path.join(output_folder, f"frame_{frame_count}.jpg")
            cv2.imwrite(frame_filename, frame)
            saved_count += 1
        frame_count += 1

    cap.release()
    print(f"Keyframes extracted: {saved_count}")
    print(f"Saved in folder: {output_folder}")

# Example Usage
youtube_url = "https://www.youtube.com/watch?v=JzPfMbG1vrE"  # Replace with your video link
download_folder = "videos"
keyframes_folder = "keyframes_output"
frame_interval = 30

# Step 1: Download YouTube video
downloaded_video_path = download_youtube_video(youtube_url, download_folder)

# Load your video file
video = VideoFileClip(downloaded_video_path)

# Extract the audio
audio = video.audio

if True:
# if downloaded_video_path:
    # # Step 2: Extract keyframes
    # # extract_keyframes(downloaded_video_path, keyframes_folder, frame_interval)
    # Save audio as an MP3 file
    # audio.write_audiofile('output_audio.mp3')

    # The API key we created in step 3
    DEEPGRAM_API_KEY = '04038df4e50f5e06cfa3857f64409e4f4c583e33'

    # Replace with your file path
    PATH_TO_FILE = 'output_audio.mp3'

    deepgram = DeepgramClient(DEEPGRAM_API_KEY)

    with open(PATH_TO_FILE, 'rb') as buffer_data:
        payload = { 'buffer': buffer_data }

        options = PrerecordedOptions(
            smart_format=True, model="nova-2", language="en-US"
        )

        response = deepgram.listen.prerecorded.v('1').transcribe_file(payload, options)
        # print(response.to_json(indent=4))
        text = response.to_dict()['results']['channels'][0]['alternatives'][0]['transcript']
        print(text)