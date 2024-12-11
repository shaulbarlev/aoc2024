const input = fs.readFile('5/example.txt', 'utf-8', (err, input) => {
    let [rules, updates] = [input.split(/\n\n/)[0], input.split(/\n\n/)[1]]
    rules = rules.split(/\n/)
    rules = rules.map(rule => rule.split('|'))
    // console.log(rules)

    updates = updates.split(/\n/)
    updates = updates.map(update => update.split(','))
    console.log(rules[0])

    const reorder = (update) => {
        // iterating over all the rules.
        for (const rule in rules) {
            let indexOfFirstValue = update.indexOf(rules[rule][0])
            let indexOfSecondValue = update.indexOf(rules[rule][1])
            // checking if the update contains both numbers in the current rule.
            if (indexOfFirstValue != -1 && indexOfSecondValue != -1) {
                // check if update is out of order.
                if (indexOfSecondValue < indexOfFirstValue) {
                    let firstValue = update[indexOfFirstValue]
                    update.splice(indexOfFirstValue, 1) //remove out of order item.
                    update.splice(indexOfSecondValue, 0, firstValue) //insert first before second.
                    return update
                }
            }
        }
        return true
    }

    console.log(
        reorder(updates[3])
    )

    const sumMiddle = () => {
        return updates.reduce((sum, update) => {
            if (checkOrder(update)) {
                sum += Number(update[(update.length - 1) / 2])
            }
            return sum
        }, 0)

    }
    // console.log(sumMiddle())

})