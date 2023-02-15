import os
from flask import Flask, render_template, request, session, redirect, url_for
from forms import LoginForm, RegistrationForm
from flask_sqlalchemy import SQLAlchemy


# Flask server
LISTEN_ALL = "0.0.0.0"
FLASK_IP = LISTEN_ALL
FLASK_PORT = 81
FLASK_DEBUG = True

db = SQLAlchemy()


app = Flask(__name__)
app.config['SECRET_KEY'] ='sfsfl446klxjaasdksldklfgg'
app.config['SQLALCHEMY_DATABASE_URI'] = '../databases/demo_data.db'
 
@app.before_request
def check_login():
    if request.endpoint not in ["static"]:
        if not session.get("logged_in"):
            return redirect(url_for('show_login'))

# Main route
@app.route("/")
@app.route("/index")
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
            print("DELETE")

@app.route("/screen")
def screen():
    return render_template('screen.html', title=screen)


@app.route('/login', methods=["GET", "POST"])
def show_login():
    session["username"] = request.form.get("username")
    #     if username in users and users[username][1]== password:
    #         session["username"] = username            
    #         return redirect(url_for("home"))
    return render_template("login.html")

@app.route("/handle_login", methods=["GET","POST"])
def handle_login():
    if request.form["password"] == "password" and request.form["username"] == "admin":
        session["logged_in"] = True
    # if request.method == "POST":
    #     username = request.form.get("username")
    #     password = request.form.get("password")
    #     session["logged_in"] = True
    else:
        return render_template("login.html", message="Invalid Password or Username.")
    return redirect(url_for('base'))

@app.route("/register")
def register():
    return render_template('register.html', title=register)    

@app.route("/testqr")
def testqr():
    return render_template("qrgen.html")

@app.route("/teapot")
def teapot():
    return render_template("teapot.html"), 418

@app.route("/link")
def link():
    return render_template('link.html')    

if __name__ == "__main__":
    app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG)
