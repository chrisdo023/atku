from flask import Flask, render_template, request, jsonify
import urllib.request
import json
from urllib.error import HTTPError, URLError

app = Flask(__name__)

def extract_deck_id(url):
    try:
        # Find the position of 'decks/' in the URL
        start_index = url.index('decks/') + len('decks/')
        # Extract the content after 'decks/'
        deck_id = url[start_index:]
        mainboard = extract_deck_content(deck_id)
        return mainboard
    except ValueError:
        return "Invalid URL format"

def extract_deck_content(deck_id):
    url = "https://api.moxfield.com/v2/decks/all/" + deck_id

    # Create a request object with a user-agent header
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}
    request = urllib.request.Request(url, headers=headers)
    try:
        # Open the URL and read the content
        with urllib.request.urlopen(request) as response:
            html = response.read()
        
        # Convert the response to JSON
        data = json.loads(html.decode('utf-8'))

        # Parse mainboard and commanders from data
        mainboard = data["mainboard"]
        commanders = data["commanders"]

        # Append commanders content to mainboard
        mainboard.update(commanders)

        return mainboard
        # for card in mainboard:
        #     print("Card Name: " + card + " (" + mainboard[card]["card"]["set"] + ")")
        #     print("Artist: " + mainboard[card]["card"]["artist"])

    except HTTPError as e:
        print(f"HTTP error occurred: {e.code} - {e.reason}")
    except URLError as e:
        print(f"URL error occurred: {e.reason}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

@app.route('/submit-url', methods=['POST'])
def submit_url():
    data = request.get_json()
    url = data.get('url')
    mainboard = extract_deck_id(url)
    
    if mainboard:
        return jsonify({'mainboard': mainboard})
    else:
        return jsonify({'error': 'Invalid URL'}), 400

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')



if __name__ == '__main__':
    app.run(debug=True)
