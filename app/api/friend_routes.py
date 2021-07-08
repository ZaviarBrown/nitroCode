from flask import Blueprint, json, jsonify
from flask_login import login_required, current_user
from app.models import Friend

friend_routes = Blueprint('friend', __name__)


@friend_routes.route('/<int:id>')
@login_required
def friend(id):
    friend = Friend.query.filter(((Friend.friendOne == id) & (Friend.friendTwo == current_user.id)) | ((Friend.friendOne == current_user.id) & (Friend.friendTwo == id))).first()
    print("********************", friend)
    if friend:
        return friend.to_dict()
    else:
        return jsonify("false")
