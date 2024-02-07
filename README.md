<p align="center"><img src="https://github.com/3sannasia/VSCode-Extension-unix-to-utc/assets/54860072/94f63320-b1dd-48a8-9514-359b61b629b7" alt="logo" width="250px" /></p>

<h1 align="center">Unix to UTC</h1>

<p align="center"> Allows developers to easily read unix timestamps in VSCode</p>
<p align = "center"r> Version 2.0.2 </p>
<p align="center">
  <a href="#features">Features</a> •
    <a href="#requirements">Requirements</a> •
  <a href="#faq">FAQ</a>

</p>

<div align="center">

<br>

[![license](https://img.shields.io/github/license/dec0dOS/amazing-github-template.svg?style=flat-square)](LICENSE)

</div>

## Features

- Convert Unix timestamps to UTC ISO 8601 timestamps

  ![unix->utc gif](https://github.com/3sannasia/VSCode-Extension-unix-to-utc/assets/54860072/2549bce4-c4ba-4ed1-8b76-ba03f276bebf)

- Convert ISO 8601 timestamps to Unix timestamps

  ![utc->unix gif](https://github.com/3sannasia/VSCode-Extension-unix-to-utc/assets/54860072/1e44ea04-bf6c-4099-af0b-2122801e726e)

- Replace UTC/Unix timestamps

  ![replacetime](https://github.com/3sannasia/VSCode-Extension-Unix-to-UTC/assets/54860072/00228890-7931-43d7-bc9b-a09b96841719)

- Get current Unix timestamp

  ![cur unix gif](https://github.com/3sannasia/VSCode-Extension-unix-to-utc/assets/54860072/82353f24-7284-466d-afac-0c76e294fa89)

- Get current UTC timestamp

  ![cur utc gif](https://github.com/3sannasia/VSCode-Extension-unix-to-utc/assets/54860072/a47043f5-8e9d-4223-9a5d-3867751a9f4a)

- Uses updated timezone accurate Python Datetime functions
  - [It's time for a change, datetime.utcnow is now depreciated](https://blog.miguelgrinberg.com/post/it-s-time-for-a-change-datetime-utcnow-is-now-deprecated)

## Requirements

- uvicorn: ^0.24.0
  - `pip install uvicorn`
- starlette: ^0.27.0
  - `pip install starlette`
- fastapi: ^0.104.1
  - `pip install fastapi`

## FAQ

### What is a Unix timestamp?

Unix time is a date and time representation widely used in computing. It measures time by the number of non-leap seconds that have elapsed since 00:00:00 UTC on 1 January 1970, the Unix epoch.

`Ex: 1707228725.163333`

### What is an ISO 8601 format timestamp and why use it?

ISO 8601 is an international standard covering the worldwide exchange and communication of date and time-related data. I chose this format for its precision and ability to represent UTC offset. It has strong use cases in worldwide communication and time-synchronization.

`Ex: 2024-02-06T14:12:05.163333+00:00`

The ISO 8601 includes the year (YYYY), month (MM), day (DD), followed by the letter 'T' to separate the date from the time, and then the hours (HH), minutes (MM), seconds (SS), and fractional seconds (SSSSSS) with a decimal point. The '+00:00' at the end represents the UTC offset, indicating that the time is in Coordinated Universal Time (UTC) with zero offset (no time zone adjustment).

## Future Plan

- Use the VSCode Hover API to see time conversions on hover
  - Eliminates multiple command clicks
- Add features for the terminal
  - Currently commands only available in the editor
  - Waiting on the development of an upgraded [VSCode Terminal API](https://github.com/microsoft/vscode/issues/188173) to allow to get the user's terminal selection

## Usage

### Local Development

- `git clone repository_url`
- `pip3 install -r src/requirements.txt`
- Run `./test` to run pytests on the API
- See [VSCode Extension Quickstart Readme](vsc-extension-quickstart.md)
