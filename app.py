import ast
import os
import datetime

from os import environ, path
from dotenv import load_dotenv
from flask import Flask, render_template, request, session, redirect, url_for, json, jsonify, flash
#from flask_wtf import CSRFProtect

#from lib.forms import LoginForm
from lib.login import Login
from lib.user import UserManagement
from lib.student import StudentManagement
from lib.teacher import TeacherManagement
from lib.klas import ClassManagement
from lib.meeting import MeetingManagement
from lib.presence import PresenceManagement
from lib.checkin import CheckinManagement

# no touchy
projpath = path.join(path.dirname(__file__), '.env')
load_dotenv(projpath)

# Flask server
LISTEN_ALL = "0.0.0.0"
FLASK_IP = LISTEN_ALL
FLASK_PORT = 81
FLASK_DEBUG = True
#FLASK_RUN_CERT = "adhoc"

# app config
app = Flask(__name__)
app.config['SECRET_KEY'] = environ.get('SECRET_KEY')
app.config['JSON_SORT_KEYS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = '../databases/demo_data.db'

#csrf = CSRFProtect() # dingetje
#csrf.init_app(app)

# database shiz
DB_FILE = os.path.join(app.root_path, "databases", "demo_data.db")

login = Login(DB_FILE)
userdb = UserManagement(DB_FILE)
studentdb = StudentManagement(DB_FILE)
teacherdb = TeacherManagement(DB_FILE)
classdb = ClassManagement(DB_FILE)
meetingdb = MeetingManagement(DB_FILE)
presencedb = PresenceManagement(DB_FILE)
checkindb = CheckinManagement(DB_FILE)

# routes
@app.before_request
def check_login():
    if request.endpoint not in ["base","show_login", "handle_login"]:
        if not session.get("logged_in", "username"):
            return redirect(url_for('show_login'))

# Main route
# @app.route("/")
# def index():
#     return render_template("index.html", title=index)

@app.route("/", methods=["GET","POST"])
def link():
    teacher_list = teacherdb.get_teacher()
    return render_template('link.html', teachers=teacher_list)

# Url for QR Code scanning
@app.route('/QR')
def qr():
    return render_template("QRscan.html")

@app.route('/meeting')
def meeting():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    
    return render_template('meeting_list.html')

@app.route('/api/meeting')
def api_meeting():
    meeting_list = meetingdb.get_all_meetings()
    print(meeting_list)

    return json.jsonify({
        'meetings': meeting_list
    })

@app.route('/meeting/new')
def creat_meeting():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    
    teacher_list = teacherdb.get_teacher()
    class_list = classdb.get_class()
    
    return render_template('create_meeting.html', teachers=teacher_list, classes=class_list)

@app.post('/meeting/new') # shortcut voor methods = ["POST"]
def meeting_post():
    json_meeting = request.get_json()

    meeting_classes = str(json_meeting["class"]).replace("[", "").replace("]", "")
    meeting_students = str(studentdb.get_students_by_class(meeting_classes))
    meeting_students2 = studentdb.get_students_by_class(meeting_classes)

    meetingdb.add_meeting(
        json_meeting,
        meeting_students,
        meeting_students2)

    flash("Meeting toegevoegd!", "info")
    return redirect('meeting')

@app.route('/meeting/<meetingId>', methods=["GET", "POST", "PUT", "PATCH", "DELETE"])
def meetingid(meetingId):
    match request.method:
        case 'GET':
            meeting_info = meetingdb.get_meeting(meetingId)
            student_list = ast.literal_eval(meeting_info[0]["student"])
            answer_info = checkindb.show_answers(meetingId)
            question = meeting_info[0]["question"]

            return render_template('meetingid.html', meetingId=meetingId, meeting_info=meeting_info, student_list=student_list, answer_info=answer_info, question=question)
        case 'POST':
             meeting_info = meetingdb.get_meeting(meetingId)
             question = str(request.form.get('question'))
             checkindb.add_question(question)
             return render_template('meetingid.html', meetingId=meetingId, question=question, meeting_info=meeting_info)
        case 'PUT':
            print("PUT")
        case 'PATCH':
            json_data = request.get_json()
            presencedb.update_presence(json_data)
            return json.jsonify()

@app.patch('/api/question')
def question_api():
        json_data = request.get_json()
        checkindb.update_question(json_data)
        print (json_data)
        return json.jsonify()

@app.route('/api/<meetingId>')
def api_get_meeting(meetingId):

    presence_list = presencedb.get_presence(meetingId)

    return json.jsonify({
        'presence_list': presence_list
    })

@app.route('/api/answers/<meetingId>')
def api_get_answers(meetingId):
    answer_info = checkindb.show_answers(meetingId)

    return json.jsonify({
        'answer_info': answer_info
    })

@app.route('/api/class/json', methods=["GET"])
def api_get_docentmeeting():

    docent_meeting = meetingdb.get_all_meetings()
    print(docent_meeting)

    return json.jsonify({
        'meeting_info' : docent_meeting, 
    })

@app.route('/checkedin')
def checked_in():
    return render_template('checkedin.html')

@app.route('/checkin/<meetingId>')
def checkin():
    return render_template('checkin.html')

@app.route('/checkin/<meetingId>', methods=["GET", "POST"])
def checkin_id(meetingId):
         meeting_info = meetingdb.get_meeting(meetingId)
         question = meeting_info[0]["question"]
         return render_template('checkin.html', meetingId=meetingId, meetings=meeting_info, question=question)

@app.post('/checkin/<meetingId>')
def post_checkin(meetingId):
    json_data = request.get_json()
    checkindb.post_answers(json_data)
    return json.jsonify()

@app.patch('/checkin/<meetingId>')
def patch_checkin(meetingId):
     json_data = request.get_json()
     checkindb.patch_checkin(json_data)
     print (json_data)
     return json.jsonify()

@app.route('/overzicht', methods =["GET"])
def overzicht():
   results = checkindb.get_results()
   return render_template('overzicht.html', results=results)

@app.route('/overzicht/<meetingId>', methods =["GET"])
def get_overzicht(meetingId):
  match request.method:
      case 'GET':
          meeting_list = meetingdb.get_meeting(meetingId)
          return render_template('overzicht.html', meetings=meeting_list, meetingId=meetingId)

@app.route('/sign_out/<meetingId>')
def sign_out(meetingId):
    return render_template('sign_out.html')

@app.patch('/sign_out/<meetingId>')
def sign_out_post(meetingId):
    json_data = request.get_json()
    presencedb.update_presence(json_data)
    print(json_data)
    return json.jsonify()

@app.route('/meeting/showForTeacher/<teacherId>', methods=["GET"])
def meetingforteacher():
    match request.method:
        case 'GET':
            return render_template('meetingid.html')

@app.route('/student')
def student():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    
    return render_template('student.html')

@app.post('/student') # shortcut voor methods = ["POST"]
def student_post():
    return render_template('student.html')

@app.route('/student/<studentId>', methods=["GET", "DELETE"])
def studentid(studentId):
    return render_template('studentid.html')

@app.route('/api/student')
def api_get_students():
    s_list = studentdb.get_student_json()
    #print(s_list)
    # ik weet niet wat ik aan het doen ben, help
    #return json.dumps(s_list)
    return jsonify({ # oke, mooi. wat doe ik nu hier mee?
        'studenten' : s_list
    })

@app.route('/api/student/<studentId>')
def api_get_student_presence(studentId):
    p_s_list = presencedb.get_presence_student(studentId)

    return jsonify({
        'presence' : p_s_list
    })

@app.route('/api/teacher')
def api_get_teachers():
    t_list = teacherdb.get_teacher_json()
    #print(t_list)

    return jsonify({
        'docenten' : t_list
    })

@app.route('/teacher')
def teacher():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    t_list = teacherdb.get_teacher()
    return render_template('teacher.html', teachers=t_list)

@app.post('/teacher') # shortcut voor methods = ["POST"]
def teacher_post():
    return render_template('teacher.html')

@app.route('/teacher/<teacherId>', methods=["GET", "PUT", "DELETE"])
def teacherid():
    match request.method:
        case 'GET':
            return render_template('teacherid.html')
        case 'PUT':
            print("PUT")
        case 'DELETE':
            print("DELETE")

@app.route('/api/klas')
def api_get_class():
    class_list = classdb.get_class()
    #print(class_list)

    return jsonify({
        'klassen' : class_list
    })

@app.route('/class')
def studentclass():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    class_list = classdb.get_class()
    return render_template('class.html', classes=class_list)

@app.post('/class') # shortcut voor methods = ["POST"]
def studentclass_post():
    return render_template('class.html')

@app.route("/class/<classId>", methods=["GET", "PATCH", "DELETE"])
def studentclassid():
    match request.method:
        case 'GET':
            return render_template('classid.html')
        case 'PATCH':
            print("PATCH")
        case 'DELETE':
            print("DELETE")

@app.route('/admin')
def admin():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('admin.html')

@app.route('/admin/class')
def admin_class():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('class.html')

@app.route('/admin/student')
def admin_student():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('student.html')

@app.route('/admin/teacher')
def admin_teacher():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('teacher.html')

@app.route('/api/users')
def api_get_users():
    user_list = userdb.get_user_json()
    #print(user_list)
    return jsonify({ 
        'users' : user_list
    })

@app.route('/admin/users')
def users():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('users.html')

@app.route('/user/<userId>')
def userid(userId):
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))

    user_info = userdb.get_user_detail(userId)
    print(user_info)

    if user_info is None:
        flash("Gebruiker verwijderd of bestaat niet!", "warning")
        return redirect(url_for('users'))
    
    id = user_info[0]
    gb = user_info[1]
    ww = user_info[2]
    tp = user_info[3]

    return render_template('userid.html', userid = userId, id=id, gb=gb, ww=ww, tp=tp )

