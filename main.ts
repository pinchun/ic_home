let LIGHT = 0
let RAIN = 0
let FIRE = 0
let HUMID = 0
let TEMP = 0
serial.redirectToUSB()
pins.analogWritePin(AnalogPin.P14, 0)
pins.analogWritePin(AnalogPin.P15, 0)
pins.analogWritePin(AnalogPin.P16, 0)
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P2,
    true,
    false,
    true
    )
    TEMP = dht11_dht22.readData(dataType.temperature)
    HUMID = dht11_dht22.readData(dataType.humidity)
    FIRE = pins.digitalReadPin(DigitalPin.P11)
    RAIN = pins.analogReadPin(AnalogPin.P0)
    LIGHT = pins.digitalReadPin(DigitalPin.P13)
    pins.analogWritePin(AnalogPin.P14, randint(100, 1023))
    pins.analogWritePin(AnalogPin.P15, randint(100, 1023))
    pins.analogWritePin(AnalogPin.P16, randint(100, 1023))
    serial.writeValue("fire", FIRE)
    if (FIRE == 0) {
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.twinkle), SoundExpressionPlayMode.UntilDone)
        for (let index = 0; index < 2; index++) {
            basic.showIcon(IconNames.Surprised)
            basic.showIcon(IconNames.TShirt)
        }
    } else {
        basic.showIcon(IconNames.Heart)
    }
    serial.writeValue("rain", RAIN)
    if (RAIN > 20) {
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.giggle), SoundExpressionPlayMode.UntilDone)
        basic.showIcon(IconNames.Sad)
    } else {
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.sad), SoundExpressionPlayMode.UntilDone)
        basic.showIcon(IconNames.Happy)
    }
    basic.pause(1000)
    if (TEMP != -999) {
        basic.clearScreen()
        basic.showString("T:")
        basic.showNumber(TEMP)
        basic.showString("H:")
        basic.showNumber(HUMID)
    }
    basic.pause(1000)
    serial.writeValue("light", LIGHT)
    if (LIGHT == 0) {
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.happy), SoundExpressionPlayMode.UntilDone)
        basic.showIcon(IconNames.Duck)
    } else {
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.yawn), SoundExpressionPlayMode.UntilDone)
        basic.showIcon(IconNames.No)
    }
})
