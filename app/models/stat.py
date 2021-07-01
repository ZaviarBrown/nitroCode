from .db import db


class Stat(db.Model):
    __tablename__ = 'stats'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False, unique=True)
    races = db.Column(db.Interger)
    wins = db.Column(db.Integer)
    highestCpm = db.Column(db.Integer)

    user = db.relationship("User", back_populates="stats")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "races": self.races,
            "wins": self.wins,
            "highestCpm": self.highestCpm
        }
