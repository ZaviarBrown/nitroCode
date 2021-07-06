from app.models import db, Codeblock


def seed_codeblocks():

    js1 = Codeblock(
        language="JavaScript",
        lines='''const aFunc = (aParam, aVar) => { for (let i = 0; i < aParam.length; i++) { aVar += aParam[i] } return aVar; }''',
        charCount=110)

    js2 = Codeblock(
        language="JavaScript",
        lines='''const getItem = (value) => ({ type: GET_ITEM, payload: value, });''',
        charCount=65)

    db.session.add(js1)
    db.session.add(js2)

    db.session.commit()


def undo_codeblocks():
    db.session.execute('TRUNCATE codeblocks RESTART IDENTITY CASCADE;')
    db.session.commit()
