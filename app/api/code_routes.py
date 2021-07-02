from flask import Blueprint
from app.models import Codeblock

code_routes = Blueprint("code", __name__)


@code_routes.route('/')
def code():
    codeblocks = Codeblock.query.all()
    return {"codeblocks": [code.to_dict() for code in codeblocks]}
