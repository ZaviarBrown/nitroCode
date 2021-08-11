from flask import Blueprint
from flask.globals import request
from app.models import db, Practice
from flask_login import login_required, current_user

practice_routes = Blueprint("practice", __name__)


def managePractices(practices):
    practiceData = []
    for practice in practices:
        practiceData.append({"cpm": practice.cpm})
    return practiceData


@practice_routes.route('/', methods=["POST"])
@login_required
def new_practice():
    practiceData = request.json
    newPractice = Practice(
        userId=current_user.id,
        codeblockId=practiceData["codeblockId"],
        placement=practiceData["placement"],
        cpm=practiceData["cpm"],
        time=practiceData["time"],
    )
    db.session.add(newPractice)
    db.session.commit()
    practiceId = newPractice.id
    userId = newPractice.userId
    return {"id": practiceId, "userId": userId}


@practice_routes.route('/')
@login_required
def get_practices():
    practices = Practice.query.filter(Practice.userId == current_user.id).all()
    practiceData = managePractices(practices)
    return {"practices": practiceData}
