import ast
import os

import datetime

from os import environ, path
from dotenv import load_dotenv
from flask import Flask, render_template, request, session, redirect, url_for, json, jsonify, flash

from lib.login import AccountManagement
#from lib.user import Login
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

# database shiz
DB_FILE = os.path.join(app.root_path, "databases", "demo_data.db")

logindb = AccountManagement(DB_FILE)
#userdb = UserManagement(DB_FILE)
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

@app.route("/link", methods=["GET","POST"])
def link():
    teacher_list = teacherdb.get_all_teachers()
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
    
    teacher_list = teacherdb.get_all_teachers()
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


@app.route('/checkin/<meetingId>', methods=["GET", "POST"])
def checkin_id(meetingId):
         meeting_info = meetingdb.get_meeting(meetingId)
         question = meeting_info[0]["question"]
         return render_template('checkin.html', meetingId=meetingId, meeting_info=meeting_info, question=question)

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
    t_list = teacherdb.get_all_teachers()
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
        return redirect(url_for('index'))
    return render_template('admin.html')

@app.route('/admin/klas')
def admin_klas():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('class.html')

@app.route('/admin/klas/add')
def add_klas():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('addklas.html')

@app.post('/admin/klas/add')
def add_klas_post():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    
    klas = request.form.get('klas').strip()

    classdb.add_class(klas)

    flash("klas aangemaakt!", "info")
    return redirect(url_for('admin_klas'))

@app.route('/api/adminstudent')
def api_get_students_admin():
    s_list = studentdb.get_student_admin()

    return jsonify({
        'studenten' : s_list
    })

@app.route('/admin/student')
def admin_student():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('adminstudent.html')

@app.route('/admin/student/<studentId>')
def admin_studentid(studentId):
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    
    student_info = studentdb.get_student(studentId)

    if student_info is None:
        flash("Student verwijderd!", "warning")
        return redirect(url_for('admin_student'))

    id = student_info[0]
    voornaam = student_info[1]
    achternaam = student_info[2]

    return render_template('adminstudentid.html', id=id, voornaam=voornaam, achternaam=achternaam)

@app.put('/admin/student/<studentId>')
def update_student(studentId):

    student_json = request.get_json()
    print(student_json)

    id = student_json.get('id')
    voornaam = student_json.get('voornaam')
    achternaam = student_json.get('achternaam')

    print(id, voornaam, achternaam)

    studentdb.edit_student(voornaam, achternaam, id)
    flash("Student bewerkt!", "info")

    return redirect(url_for('admin_student'))

@app.delete('/admin/student/<studentId>')
def delete_student(studentId):

    studentdb.delete_student(studentId)
    
    return flash("Student verwijderd!", "warning")

@app.route('/admin/student/add')
def add_student():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('addstudent.html')

@app.post('/admin/student/add')
def add_student_post():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    
    studentennummer = request.form.get('studentennummer').strip()
    voornaam = request.form.get('voornaam').strip()
    achternaam = request.form.get('achternaam').strip()

    studentdb.add_student(studentennummer, voornaam, achternaam)

    flash("Student aangemaakt!", "info")
    return redirect(url_for('admin_student'))

@app.route('/api/adminteacher')
def api_get_teachers_admin():
    t_list = teacherdb.get_teacher_admin()

    return jsonify({
        'docenten' : t_list
    })

@app.route('/admin/teacher')
def admin_teacher():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('adminteacher.html')

@app.route('/admin/teacher/<teacherId>')
def admin_teacherid(teacherId):
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    
    docent_info = teacherdb.get_teacher(teacherId)

    if docent_info is None:
        flash("Docent is verwijderd!", "warning")
        return redirect(url_for('admin_teacher'))

    id = docent_info[0]
    voornaam = docent_info[1]
    achternaam = docent_info[2]
    email = docent_info[3]

    return render_template('adminteacherid.html', id=id, voornaam=voornaam, achternaam=achternaam, email=email)

