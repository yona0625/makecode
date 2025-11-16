input.onGesture(Gesture.TiltRight, function () {
    basic.showIcon(IconNames.Surprised)
})
input.onGesture(Gesture.TiltLeft, function () {
    basic.showIcon(IconNames.Meh)
})
input.onSound(DetectedSound.Loud, function () {
    input.setSoundThreshold(SoundThreshold.Loud, 255)
    basic.showIcon(IconNames.StickFigure)
    music.play(music.builtinPlayableSoundEffect(soundExpression.twinkle), music.PlaybackMode.UntilDone)
})
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Sad)
    music.play(music.builtinPlayableSoundEffect(soundExpression.happy), music.PlaybackMode.UntilDone)
})
input.onGesture(Gesture.ScreenDown, function () {
    basic.clearScreen()
    music.stopAllSounds()
})
let 현재_빛_세기 = 0
let 모터_구동_중 = false
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
    if (input.soundLevel() >= 255) {
        모터_구동_중 = 모터_구동_중 == false
        basic.pause(500)
    }
})
basic.forever(function () {
    if (input.lightLevel() >= 30) {
        if (현재_빛_세기 == 1) {
            music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.InBackground)
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
