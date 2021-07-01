from .db import db


class Race(db.Model):
    __tablename__ = 'races'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False)
    codeblockId = db.Column(db.Integer, db.ForeignKey(
        "codeblocks.id"), nullable=False)
    placement = db.Column(db.Integer, nullable=False)
    cpm = db.Column(db.Integer, nullable=False)
    time = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="races")
    codeblock = db.relationship("Codeblock", back_populates="races")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "codeblockId": self.codeblockId,
            "placement": self.placement,
            "cpm": self.cpm,
            "time": self.time
        }