@app.patch('/user/<userId>')
def update_user(userId):

    json = request.get_json()
    print(json)

    user_id = json.get('user_id')
    gebruikersnaam = json.get('gebruikersnaam')
    wachtwoord = json.get('wachtwoord')
    is_admin = json.get('is_admin')
    print(user_id, gebruikersnaam, wachtwoord, is_admin)

    userdb.update_user(gebruikersnaam, wachtwoord, is_admin, user_id)
    flash("Gebruiker bewerkt!", "info")

    return redirect('users.html')

@app.delete('/user/<userId>')
def delete_user(userId):

    userdb.delete_user(userId)
    flash("Gebruiker verwijderd!", "warning")

    return redirect(url_for('users'))

@app.route('/login')
def show_login():
    session["username"] = request.form.get("username")
    if session.get('logged_in'):
        return redirect(url_for("link"))
    else:
        return render_template('login.html')
      
@app.post("/handle_login")
def handle_login():
    if request.form["password"] == "password" and request.form["username"] == "admin" or request.form["password"] == "password" and request.form["username"] == "docent":
        session["logged_in"] = True
        session['username'] = request.form["username"]
        print(session['username'])
    else:
        flash("Invalid Password or Username.", "warning")
        return render_template("login.html")
    return redirect(url_for('link'))

@app.route("/logout")
def logout():
    session.pop('logged_in', 'username')
    return redirect(url_for("link"))

@app.route("/register")
def register():
    return render_template('register.html', title=register)    

@app.route("/QRgen/<meetingId>", methods = ["GET"])
def qrgen(meetingId):
    match request.method:
      case 'GET':
       meeting_info = meetingdb.get_meeting(meetingId)
       return render_template("qrgen.html", meetings=meeting_info, meetingId=meetingId, message='dog')

@app.route("/api/checkin/<meetingId>")
def QR_checkin(meetingId):
    meeting_info = meetingdb.get_meeting(meetingId)
    
    return jsonify({
        'meeting_info' : meeting_info
    })

@app.route("/teapot")
def teapot():
    return render_template("teapot.html"), 418

if __name__ == "__main__":
    #ctx = ('zeehond.crt', 'zeehond.key')
    app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG)
    #app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG, ssl_context=FLASK_RUN_CERT)