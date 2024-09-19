export let bonusSettings = {
    image: {
        texture: "bonus"
    },

    images: {
        texture: "bonuses",
        columns: 4,
        rows: 3,
    },

    speed: 5,
    probability: 0.5,
    width: 29 / 16,
    height: 13 / 16,
    typeWidthK: 0.6,
    typeHeightK: 0.6,

    appearanceEffect: "enlarge",

    disappearanceEffect: "shrink",

    type: {
        enlarge: {
            class: "resize",
            imageNumber: 0,
            amount: 1,
            max: 10,
        },

        shrink: {
            class: "resize",
            imageNumber: 1,
            amount: -1,
            min: 3,
        },

        ball: {
            class: "ball",
            imageNumber: 2,
            amount: 1,
        },

        split: {
            class: "split",
            imageNumber: 3,
            startingAngle: -30,
            dAngle: 30,
            amount: 3,
        },

        magnet: {
            class: "magnet",
            imageNumber: 4,
            time: 25,
        },

        score: {
            class: "score",
            imageNumber: 5,
            amount: 1000,
        },

        gun: {
            class: "gun",
            imageNumber: 7,
            ammo: 20,
        },

        ammo: {
            class: "ammo",
            imageNumber: 8,
            ammo: 20,
        },

        /*split2: {
            class: "split",
            imageNumber: 3,
            angle: -30,
            dAngle: 60,
            amount: 2,
        },*/
    },

    packs: {
        default: {
            nothing: 1000,
            enlarge: 100,
            shrink: 100,
            ball: 5,
            split: 25,
            magnet: 25,
            score: 200,
            gun: 10,
        }
    }
}