from flask import Blueprint
from flask.globals import request
from app.models import db, Race
from flask_login import login_required, current_user

race_routes = Blueprint("race", __name__)


def manageRaces(races):
    raceData = []
    for race in races:
        raceData.append({"cpm": race.cpm})
    return raceData


@race_routes.route('/', methods=["POST"])
@login_required
def new_race():
    raceData = request.json
    newRace = Race(
        userId=current_user.id,
        codeblockId=raceData["codeblockId"],
        placement=raceData["placement"],
        cpm=raceData["cpm"],
        time=raceData["time"],
    )
    db.session.add(newRace)
    db.session.commit()
    raceId = newRace.id
    userId = newRace.userId
    return {"id": raceId, "userId": userId}


@race_routes.route('/')
@login_required
def get_races():
    races = Race.query.filter(Race.userId == current_user.id).all()
    raceData = manageRaces(races)
    return {"races": raceData}