@app.put('/admin/teacher/<teacherId>')
def update_teacher(teacherId):

    docent_json = request.get_json()
    print(docent_json)

    id = docent_json.get('id')
    voornaam = docent_json.get('voornaam')
    achternaam = docent_json.get('achternaam')
    email = docent_json.get('email')

    print(id, voornaam, achternaam, email)

    teacherdb.edit_teacher(voornaam, achternaam, email, id)
    flash("Docent is bewerkt!", "info")

    return redirect(url_for('admin_teacher'))

@app.delete('/admin/teacher/<teacherId>')
def delete_teacher(teacherId):

    teacherdb.delete_teacher(teacherId)
    
    return flash("Docent is verwijderd!", "warning")

@app.route('/admin/teacher/add')
def add_teacher():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('addteacher.html')

@app.post('/admin/teacher/add')
def add_teacher_post():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    
    docentencode = request.form.get('docentencode').strip()
    voornaam = request.form.get('voornaam').strip()
    achternaam = request.form.get('achternaam').strip()
    email = request.form.get('email').strip()

    teacherdb.add_teacher(docentencode, voornaam, achternaam, email)

    flash("Docent aangemaakt!", "info")
    return redirect(url_for('admin_teacher'))

@app.route('/api/accounts')
def api_get_accounts():
    account_list = logindb.get_account_json()
    #print(user_list)
    return jsonify({ 
        'accounts' : account_list
    })

@app.route('/admin/accounts')
def accounts():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('users.html')

@app.route('/account/<accountId>')
def accountid(accountId):
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))

    account_info = logindb.get_account_detail(accountId)

    if account_info is None:
        flash("Gebruiker verwijderd of bestaat niet!", "warning")
        return redirect(url_for('accounts'))
    
    id = account_info[0]
    em = account_info[1]
    ww = account_info[2]
    dc = account_info[3]
    tp = account_info[4]

    return render_template('userid.html', accountid = accountId, id=id, em=em, ww=ww, dc=dc, tp=tp )

@app.route('/admin/account/add')
def add_account():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('adduser.html')

@app.post('/admin/account/add')
def add_account_post():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    
    email = request.form.get('email').strip()
    wachtwoord = request.form.get('wachtwoord')
    docent = request.form.get('docent').strip()
    admin =request.form.get('admin')

    if admin == "on":
        admin = 1
    else:
        admin = 0

    logindb.create_account(email, wachtwoord, docent, admin)

    flash("Gebruiker aangemaakt!", "info")
    return redirect(url_for('accounts'))

@app.put('/account/<account>')
def update_account(accountId):

    acc_json = request.get_json()
    print(acc_json)

    id = acc_json.get('id')
    email = acc_json.get('email')
    wachtwoord = acc_json.get('wachtwoord')
    docent = acc_json.get('docent')
    is_admin = acc_json.get('is_admin')
    print(id, email, wachtwoord, docent, is_admin)

    logindb.update_account(email, wachtwoord, docent, is_admin, id)
    flash("Gebruiker bewerkt!", "info")

    return redirect('users.html')

@app.delete('/account/<accountId>')
def delete_account(accountId):

    logindb.delete_account(accountId)
    
    return flash("Gebruiker verwijderd!", "warning")

@app.route('/admin/enrollment')
def admin_enrollment():
    if not session.get('logged_in'):
        return redirect(url_for('show_login'))
    elif not session.get('username') == 'admin':
        return redirect(url_for('link'))
    return render_template('enrollment.html')

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
    return redirect(url_for("index"))

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

@app.route('/index')
@app.route('/')
def index():
    return render_template('home.html')

if __name__ == "__main__":
    #ctx = ('zeehond.crt', 'zeehond.key')
    app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG)
    #app.run(host=FLASK_IP, port=FLASK_PORT, debug=FLASK_DEBUG, ssl_context=ctx)
