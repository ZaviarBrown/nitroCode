from app.models import db, Friend


def seed_friends():

    friendship1 = Friend(
        friendOne=1,
        friendTwo=2,
        status="Friends")

    db.session.add(friendship1)

    db.session.commit()


def undo_friends():
    db.session.execute('TRUNCATE friends RESTART IDENTITY CASCADE;')
    db.session.commit()
