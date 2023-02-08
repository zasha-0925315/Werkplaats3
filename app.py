from flask import Flask, render_template, request

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

@app.route('/meeting', methods=["POST, GET"])
def Meeting():
    match request.method:
        case 'GET':
            print("GET")
        case 'POST':
            print("POST")

@app.route('/meeting/<meetingId>', methods=["PUT, PATCH, DELETE"])
def MeetingId():
    match request.method:
        case 'PUT':
            print("PUT")
        case 'PATCH':
            print("PATCH")
        case 'DELETE':
            print("DELETE")

@app.route('/meeting/showForTeacher/<teacherId>', methods=["GET"])
def MeetingForTeacher():
    match request.method:
        case 'GET':
            print("GET")

@app.route('/student', methods=["GET, POST"])
def student():
    match request.method:
        case 'GET':
            print("GET")
        case 'POST':
            print("POST")

@app.route('/student/<studentId>', methods=["GET, DELETE"])
def studentId():
    match request.method:
        case 'GET':
            print("GET")
        case 'DELETE':
            print("DELETE")

@app.route('/teacher', methods=["GET, POST"])
def teacher():
    match request.method:
        case 'GET':
            print("GET")
        case 'POST':
            print("POST")

@app.route('/teacher/<teacherId>', methods=["GET, PUT, DELETE"])
def teacherId():
    match request.method:
        case 'GET':
            print("GET")
        case 'PUT':
            print("PUT")
        case 'DELETE':
            print("DELTE")

@app.route('/class', methods=["GET, POST"])
def studentclass():
    match request.method:
        case 'GET':
            print("GET")
        case 'POST':
            print("POST")



@app.route("class/<clasId>", methods=["GET, PATCH, DELETE"])
def studentclassid():
    match request.method:
        case 'GET':
            print("GET")
        case 'PATCH':
            print("PATCH")
        case 'DELETE':
            print("DELTE")

if __name__ == "__main__":
    app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG)

