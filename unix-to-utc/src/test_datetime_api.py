#!/usr/bin/env pytest
import pytest
from datetime import datetime
from fastapi.testclient import TestClient

import datetime_api

client = TestClient(datetime_api.app)


def test_get_current_unix_timestamp():
    response = client.get("/current_unix_timestamp")
    assert response.status_code == 200
    assert type(response.json()["date"]) == float


def test_get_current_timestamp():
    response = client.get("/current_timestamp")
    assert response.status_code == 200
    assert type(response.json()["date"]) == str


def test_convert_with_0():
    response = client.get("/convert/0")
    assert response.status_code == 200
    assert response.json() == {"date": "1970-01-01T00:00:00+00:00"}


def test_convert_with_50():
    response = client.get("/convert/50")
    assert response.status_code == 200
    assert response.json() == {"date": "1970-01-01T00:00:50+00:00"}


def test_convert_with_00009():
    response = client.get("/convert/00009")
    assert response.status_code == 200
    assert response.json() == {"date": "1970-01-01T00:00:09+00:00"}


def test_convert_with_string():
    response = client.get("/convert/1970-01-01T00:00:00+00:00")
    assert response.status_code == 200
    assert response.json() == {"date": 0}


def test_convert_with_string2():
    response = client.get("/convert/1970-01-01T00:00:50+00:00")
    assert response.status_code == 200
    assert response.json() == {"date": 50}


def test_convert_with_timezone_string():
    response = client.get("/convert/1970-01-01T00:00:00+00:01")
    assert response.status_code == 200
    assert response.json() == {"date": -60}


def test_convert_with_timezone_string2():
    response = client.get("/convert/1970-01-01T00:00:50+00:01")
    assert response.status_code == 200
    assert response.json() == {"date": -10}


def test_convert_with_timezone_string3():
    response = client.get("/convert/1970-01-01T00:01:00+00:01")
    assert response.status_code == 200
    assert response.json() == {"date": 0}


def test_convert_with_invalid_date():
    response = client.get("/convert/invalid_date")
    assert response.status_code == 400
    assert response.json() == {"date": "error"}
