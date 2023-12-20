from fastapi import FastAPI, Response, status
from datetime import datetime, timezone

app = FastAPI()

# maybe can cache later for efficiency


# uvicorn datetime_api:app --reload
@app.get("/")
async def root():
    return {"message": "Welcome to unix to utc world"}


# maybe add ui later, would be cool
# https://blog.miguelgrinberg.com/post/it-s-time-for-a-change-datetime-utcnow-is-now-deprecated


@app.get("/current_unix_timestamp")
async def current_unix_timestamp():
    return {"date": datetime.now(timezone.utc).timestamp()}


@app.get("/current_timestamp")
async def current_unix_timestamp():
    return {"date": datetime.now(timezone.utc)}


@app.get("/convert/{date}", status_code=status.HTTP_200_OK)
async def convert(date, response: Response):
    date_time = None
    try:
        if date.isdigit():
            date = int(date)
            date_time = datetime.fromtimestamp(date, timezone.utc)

            return {"date": date_time}
        else:
            date_object = datetime.fromisoformat(date)
            print(date_object)
            utc_timestamp = date_object.timestamp()
            return {"date": utc_timestamp}

    except ValueError as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"date": "error"}
