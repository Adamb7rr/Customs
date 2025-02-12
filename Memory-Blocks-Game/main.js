// splach screen
document.querySelector('.control-buttons span').onclick = () => {
    let namePopup = document.getElementById('name-popup');
    namePopup.style.display = 'block';

    // Close the pop-up when the user clicks on the close button
    document.getElementById('close-name-popup').onclick = function() {
        namePopup.style.display = 'none';
    };

    // Close the pop-up when the user clicks anywhere outside of the pop-up
    window.onclick = function(event) {
        if (event.target == namePopup) {
            namePopup.style.display = 'none';
        }
    };

    // Save the new name and start the game
    document.getElementById('save-name').onclick = function() {
        let newName = document.getElementById('new-name').value;
        if (newName === '' || newName === null) {
            document.querySelector('.name span').innerHTML = `Unknown`;
        } else {
            document.querySelector('.name span').innerHTML = `${newName}`;
        }
        namePopup.style.display = 'none';

        // Remove splash screen

    };
    document.querySelector('.control-buttons').remove();
};

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
    let triesBoard = document.querySelector('.tries-board span')

    if (fBlock.dataset.player === sBlock.dataset.player) {

        win.play()

        fBlock.classList.remove('is-flipped')
        sBlock.classList.remove('is-flipped')

        fBlock.classList.add('has-match')
        sBlock.classList.add('has-match')

        let newArr = [];
        blocks.forEach((block) => {
            if (block.classList.contains('has-match')) {
                newArr.push(block);
                if (newArr.length == blocks.length) {
                    console.log('Win!');
                    gameFinish(); // Call gameFinish here
                }
            }

        })

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

function saveScore (name, tries) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({name, tries});
    leaderboard.sort((a, b) => a.tries - b.tries);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function updateLeaderboard () {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    let leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; // Clear the existing list items
    leaderboard.forEach((entry, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${entry.name}: ${entry.tries} tries`;
        leaderboardList.appendChild(listItem);
    });
}

function gameFinish () {
    let name = document.querySelector('.name span').innerHTML;
    let tries = parseInt(document.querySelector('.tries span').innerHTML);
    saveScore(name, tries);
    updateLeaderboard();

    // Show the winning message in the pop-up
    let winMessage = `Congratulations ${name}! You won the game with ${tries} tries.`;
    document.getElementById('win-message').innerText = winMessage;

    // Display the pop-up
    let popup = document.getElementById('win-popup');
    popup.style.display = 'block';

    // Close the pop-up when the user clicks on the close button
    document.getElementById('close-popup').onclick = function() {
        popup.style.display = 'none';
    };

    // Close the pop-up when the user clicks anywhere outside of the pop-up
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    };
}

let resetBut = document.querySelector('.leaderboard button');

resetBut.addEventListener(('click'), () => {
    reset()
})
function reset () {
    localStorage.removeItem('leaderboard');
    updateLeaderboard();
}
function startNewGame () {
    // Display the name change pop-up
    let namePopup = document.getElementById('name-popup');
    namePopup.style.display = 'block';

    // Close the pop-up when the user clicks on the close button
    document.getElementById('close-name-popup').onclick = function() {
        namePopup.style.display = 'none';
    };

    // Close the pop-up when the user clicks anywhere outside of the pop-up
    window.onclick = function(event) {
        if (event.target == namePopup) {
            namePopup.style.display = 'none';
        }
    };

    // Save the new name and start a new game
    document.getElementById('save-name').onclick = function() {
        let newName = document.getElementById('new-name').value;
        if (newName === '' || newName === null) {
            document.querySelector('.name span').innerHTML = `Unknown`;
        } else {
            document.querySelector('.name span').innerHTML = `${newName}`;
        }
        namePopup.style.display = 'none';

        // Reset tries
        document.querySelector('.tries span').innerHTML = '0';

        // Reset blocks
        blocks.forEach(block => {
            block.classList.remove('is-flipped', 'has-match');
            block.style.order = '';
        });

        // Shuffle blocks
        shuffle(orderRange);
        blocks.forEach((block, index) => {
            block.style.order = orderRange[index];
        });

        // Remove no-clicking class if present
        blocksContainer.classList.remove('no-clicking');
    };
}

document.getElementById('refresh-page').addEventListener('click', startNewGame);
