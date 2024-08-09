import os
import argparse
import pathlib
from flask import Flask, jsonify, request
from flask_cors import CORS
import pymupdf4llm

app = Flask(__name__)

CORS(app)

# tmp directory for uploaded files
UPLOAD_FOLDER = './tmp'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/', methods=["GET"])
def read_root():
    return jsonify({"message": "root route reached."})


@app.route('/upload', methods=["POST"])
def upload_pdf():
    if 'file_binary' not in request.files:
        return jsonify({"message": "No file_binary in request body"}), 400

    file = request.files['file_binary']

    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    try:
        md_text = pymupdf4llm.to_markdown(file_path)
        
        output_path = os.path.join(UPLOAD_FOLDER, 'output.md')
        pathlib.Path(output_path).write_bytes(md_text.encode('utf-8'))

        return jsonify({"message": "File successfully processed.", "markdown": md_text})

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

    finally:
        os.remove(file_path)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Run Flask application.')
    parser.add_argument('--debug', action='store_true',
                        help='Run the server in debug mode')
    args = parser.parse_args()

    port = int(os.getenv("PORT", default=8080))

    app.run(debug=args.debug, port=port)
