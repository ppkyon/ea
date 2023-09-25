
import datetime
import uuid

def create_token():
    return uuid.uuid4().hex

def create_expiration_date(hours):
    now = datetime.datetime.now()
    return now + datetime.timedelta(hours=hours)