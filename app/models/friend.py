from .db import db


class Friend(db.Model):
    __tablename__ = "friends"

    id = db.Column(db.Integer, primary_key=True)
    friendOne = db.Column(db.Integer, nullable=False)
    friendTwo = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "friendOne": self.friendOne,
            "friendTwo": self.friendTwo,
            "status": self.status
        }

    def received(self):
        return self.friendOne

    def sent(self):
        return self.friendTwo
