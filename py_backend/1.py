import os
import cv2
import yt_dlp

from moviepy.editor import VideoFileClip

from deepgram import DeepgramClient, PrerecordedOptions

# For text summary
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist
import heapq

# The API key we created in step 3
DEEPGRAM_API_KEY = '04038df4e50f5e06cfa3857f64409e4f4c583e33'

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

def video_to_audio(downloaded_video_path):
# L your video file
    video = VideoFileClip(downloaded_video_path)

    # # Extract the audio
    audio = video.audio
    # Replace with your file path
    PATH_TO_FILE = 'output_audio.mp3'

    # # Save audio as an MP3 file
    audio.write_audiofile(PATH_TO_FILE)
    return PATH_TO_FILE

def audio_to_text(PATH_TO_FILE):
    deepgram = DeepgramClient(DEEPGRAM_API_KEY)
    with open(PATH_TO_FILE, 'rb') as buffer_data:
        payload = { 'buffer': buffer_data }

        options = PrerecordedOptions(
            smart_format=True, model="nova-2", language="en-US"
        )

        response = deepgram.listen.prerecorded.v('1').transcribe_file(payload, options)
        # print(response.to_json(indent=4))
        text = response.to_dict()['results']['channels'][0]['alternatives'][0]['transcript']
        return text

def text_summary(large_text):
    # Download the necessary resources
    nltk.download('punkt')
    nltk.download('stopwords')
    # Tokenize the text into sentences
    sentences = sent_tokenize(large_text)

    # Tokenize the text into words and convert to lowercase for consistency
    words = word_tokenize(large_text.lower())

    # Remove stopwords and non-alphanumeric characters (like punctuation)
    stop_words = set(stopwords.words('english'))
    filtered_words = [word for word in words if word.isalnum() and word not in stop_words]

    # Calculate word frequencies
    fdist = FreqDist(filtered_words)

    # Rank the sentences based on their word frequencies
    sentence_ranking = {}
    for i, sentence in enumerate(sentences):
        sentence_tokens = word_tokenize(sentence.lower())  # Tokenize sentence into words
        sentence_score = 0
        for word in sentence_tokens:
            if word in fdist:
                sentence_score += fdist[word]  # Add the frequency of each word in the sentence to the score
        sentence_ranking[i] = sentence_score

    # Select the top N sentences for the summary (you can adjust N)
    N = 3  # Number of sentences in the summary
    top_sentences = heapq.nlargest(N, sentence_ranking, key=sentence_ranking.get)

    # Construct the summary by selecting the corresponding sentences
    summary = [sentences[i] for i in sorted(top_sentences)]
    final_summary = ' '.join(summary)
    return final_summary

# Example Usage
youtube_url = "https://www.youtube.com/watch?v=JzPfMbG1vrE"  # Replace with your video link
download_folder = "videos"
keyframes_folder = "keyframes_output"
frame_interval = 30

# # Step 1: Download YouTube video
downloaded_video_path = download_youtube_video(youtube_url, download_folder)

if downloaded_video_path:
    PATH_TO_FILE = video_to_audio(downloaded_video_path)
    
    # Sample large text (Replace with your actual text)
    large_text = audio_to_text(PATH_TO_FILE)
    
    summary = text_summary(large_text)