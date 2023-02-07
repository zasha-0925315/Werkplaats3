from flask import Flask, render_template

# Flask server
LISTEN_ALL = "0.0.0.0"
FLASK_IP = LISTEN_ALL
FLASK_PORT = 81
FLASK_DEBUG = True

app = Flask(__name__)

# Main route
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/teapot")
def teapot():
    return render_template("teapot.html"), 418

if __name__ == "__main__":
    app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG)
