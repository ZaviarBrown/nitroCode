from flask import Blueprint
from app.models import Codeblock

code_routes = Blueprint("code", __name__)


@code_routes.route('/<int:id>')
def code(id):
    code = Codeblock.query.get(id)
    return code.to_dict()


@code_routes.route('/all')
def allCode():
    codes = Codeblock.query.all()
    return {'prompts': [code.to_dict() for code in codes]}
