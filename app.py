import ast
import os
from flask import Flask, render_template, request, session, redirect, url_for, json, jsonify
from lib.forms import LoginForm
from lib.login import Login
from lib.managestudent import StudentManagement
from lib.manageteacher import TeacherManagement
from lib.manageclass import ClassManagement
from lib.meeting import MeetingManagement
from lib.presence import PresenceManagement

# Flask server
LISTEN_ALL = "0.0.0.0"
FLASK_IP = LISTEN_ALL
FLASK_PORT = 81
FLASK_DEBUG = True

# other important stuffs
app = Flask(__name__)
app.config['SECRET_KEY'] = 'sfsfl446klxjaasdksldklfgg'
app.config['SQLALCHEMY_DATABASE_URI'] = '../databases/demo_data.db'

    
app.config["SECRET_KEY"] = "yeet"
DB_FILE = os.path.join(app.root_path, "databases", "demo_data.db")

login = Login(DB_FILE)
studentdb = StudentManagement(DB_FILE)
teacherdb = TeacherManagement(DB_FILE)
classdb = ClassManagement(DB_FILE)
meetingdb = MeetingManagement(DB_FILE)
presencedb = PresenceManagement(DB_FILE)

# This command creates the "<application directory>/databases/testcorrect_vragen.db" path
DATABASE_FILE = os.path.join(app.root_path, 'databases', 'databases/demo_data.db')

# Check if the database file exists.
if not os.path.isfile(DATABASE_FILE):
    print(f"Could not find database {DATABASE_FILE}, creating a demo database.")


@app.before_request
def check_login():
    if request.endpoint not in ["static","index","show_login", "handle_login"]:
        if not session.get("logged_in"):
            return redirect(url_for('show_login'))

# Main route
@app.route("/")
def index():
    return render_template("index.html", title=index)

@app.route("/test-ajax.html", methods = ['GET'])
def testajax():
    return render_template("test-ajax.html")

@app.route("/base")
def base():
    return render_template("base.html")


# Url for QR Code scanning
@app.route('/QR')
def qr():
    return render_template("QR.html", title=qr)


@app.route('/meeting', methods=["GET", "POST"])
def meeting():

    match request.method:
        case 'GET':
            teacher_list = teacherdb.get_teacher()
            class_list = classdb.get_class()

            return render_template('create_meeting.html', teachers=teacher_list, classes=class_list)

        case 'POST':
            meeting_name = str(request.form.get('meeting_name'))
            meeting_datetime = request.form.get('meeting_datetime')
            meeting_location = str(request.form.get('meeting_location'))
            meeting_teacher = str(request.form.getlist('meeting_teacher'))
            meeting_classes = str(request.form.getlist('meeting_class')).replace("[", "").replace("]", "")
            meeting_students = str(studentdb.get_students_by_class(meeting_classes))
            meeting_students2 = studentdb.get_students_by_class(meeting_classes)

            meetingdb.add_meeting(meeting_name, meeting_datetime, meeting_location, meeting_teacher, meeting_students, meeting_students2)

            return redirect(url_for('meeting'))

        case _:
            return render_template('create_meeting.html')


@app.route('/meeting/<meetingId>', methods=["GET", "PUT", "PATCH"])
def meetingid(meetingId):
    match request.method:
        case 'GET':
            meeting_info = meetingdb.get_meeting(meetingId)
            student_list = ast.literal_eval(meeting_info[0]["student"])

            return render_template('meetingid.html', meetingId=meetingId, meeting_info=meeting_info, student_list=student_list)

        case 'PUT':
            print("PUT")
        case 'PATCH':
            json_data = request.get_json()
            presencedb.update_presence(json_data)
            return json.jsonify()

@app.route('/api/<meetingId>', methods=["GET"])
def api_get_meeting(meetingId):

    presence_list = presencedb.get_presence(meetingId)

    return json.jsonify({
        'presence_list': presence_list
    })

@app.route('/api/class/json', methods=["GET"])
def api_get_docentmeeting():

    docent_meeting = meetingdb.get_all_meetings()
    print(docent_meeting)
    
    return json.jsonify({
        'meeting_info' : docent_meeting, 
    })

@app.route('/oneonone', methods=["GET", "POST"])
def oneonone():

    match request.method:
        case 'GET':

            class_list = classdb.get_class()
            # selected_class =
            # student_list = meetingdb.get_students_by_class(selected_class)

            return render_template('oneOnOne.html', classes=class_list)
        case 'POST':
            print("POST")

        case _:
            print("nope")


@app.route('/checkin')
def checkin():

    return render_template('checkin.html')

@app.route('/meeting/showForTeacher/<teacherId>', methods=["GET"])
def meetingforteacher():
    match request.method:
        case 'GET':
            return render_template('meetingid.html')


@app.route('/student', methods=["GET", "POST"])
def student():
    match request.method:
        case 'GET':
            return render_template('student.html')
        case 'POST':
            print("POST")


@app.route('/student/<studentId>', methods=["GET", "DELETE"])
def studentid():
    match request.method:
        case 'GET':
            return render_template('studentid.html')
        case 'DELETE':
            print("DELETE")


@app.route('/teacher', methods=["GET", "POST"])
def teacher():
    match request.method:
        case 'GET':
            return render_template('teacher.html')
        case 'POST':
            print("POST")


@app.route('/teacher/<teacherId>', methods=["GET", "PUT", "DELETE"])
def teacherid():
    match request.method:
        case 'GET':
            return render_template('teacherid.html')
        case 'PUT':
            print("PUT")
        case 'DELETE':
            print("DELTE")


@app.route('/class', methods=["GET", "POST"])
def studentclass():
    match request.method:
        case 'GET':
            return render_template('class.html')
        case 'POST':
            print("POST")


@app.route("/class/<classId>", methods=["GET", "PATCH", "DELETE"])
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
    if session.get('logged_in'):
        return redirect(url_for("link"))
    else:
        return render_template('login.html')
      
  
@app.route("/handle_login", methods=["GET", "POST"])
def handle_login():
    if request.form["password"] == "password" and request.form["username"] == "admin":
        session["logged_in"] = True
    # if request.method == "POST":
    #     username = request.form.get("username")
    #     password = request.form.get("password")
    #     session["logged_in"] = True
    else:
        return render_template("login.html", message="Invalid Password or Username.")
    return redirect(url_for('link'))

@app.route("/register")
def register():
    return render_template('register.html', title=register)    

@app.route("/testqr")
def testqr():
    return render_template("qrgen.html")

@app.route("/teapot")
def teapot():
    return render_template("teapot.html"), 418

@app.route("/link", methods=["GET","POST"])
def link():
    match request.method:
        case 'GET':
            teacher_list = teacherdb.get_teacher()

    return render_template('link.html', teachers=teacher_list)


@app.route("/logout")
def logout():
    session.pop('logged_in', None)
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG)
