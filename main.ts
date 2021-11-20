namespace SpriteKind {
    export const Sierra = SpriteKind.create()
    export const StackSierra = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    newSierra.setFlag(SpriteFlag.BounceOnWall, false)
    newSierra.vx = 0
    newSierra.vy = 300
})
sprites.onOverlap(SpriteKind.Sierra, SpriteKind.StackSierra, function (theDroppedSierra, theTopSierra) {
    theDroppedSierra.vy = 0
    theDroppedSierra.ay = 0
    if (theSierraLanded(theDroppedSierra)) {
        info.changeScoreBy(1)
        theDroppedSierra.setKind(SpriteKind.StackSierra)
        topSierra = theDroppedSierra
        scene.cameraFollowSprite(topSierra)
        createNewSierra()
        theStackWillFall()
        if (theStackWillFall()) {
            knockOverStack()
            pause(500)
            game.showLongText("AWWWWWWWWWWWW! WE FAILED!", DialogLayout.Bottom)
            game.over(false)
        }
    }
})
function theStackWillFall () {
    stackSierras = sprites.allOfKind(SpriteKind.StackSierra)
    xSum = 0
    for (let sierra of stackSierras) {
        xSum += sierra.x
    }
    xAverage = xSum / stackSierras.length
    if (xAverage < baseSierra.left || xAverage > baseSierra.right) {
        return true
    } else {
        return false
    }
}
function theSierraLanded (theDroppedSierra: Sprite) {
    if (theDroppedSierra.x < topSierra.left) {
        theDroppedSierra.vx = -50
        theDroppedSierra.ay = 300
        return false
    } else if (theDroppedSierra.x > topSierra.right) {
        theDroppedSierra.vx = 50
        theDroppedSierra.ay = 300
        return false
    } else {
        return true
    }
}
function knockOverStack () {
    stackSierras = sprites.allOfKind(SpriteKind.StackSierra)
    for (let s of stackSierras) {
        if (Math.percentChance(50)) {
            s.vx = 50
        } else {
            s.vx = -50
        }
        s.ay = 300
    }
}
function createNewSierra () {
    newSierra = sprites.create(sierraImgs[randint(0, sierraImgs.length - 1)], SpriteKind.Sierra)
    newSierra.setPosition(randint(20, 140), topSierra.y - 20)
    if (Math.percentChance(50)) {
        newSierra.vx = randint(50, 100)
    } else {
        newSierra.vx = randint(-50, -100)
    }
    newSierra.setFlag(SpriteFlag.BounceOnWall, true)
}
scene.onHitWall(SpriteKind.Sierra, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        sprite.sayText(":C")
        sprite.destroy(effects.disintegrate, 100)
        info.changeLifeBy(-1)
        createNewSierra()
    }
})
let xAverage = 0
let stackSierras: Sprite[] = []
let newSierra: Sprite = null
let topSierra: Sprite = null
let baseSierra: Sprite = null
let sierraImgs: Image[] = []
let xSum = 0
info.setScore(0)
xSum = 0
sierraImgs = [
img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f f e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    f f f f f f f f f f f f f f f f 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . f f f 5 5 f f f . . . . 
    . . . f f f 5 5 5 5 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 5 5 5 5 5 5 e e f . . 
    . f f e 5 f f f f f f 5 e f f . 
    . f f f f f e e e e f f f f f . 
    . . f e f b f 3 3 f b f e f . . 
    . . f e 3 1 f d d f 1 3 e f . . 
    . . . f e 3 d d d d 4 e f e . . 
    . . f e f 5 5 5 5 e d d 3 e . . 
    . . e 3 f 5 5 5 5 e d d e . . . 
    . . . . f 3 3 5 5 f e e . . . . 
    . . . . f f f f f f f . . . . . 
    f f f f f f f f f f f f f f f f 
    `,
img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 7 7 f b f e f f . 
    . f e e 7 1 f d d f 1 7 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 7 7 7 7 e e f . . . 
    . . e 7 f 2 2 2 2 2 2 f 7 e . . 
    . . 7 d f 2 2 2 2 2 2 f d 7 . . 
    . . 7 7 f 7 7 5 5 7 7 f 7 7 . . 
    . . . . . f f f f f f . . . . . 
    f f f f f f f f f f f f f f f f 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f e e 2 2 2 2 2 2 e f f . . 
    . f f e 2 f f f f f f 2 e f f . 
    . f f f f f e e e e f f f f f . 
    . . f e f b f d d f b f e f . . 
    . . f e d d f d d f d d e f . . 
    . . e f e d d d d d d e f . . . 
    . . e 4 d d e 2 2 2 2 f e f . . 
    . . . e d d e 2 2 2 2 f d e . . 
    . . . . e e f 5 5 d d f . . . . 
    . . . . . f f f f f f f . . . . 
    f f f f f f f f f f f f f f f f 
    `,
img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 6 6 f b f e f f . 
    . f e e 6 1 f d d f 1 6 e e f . 
    . . f f f f d d d d d e e f . . 
    . f d d d d f 6 6 6 e e f . . . 
    . f b b b b f 2 2 2 2 f 6 e . . 
    . f b b b b f 2 2 2 2 f d 6 . . 
    . . f c c f 6 5 5 6 6 f 6 6 . . 
    . . . f f f f f f f f . . . . . 
    f f f f f f f f f f f f f f f f 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f 2 2 2 2 2 2 f f f . . 
    . . f f 2 2 2 2 2 2 2 2 2 f . . 
    . f f 2 2 2 2 2 2 2 2 2 2 f f . 
    . f f f 2 2 2 2 2 2 2 2 f f f . 
    . . f 2 2 1 f 2 2 f 1 2 2 f . . 
    . f f 2 1 1 f d d f 1 1 2 f . . 
    f d f f 2 2 d d d d 2 2 2 f . . 
    f b f 2 f 2 2 2 2 2 2 2 2 f . . 
    f b f 4 f 2 2 2 2 2 2 2 f . . . 
    f c f . f 4 4 5 5 f f f . . . . 
    . f f . f f f f f f f . . . . . 
    f f f f f f f f f f f f f f f f 
    `
]
scene.setBackgroundColor(9)
tiles.setTilemap(tilemap`level3`)
game.showLongText("Something weird happened. I just got cloned. But don't worry, if we stack up high enough (30 of us), we'll win! But if just three of us fall, the person who cloned me will exterminate us! Good luck!", DialogLayout.Center)
baseSierra = sprites.create(sierraImgs[randint(0, sierraImgs.length - 1)], SpriteKind.StackSierra)
baseSierra.setPosition(80, 1512)
baseSierra.ay = 300
scene.cameraFollowSprite(baseSierra)
topSierra = baseSierra
createNewSierra()
info.setLife(3)
forever(function () {
    if (info.score() == 30) {
        game.showLongText("WE WON!", DialogLayout.Bottom)
        game.over(true)
    }
})
forever(function () {
    music.playMelody("C5 A B G A F G E ", 120)
})
