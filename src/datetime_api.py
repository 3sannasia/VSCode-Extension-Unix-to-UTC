from fastapi import FastAPI
from datetime import datetime

app = FastAPI()

# maybe can cache later for efficiency


def validate(date_text) -> bool:
    try:
        parser.parse(date_text)
        return True
    except ValueError:
        return False


# uvicorn datetime_api:app --reload
@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/convert/{date}")
async def convert(date):
    try:
        # Check if the date is an integer (timestamp)
        if date.isdigit():
            date = int(date)
            date_time = datetime.utcfromtimestamp(date)
        else:
            # If it's not an integer, assume it's a string in the format '%Y-%m-%dT%H:%M:%S'
            date_time = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S")
            da
        return {"date": date_time}, 200

    except ValueError as e:
        # Handle parsing errors
        return {"error": f"Invalid date format: {e}"}, 400
