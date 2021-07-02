from flask import Blueprint
from app.models import Codeblock

race_routes = Blueprint("race", __name__)


@race_routes.route('/<int:id>')
def race(id):
    race = Codeblock.query.get(id)
    return race.to_dict()
