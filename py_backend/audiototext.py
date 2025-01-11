from google.cloud import speech
from google.cloud.speech import enums
from google.cloud.speech import types

# Initialize Google Cloud Speech client
client = speech.SpeechClient()

# Load your audio file
with open('output_audio.mp3', 'rb') as audio_file:
    content = audio_file.read()

audio = types.RecognitionAudio(content=content)
config = types.RecognitionConfig(
    encoding=enums.RecognitionConfig.AudioEncoding.MP3,
    sample_rate_hertz=16000,
    language_code='en-US',
)

# Perform speech recognition
response = client.recognize(config=config, audio=audio)

# Print the transcribed text
for result in response.results:
    print(f"Transcript: {result.alternatives[0].transcript}")
