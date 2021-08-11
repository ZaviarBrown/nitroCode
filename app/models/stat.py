from .db import db


class Stat(db.Model):
    __tablename__ = 'stats'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        "users.id"), nullable=False, unique=True)
    practices = db.Column(db.Integer)
    wins = db.Column(db.Integer)
    highestCpm = db.Column(db.Integer)
    averageCpm = db.Column(db.Integer)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "practices": self.practices,
            "wins": self.wins,
            "highestCpm": self.highestCpm,
            "averageCpm": self.averageCpm
        }
