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
    return render_template("index.html", title=index)

# Url for QR Code scanning
@app.route('/QR')
def QR():
    return render_template("QR.html", title=QR-Code)

@app.route('/meeting')
def Meeting():
    return render_template("meeting.html", title=meeting)

@app.route('/meeting/showForTeacher/<teacherId>')
def teacherId():
    return render_template()   

if __name__ == "__main__":
    app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG)

