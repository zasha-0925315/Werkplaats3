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


@app.route("/base")
def base():
    return render_template("base.html")


# Url for QR Code scanning
@app.route('/QR')
def qr():
    return render_template("QR.html", title=qr)


@app.route('/meeting'
    # , methods=["POST, GET"]
           )
def meeting():
    match request.method:
        case 'GET':
            return render_template('meeting.html')
        case 'POST':
            print("POST")
        case _:
            return render_template('meeting.html')


@app.route('/meeting/<meetingId>', methods=["PUT, PATCH, DELETE"])
def meetingid():
    match request.method:
        case 'PUT':
            print("PUT")
        case 'PATCH':
            print("PATCH")
        case 'DELETE':
            print("DELETE")


@app.route('/meeting/showForTeacher/<teacherId>', methods=["GET"])
def meetingforteacher():
    match request.method:
        case 'GET':
            return render_template('meetingid.html')


@app.route('/student', methods=["GET, POST"])
def student():
    match request.method:
        case 'GET':
            return render_template('student.html')
        case 'POST':
            print("POST")


@app.route('/student/<studentId>', methods=["GET, DELETE"])
def studentid():
    match request.method:
        case 'GET':
            return render_template('studentid.html')
        case 'DELETE':
            print("DELETE")


@app.route('/teacher', methods=["GET, POST"])
def teacher():
    match request.method:
        case 'GET':
            return render_template('teacher.html')
        case 'POST':
            print("POST")


@app.route('/teacher/<teacherId>', methods=["GET, PUT, DELETE"])
def teacherid():
    match request.method:
        case 'GET':
            return render_template('teacherid.html')
        case 'PUT':
            print("PUT")
        case 'DELETE':
            print("DELTE")


@app.route('/class', methods=["GET, POST"])
def studentclass():
    match request.method:
        case 'GET':
            return render_template('class.html')
        case 'POST':
            print("POST")


@app.route("/class/<classId>", methods=["GET, PATCH, DELETE"])
def studentclassid():
    match request.method:
        case 'GET':
            return render_template('classid.html')
        case 'PATCH':
            print("PATCH")
        case 'DELETE':
            print("DELTE")

@app.route("/screen")
def screen():
    return render_template('screen.html', title=screen)

@app.route("/login")
def login():
    return render_template('login.html', title=login)

@app.route("/register")
def register():
    return render_template('register.html', title=register)    

@app.route("/testqr")
def testqr():
    return render_template("qrgen.html")

@app.route("/teapot")
def teapot():
    return render_template("teapot.html"), 418

if __name__ == "__main__":
    app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG)
