input.onGesture(Gesture.TiltRight, function () {
    basic.showIcon(IconNames.Rollerskate)
})
input.onGesture(Gesture.TiltLeft, function () {
    basic.showLeds(`
        # # . . .
        # # . . .
        # # # # #
        # # # # #
        . # . # .
        `)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    모터_구동_중 = 모터_구동_중 == false
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
})
input.onSound(DetectedSound.Loud, function () {
    input.setSoundThreshold(SoundThreshold.Loud, 230)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Nyan), music.PlaybackMode.InBackground)
    basic.showIcon(IconNames.Heart)
})
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Sad)
})
input.onGesture(Gesture.ScreenDown, function () {
    basic.clearScreen()
    music.stopAllSounds()
})
input.onPinPressed(TouchPin.P1, function () {
	
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (모터_구동_중 == true) {
        pins.servoWritePin(AnalogPin.P2, 0)
        basic.pause(500)
        pins.servoWritePin(AnalogPin.P2, 180)
        basic.pause(500)
    } else {
        pins.servoWritePin(AnalogPin.P2, 90)
    }
    basic.clearScreen()
})
let 현재_빛_세기 = 0
let 모터_구동_중 = false
모터_구동_중 = false
basic.forever(function () {
    if (모터_구동_중 == true) {
        pins.servoWritePin(AnalogPin.P2, 0)
        basic.pause(500)
        pins.servoWritePin(AnalogPin.P2, 180)
        basic.pause(500)
    } else {
        pins.servoWritePin(AnalogPin.P2, 90)
    }
})
basic.forever(function () {
    if (input.soundLevel() >= 230) {
        모터_구동_중 = 모터_구동_중 == false
        basic.pause(500)
    }
})
basic.forever(function () {
    if (input.lightLevel() >= 30) {
        if (현재_빛_세기 == 1) {
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Prelude), music.PlaybackMode.InBackground)
            basic.showString("good morning!")
        }
        현재_빛_세기 = 0
    }
})
basic.forever(function () {
    if (input.lightLevel() == 0) {
        if (현재_빛_세기 == 0) {
            music.play(music.builtinPlayableSoundEffect(soundExpression.yawn), music.PlaybackMode.InBackground)
            basic.showString("good night~")
        }
        현재_빛_세기 = 1
    }
})
basic.forever(function () {
    let 현재_음량 = ""
    serial.writeValue(현재_음량, input.soundLevel())
})
