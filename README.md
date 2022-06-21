# ir-remote
A raspberry pi web app 
I wrote this app to replace our old tv remote because my younger siblings would always loose our remote

A web server with routes to save run `ir-ctl` commands 
https://github.com/shoopapa/ir-remote/blob/main/src/ir.ts

Saves command output to file, so any ir remote button can be emulated 

Also creates mapping to files so the web app can call them again from routes

All of these pulses can than be controlled on a phone on the same local network

phsicaly tranmiteres and recivers where soldered to raspberry pi to along with a simple circut to boost power to trasmiter for futher range.
Ir tranmiteres and recivers firmware was installed and configured to be used in raspberrian 

Created react-app for phones to run to send http requests to raspberry pi server.
