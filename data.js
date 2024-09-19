// noinspection DuplicatedCode

import {TileSet} from "../lib/tile_set.js"
import {tileMap, tileMaps, tileSet} from "../lib/project.js"
import {ImageArray} from "../lib/image_array.js"
import {TileMap} from "../lib/tile_map.js"
import {texture} from "../lib/system.js"
import {bricks} from "./main.js"

export function loadData() {
    tileSet.bricks = new TileSet(new ImageArray(texture["bricks"], 32, 14))

    tileMap.brackets = new TileMap(tileSet.bricks, 40, 22, 0, 0, 1, 1, [
        4,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   6,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,   0,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   6,  18,  18,   4,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   2,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  19,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  19,  11,  22,  22,  11,  19,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  19,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  11,  18,  18,  11,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  19,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  19,  11,  22,  22,  11,  19,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  19,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  11,  16,  17,  11,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  19,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  19,  11,  18,  18,  11,  19,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  19,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  11,  22,  22,  11,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  19,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  19,  11,  18,  18,  11,  19,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  19,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,   0,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,  14,  22,  22,  12,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   2,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  16,  17,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        11,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  11,
        15,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  15,
    ])

    tileMaps.add(tileMap.brackets)
}