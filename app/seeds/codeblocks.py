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

    js3 = Codeblock(
        language="JavaScript",
        lines='''console.log("Data should appear here!", data.values)''',
        charCount=52)

    js4 = Codeblock(
        language="JavaScript",
        lines='''const [state, setState] = useState(true)''',
        charCount=40)

    js5 = Codeblock(
        language="JavaScript",
        lines='''if (arr.length < 10) { num -= arr.length } else if (arr.length < 50) { num += arr.length } else { num = arr.length }''',
        charCount=116)

    db.session.add(js1)
    db.session.add(js2)
    db.session.add(js3)
    db.session.add(js4)
    db.session.add(js5)

    db.session.commit()


def undo_codeblocks():
    db.session.execute('TRUNCATE codeblocks RESTART IDENTITY CASCADE;')
    db.session.commit()
