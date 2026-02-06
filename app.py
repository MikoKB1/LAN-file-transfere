from flask import Flask, render_template, request, redirect, send_from_directory
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        files = request.files.getlist("files")
        for f in files:
            if f.filename:
                filename = secure_filename(f.filename)
                f.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        return redirect("/")

    files = os.listdir(app.config["UPLOAD_FOLDER"])
    return render_template("index.html", files=files)

@app.route("/download/<filename>")
def download(filename):
    return send_from_directory(
        app.config["UPLOAD_FOLDER"],
        filename,
        as_attachment=True
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
