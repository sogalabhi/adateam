import os
import cv2
import yt_dlp

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
youtube_url = "https://www.youtube.com/watch?v=NrO0CJCbYLA"  # Replace with your video link
download_folder = "videos"
keyframes_folder = "keyframes_output"
frame_interval = 30

# Step 1: Download YouTube video
downloaded_video_path = download_youtube_video(youtube_url, download_folder)

if downloaded_video_path:
    # Step 2: Extract keyframes
    extract_keyframes(downloaded_video_path, keyframes_folder, frame_interval)
