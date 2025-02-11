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

let orderRange = [...Array(blocks.length).keys()]

console.log(orderRange)