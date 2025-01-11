from deepgram import DeepgramClient, PrerecordedOptions

# The API key we created in step 3
DEEPGRAM_API_KEY = '04038df4e50f5e06cfa3857f64409e4f4c583e33'

# Replace with your file path
PATH_TO_FILE = 'SOME_FILE.wav'

def main():
    deepgram = DeepgramClient(DEEPGRAM_API_KEY)

    with open(PATH_TO_FILE, 'rb') as buffer_data:
        payload = { 'buffer': buffer_data }

        options = PrerecordedOptions(
            smart_format=True, model="nova-2", language="en-US"
        )

        response = deepgram.listen.prerecorded.v('1').transcribe_file(payload, options)
        print(response.to_json(indent=4))

if __name__ == '__main__':
    main()