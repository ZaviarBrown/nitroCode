from .db import db


class Codeblock(db.Model):
    __tablename__ = "codeblocks"

    id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String(50), nullable=False)
    lines = db.Column(db.Text, nullable=False, unique=True)
    charCount = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "language": self.language,
            "lines": self.lines,
            "charCount": self.charCount
        }
