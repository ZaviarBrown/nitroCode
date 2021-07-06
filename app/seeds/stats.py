from app.models import db, Stat


def seed_stats():

    stat1 = Stat(
        userId=1,
        races=0,
        wins=0,
        highestCpm=0)

    db.session.add(stat1)

    db.session.commit()


def undo_stats():
    db.session.execute('TRUNCATE stats RESTART IDENTITY CASCADE;')
    db.session.commit()
