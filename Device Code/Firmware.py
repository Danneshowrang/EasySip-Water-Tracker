import time

import network
import ntptime

import bluetooth
from ble_simple_peripheral import BLESimplePeripheral

from machine import Pin
from hx711_gpio import HX711

from neopixel import NeoPixel

wifi = network.WLAN(network.STA_IF)
wifi.active(True)
wifi.connect("YOUR_SSID", "PASSWORD")

while not wifi.isconnected():
    pass

ntptime.settime()

pin_OUT = Pin(4, Pin.IN, pull=Pin.PULL_DOWN)
pin_SCK = Pin(5, Pin.OUT)
hx = HX711(pin_SCK, pin_OUT)
hx.tare()

button = Pin(3, Pin.IN, Pin.PULL_UP)
led = NeoPixel(Pin(10), 1)

ble = bluetooth.BLE()
sp = BLESimplePeripheral(ble, name="EasySip")

DAILY_GOAL = 2000
total_consumed = 0

EMPTY_THRESHOLD = 20

def is_on_track(total_consumed, hour):
    expected = (hour/24) * DAILY_GOAL
    return total_consumed >= expected

def update_led(total_consumed, hour):
    if is_on_track(total_consumed, hour):
        led[0] = (0, 255, 0)
    else:
        led[0] = (255, 0, 0)
    led.write()

def process_reading(current_weight, baseline):
    if current_weight < EMPTY_THRESHOLD:
        return "empty"
    consumed = baseline - current_weight
    return consumed

def set_baseline(current_weight):
    baseline = current_weight
    return baseline

def check_retare(current_weight, baseline):
    if current_weight > baseline + 100:
        baseline = current_weight
        return baseline
    return baseline

def check_swap(current_weight, baseline):
    if baseline - current_weight > 250:
        return True
    return False

baseline = 0

while True:
    current_weight = hx.get_value()

    if button.value() == 0: baseline = set_baseline(current_weight)

    if time.localtime()[3] == 0 and time.localtime()[4] == 0:
        total_consumed = 0

    update_led(total_consumed, time.localtime()[3])

    baseline =  check_retare(current_weight, baseline)

    if check_swap(current_weight, baseline):
        baseline = set_baseline(current_weight)
    else:
        result = process_reading(current_weight, baseline)
        if result != "empty":
            total_consumed += result
        if sp.is_connected():
            sp.send(str(total_consumed))
            print(result)
    time.sleep(1)