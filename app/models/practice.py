from .db import db


class Practice(db.Model):
    __tablename__ = 'practices'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    codeblockId = db.Column(db.Integer, db.ForeignKey(
        "codeblocks.id"), nullable=False)
    placement = db.Column(db.Integer, nullable=False)
    cpm = db.Column(db.Integer, nullable=False)
    time = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "codeblockId": self.codeblockId,
            "placement": self.placement,
            "cpm": self.cpm,
            "time": self.time
        }
