from flask import Blueprint
from flask.globals import request
from app.models import db, Stat
from flask_login import login_required, current_user

stat_routes = Blueprint("stat", __name__)


@stat_routes.route('/<int:id>')
def stat(id):
    stats = Stat.query.filter(Stat.userId == id)
    return {"stat": [stat.to_dict() for stat in stats]}


@stat_routes.route('/', methods=["PATCH"])
@login_required
def update_stat():
    cpm = request.json
    stat = Stat.query.filter(Stat.userId == current_user.id).first()
    if cpm > stat.highestCpm:
        stat.highestCpm = cpm
    stat.races = stat.races + 1
    db.session.commit()
    return {"cpm": cpm}
