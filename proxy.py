from flask import Flask, request, jsonify
import requests
import logging
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes in your app

logging.basicConfig(level=logging.DEBUG)

@app.route('/check')
def check_last_modified():
    url = request.args.get('url')
    if not url:
        return jsonify({'error': 'Missing URL'}), 400

    try:
        logging.info(f"Checking URL: {url}")
        resp = requests.head(url, timeout=5)
        logging.debug(f"Response Headers: {resp.headers}")
        last_modified = resp.headers.get('Last-Modified', None)
        return jsonify({
            'url': url,
            'lastModified': last_modified
        })
    except Exception as e:
        logging.error(f"Error fetching {url}: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
