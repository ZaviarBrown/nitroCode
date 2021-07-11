from flask import Blueprint, json, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<string:username>')
@login_required
def userName(username):
    user = User.query.filter(User.username == username).first()
    if user:
        return user.to_dict()
    else:
        return jsonify("false")


@user_routes.route('/<int:id>')
@login_required
def userId(id):
    user = User.query.filter(User.id == id).first()
    if user:
        return user.to_dict()
    else:
        return jsonify("false")
