from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS to handle cross-origin requests

# For video processing
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


app = Flask(__name__)
CORS(app)  # Enable CORS for all domain

@app.route('/post-text', methods=['POST'])
def post_text():
    # Get the text sent in the POST request body as JSON
    data = request.get_json()

    # Get the 'text' field from the JSON payload
    input_text = data.get('videourl', '')
    response_text = ''
    # Perform the text summarization
    
    # The API key we created in step 3
    DEEPGRAM_API_KEY = '04038df4e50f5e06cfa3857f64409e4f4c583e33'

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
    PATH_TO_FILE = video_to_audio(input_text)
    
    # Sample large text (Replace with your actual text)
    large_text = audio_to_text(PATH_TO_FILE)
    
    response_text = text_summary(large_text)

    # Return the response as JSON
    return jsonify({"summary": response_text})
if __name__ == '__main__':
    app.run(debug=True)
