'use strict'
var gMeme
var gLineId = 0

function setGMeme(id) {
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: 0,  //in order to add more lines
        lines: [
            {
                id: gLineId++,
                txt: 'Insert your text',
                fontSize: 40,
                align: 'center',
                fillColor: 'white',
                strokeColor: 'black',
                font: 'impact',
                isSelected: true,  //for mark line
                pos: {
                    x: gElCanvas.width / 2,
                    y: 80,
                },
                isDrag: false  //for moving item later (see canvas lesson sample 5)
            }
        ],
    }
}

function getGMem() {
    return gMeme
}


function saveMemeToStorage(img) {
    const id = makeId()
    gSavedMemes.push({id, img})
    saveToStorage(DB_KEY, gSavedMemes)
}


