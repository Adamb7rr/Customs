

document.querySelector('.control-buttons span').onclick = () => {
    let yourName = prompt("Enter Your Name?")
    console.log(yourName)
    if (yourName === '') {
        document.querySelector('.name span').innerHTML = `Unknown`
    } else {
        document.querySelector('.name span').innerHTML = `${yourName}`
    }

    document.querySelector('.control-buttons').remove()
}