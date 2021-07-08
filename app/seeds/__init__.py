from flask.cli import AppGroup
from .users import seed_users, undo_users
from .codeblocks import seed_codeblocks, undo_codeblocks
from .stats import seed_stats, undo_stats
from .friends import seed_friends, undo_friends

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_codeblocks()
    seed_stats()
    seed_friends()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_codeblocks()
    undo_stats()
    undo_friends()
    # Add other undo functions here
