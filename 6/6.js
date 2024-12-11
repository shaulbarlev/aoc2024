const input = fs.readFile('6/example.txt', 'utf-8', (err, input) => {
    let map = input.split(/\n/)
    map = map.map(line => line.split(''))
    // console.log(map)
    let i = 0
    let atEdge = false
    const next = (mapInput) => {
        //determine guard position
        let x
        let y
        let direction
        for (const line in mapInput) {
            index = mapInput[line].findIndex(char => char == 'V' || char == '^' || char == '<' || char == '>')
            if (index != -1) {
                x = index
                y = Number(line)
                direction = mapInput[line][index]
            }
        }
        
        let newDirection
        const getFrontPos = (xIn, yIn, directionIn) => {
            switch (directionIn) {
                case '^':
                    newDirection = '>'
                    return [xIn, yIn - 1]
                case '>':
                    newDirection = 'V'
                    return [xIn + 1, yIn]
                case 'V':
                    newDirection = '<'
                    return [xIn, yIn + 1]
                case '<':
                    newDirection = '^'
                    return [xIn - 1, yIn]
            }
        }
        
        let frontX = getFrontPos(x, y, direction)[0]
        let frontY = getFrontPos(x, y, direction)[1]
        
        // console.log(frontY)
        // console.log(frontX)
        
        const advance = (directionInput) => {
            map[y][x] = 'X'
            map[frontY][frontX] = direction
        }
        console.log(map[frontY][frontX])
        //determine if in front of guard there's an obstacle
        if (map[frontY][frontX] == '#') {
            //rotate!
            map[y][x] = newDirection
        }
        else { //free to continue
            advance(direction)
            frontX = getFrontPos(x, y, direction)[0]
            frontY = getFrontPos(x, y, direction)[1]
            if (frontY > map.length-2) atEdge = true
        }
        return map
    }

    while (!atEdge) {
        next(map)
        i++
        if (i > 300) break
    }

    console.log(
        map,i
    )

})