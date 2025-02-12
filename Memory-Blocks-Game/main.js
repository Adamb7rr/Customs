// splach screen
document.querySelector('.control-buttons span').onclick = () => {
    // prompt to enter your name
    let yourName = prompt("Enter Your Name?")

    // display your name in game page
    if (yourName === '' || yourName === null) {
        document.querySelector('.name span').innerHTML = `Unknown`
    } else {
        document.querySelector('.name span').innerHTML = `${yourName}`
    }

    // remove splach screen from page
    document.querySelector('.control-buttons').remove()
}

let duration = 1000

let blocksContainer = document.querySelector('.memory-game-blocks')

let win = document.querySelector('.win')

let lose = document.querySelector('.lose')

let blocks = Array.from(blocksContainer.children)

let orderRange = Array.from(Array(blocks.length).keys())

console.log(orderRange)
shuffle(orderRange)
console.log(orderRange)

blocks.forEach((block, index) => {
    block.style.order = orderRange[index]

    block.addEventListener('click', () => {
        flipBlock(block)
    })
})

function checkMatchedBlocks (fBlock, sBlock) {
    let triesElement = document.querySelector('.tries span')



    if (fBlock.dataset.player === sBlock.dataset.player) {

        win.play()

        fBlock.classList.remove('is-flipped')
        sBlock.classList.remove('is-flipped')

        fBlock.classList.add('has-match')
        sBlock.classList.add('has-match')

    } else {

        lose.play()

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1

        setTimeout(() => {
            fBlock.classList.remove('is-flipped')
            sBlock.classList.remove('is-flipped')
        }, duration);

    }
}


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

function flipBlock (selectedBlock) {
    selectedBlock.classList.add('is-flipped')

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'))

    if (allFlippedBlocks.length === 2) {
        console.log('two Flipped')

        stopClicking()

        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
    }
}

function stopClicking () {
    blocksContainer.classList.add('no-clicking')

    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking')
    }, duration)
}