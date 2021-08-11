from flask import Blueprint
from flask.globals import request
from app.models import db, Stat, Practice
from flask_login import login_required, current_user

stat_routes = Blueprint("stat", __name__)


def findAvg(practices):
    cpms = []
    print(practices)
    for cpm in practices:
        cpms.append(cpm.cpm)
    totalCpm = 0
    for cpm in cpms:
        totalCpm += cpm
    avgCpm = totalCpm / len(cpms)
    return avgCpm


@stat_routes.route('/<int:id>')
def stat(id):
    stat = Stat.query.filter(Stat.userId == id).first()
    return stat.to_dict()


@stat_routes.route('/', methods=["POST"])
@login_required
def create_stat():
    stat = Stat(
        userId=current_user.id,
        practices=0,
        wins=0,
        highestCpm=0,
        averageCpm=0,
    )
    db.session.add(stat)
    db.session.commit()
    return {"placeholder": "placeholder"}


@stat_routes.route('/', methods=["PATCH"])
@login_required
def update_stat():
    cpm = request.json
    stat = Stat.query.filter(Stat.userId == current_user.id).first()
    practices = Practice.query.filter(Practice.userId == current_user.id).all()
    averageCpm = findAvg(practices)
    if cpm > stat.highestCpm:
        stat.highestCpm = cpm
    stat.averageCpm = averageCpm
    stat.practices = stat.practices + 1
    db.session.commit()
    return {"cpm": cpm}
