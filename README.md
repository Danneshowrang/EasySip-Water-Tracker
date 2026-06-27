# EasySip-Water-Tracker
A smart water-tracking coaster that monitors your daily intake using a load cell, without requiring any manual input beyond zeroing.

<img width="2560" height="761" alt="EasySip_Assembly_1_(1)_2026-Jun-27_02-32-19AM-000_CustomizedView27792942075_png" src="https://github.com/user-attachments/assets/349e2109-cd12-4155-848b-2ddd83155ec3" />

#The Problem
Many people find themselves too busy or distracted to drink water everyday. EasySip passively monitors water intake without the need of manual logging. A status light provides feedback on hydration progress at a glance, while the companion app sends reminders when the user falls behind on their daily goals. Smart tracking features automatically detect sips, refills, and cup swaps. The only input required by the user is for zeroing the scale when a new cup is used.

#Schematic
<img width="746" height="372" alt="image" src="https://github.com/user-attachments/assets/cc90e7e3-e2a1-4243-8496-eb0cdf04d241" />

#Code
The firmware and device functionality is fully programmed in Python. The firmware running on an ESP32C3 handles sip detection, refill recognition, and cup swap detection using a layered logic system. Data is sent via Bluetooth to a React Native companion app that exhibits daily intake, consumption history, and overall progress.

#Bill Of Materials
[BOM.csv](https://github.com/user-attachments/files/29404130/BOM.csv)
