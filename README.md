<p align="center"><img src="https://github.com/3sannasia/VSCode-Extension-unix-to-utc/assets/54860072/94f63320-b1dd-48a8-9514-359b61b629b7" alt="logo" width="250px" /></p>

<h1 align="center">Unix to UTC</h1>

<p align="center"> Allows developers to easily read unix timestamps in VSCode</p>
<p align="center">
  <a href="#features">Features</a> •
  <a href="#usage">Usage</a> •
  <a href="#FAQ">FAQ</a>
</p>

<div align="center">

<br>

[![license](https://img.shields.io/github/license/dec0dOS/amazing-github-template.svg?style=flat-square)](LICENSE)

</div>

## Features

- Convert Unix timestamps to UTC ISO 8601 timestamps
  ![]()

- Convert ISO 8601 timestamps to Unix timestamps
  ![]()

- Get current Unix timestamp
  ![]()

- Get current UTC timestamp
  ![]()

## FAQ

### What is a Unix timestamp?

Unix time is a date and time representation widely used in computing. It measures time by the number of non-leap seconds that have elapsed since 00:00:00 UTC on 1 January 1970, the Unix epoch.

`Ex: 1707228725.163333`

### What is an ISO 8601 format timestamp and why use it?

ISO 8601 is an international standard covering the worldwide exchange and communication of date and time-related data. I chose this format for its precision and ability to represent UTC offset. It has strong use cases in worldwide communication and time-synchronization.

`Ex: 2024-02-06T14:12:05.163333+00:00`

The ISO 8601 includes the year (YYYY), month (MM), day (DD), followed by the letter 'T' to separate the date from the time, and then the hours (HH), minutes (MM), seconds (SS), and fractional seconds (SSSSSS) with a decimal point. The '+00:00' at the end represents the UTC offset, indicating that the time is in Coordinated Universal Time (UTC) with zero offset (no time zone adjustment).

## Future Plan

- Add features for the terminal
  - Currently commands only available in the editor
  - Waiting on the development of an upgraded [VSCode Terminal API](https://github.com/microsoft/vscode/issues/188173) to allow to get the user's terminal selection

## Usage

### Local Development

- `git clone repository_url`
- `pip3 install -r src/requirements.txt`
- Run `./test` to run pytests on the API
- See [VSCode Extension Quickstart Readme](vsc-extension-quickstart.md)
