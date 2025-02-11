// splach screen
document.querySelector('.control-buttons span').onclick = () => {
    // prompt to enter your name
    let yourName = prompt("Enter Your Name?")

    // display your name in game page
    if (yourName === '') {
        document.querySelector('.name span').innerHTML = `Unknown`
    } else {
        document.querySelector('.name span').innerHTML = `${yourName}`
    }

    // remove splach screen from page
    document.querySelector('.control-buttons').remove()
}

let duration = 1000

let blocksContainer = document.querySelector('.memory-game-blocks')

let blocks = Array.from(blocksContainer.children)

let orderRange = Array.from(Array(blocks.length).keys())

console.log(orderRange)
shuffle(orderRange)
console.log(orderRange)

blocks.forEach((block, index) => {
    block.style.order = orderRange[index]
})

function shuffle (array) {
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        random = Math.floor(Math.random() * current)

        current--

        temp = array[current]

        array[current] = array[random]

        array[random] = temp
    }

    return array
}