from app.models import db, Codeblock


def seed_codeblocks():

    js1 = Codeblock(
        language="JavaScript",
        lines="const aFunc = (aParam, aVar) => { for (let i = 0; i < aParam.length; i++) { aVar += aParam[i] } return aVar; }",
        charCount=110)

    db.session.add(js1)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_codeblocks():
    db.session.execute('TRUNCATE codeblocks RESTART IDENTITY CASCADE;')
    db.session.commit()
