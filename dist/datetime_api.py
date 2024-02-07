#!/usr/bin/env python3

import argparse
from fastapi import FastAPI, Response, status
from datetime import datetime, timezone


app = FastAPI()
# Updated based on https://blog.miguelgrinberg.com/post/it-s-time-for-a-change-datetime-utcnow-is-now-deprecated

@app.get("/")
async def root():
    return {"message": "Welcome to unix to utc timestamp converter"}


@app.get("/current_unix_timestamp")
async def current_unix_timestamp():
    return {"date": datetime.now(timezone.utc).timestamp()}


@app.get("/current_utc_timestamp")
async def current_unix_timestamp():
    return {"date": datetime.now(timezone.utc)}


@app.get("/convert/{date}", status_code=status.HTTP_200_OK)
async def convert(date, response: Response):
    date_time = None
    try:
        unix_float = float(date)
        date_time = datetime.fromtimestamp(unix_float, timezone.utc)
        return {"date": date_time}
    except:
        print("trying float")

    try:
        
        date_object = datetime.fromisoformat(date)
        utc_timestamp = date_object.timestamp()
        return {"date": utc_timestamp}
 
    except ValueError as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"date": "error"}
    
    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("datetime_api:app", port=8001)
    
    

