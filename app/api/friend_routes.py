from flask import Blueprint, json, jsonify
from flask.globals import request
from flask_login import login_required, current_user
from app.models import db, Friend

friend_routes = Blueprint('friend', __name__)


@friend_routes.route('/')
@login_required
def requests():
    receiveds = Friend.query.filter((Friend.friendTwo == current_user.id) & (Friend.status == "Pending")).all()
    print(receiveds)
    sents = Friend.query.filter((Friend.friendOne == current_user.id) & (Friend.status == "Pending")).all()
    return {"received": [received.received() for received in receiveds], "sent": [sent.sent() for sent in sents]}


@friend_routes.route('/', methods=["POST"])
@login_required
def new_request():
    friendRequest = request.json
    newRequest = Friend(
        friendOne=current_user.id,
        friendTwo=friendRequest["id"],
        status="Pending",
    )
    db.session.add(newRequest)
    db.session.commit()
    return newRequest.to_dict()


@friend_routes.route('/', methods=["PATCH"])
@login_required
def accept_request():
    id = request.json
    friend = Friend.query.filter((Friend.friendOne == id) & (Friend.friendTwo == current_user.id)).first()
    friend.status = "Friends"
    db.session.commit()
    return {"id": id}


@friend_routes.route('/<int:id>')
@login_required
def friend(id):
    friend = Friend.query.filter(((Friend.friendOne == id) & (Friend.friendTwo == current_user.id)) | ((Friend.friendOne == current_user.id) & (Friend.friendTwo == id))).first()
    if friend:
        return friend.to_dict()
    else:
        return jsonify("false")
