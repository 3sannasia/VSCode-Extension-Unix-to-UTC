from fastapi import FastAPI, Response, status
from datetime import datetime, timezone

app = FastAPI()

# maybe can cache later for efficiency


# uvicorn datetime_api:app --reload
@app.get("/")
async def root():
    return {"message": "Welcome to unix to utc world"}


@app.get("/current_unix_timestamp")
async def current_unix_timestamp():
    current_utc_time = datetime.utcnow()
    current_utc_timestamp = current_utc_time.replace(tzinfo=timezone.utc).timestamp()
    return {"unix": current_utc_timestamp}


@app.get("/current_timestamp")
async def current_unix_timestamp():
    current_utc_time = datetime.utcnow()
    return {"unix": current_utc_time}


@app.get("/convert/{date}", status_code=status.HTTP_200_OK)
async def convert(date, response: Response):
    date_time = None
    try:
        if date.isdigit():
            date = int(date)
            date_time = datetime.utcfromtimestamp(date)
            return {"date": date_time}
        else:
            # If it's not an integer, assume it's a string in the format '%Y-%m-%dT%H:%M:%S'
            date_object = datetime.fromisoformat(date)
            utc_timestamp = date_object.replace(tzinfo=timezone.utc).timestamp()
            return {"date": utc_timestamp}

    except ValueError as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"date": "error"}
