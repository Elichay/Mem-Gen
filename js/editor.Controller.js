'use strict'
let gCurrRatio = 1
let gIsSaved = false

function drawImg(id, isSaved) {
    setGMeme(id)
    const elImg = new Image() // Creates new html img element
    if (!isSaved) {
        elImg.src = `./img/non-ratio/${id}.jpg`
        gIsSaved = flase
    }
    else {
        const savedMeme = getSavedImgs()
        savedMeme.forEach(savedImg => {
            if (savedImg.id === id) elImg.src = savedImg.url
            gIsSaved = true
        })
    }
    elImg.onload = () => {
        gCurrRatio = elImg.height / elImg.width
        resizeCanvas(elImg)  //to check if need to change size of canvas
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function onTextInput(txt) {
    setLineTxt(txt)  //in servicees
    renderImgMem()// to see changes right away
}

function clearTextInput() {
    const elInput = document.querySelector('.text-input')
    elInput.value = ''
}

function setTxtInput(txt) {
    const elInput = document.querySelector('.text-input')
    elInput.value = txt
    elInput.focus()
    elInput.select()
}

function renderImgMem() {
    let elImg = new Image()
    const mem = getGMem()  //mem=gMeme
    if (!mem) return
    const id = mem.selectedImgId

    if (!gIsSaved) elImg.src = `./img/non-ratio/${id}.jpg`
    else {
        const savedMeme = getSavedImgs()
        savedMeme.forEach(savedImg => {
            if (savedImg.id === id) elImg.src = savedImg.url
        })
    }
    elImg.onload = () => {
        gCurrRatio = elImg.height / elImg.width
        resizeCanvas()
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        mem.lines.forEach(line => createTextLine(line)) //adding the text
        highlightText(mem.lines[mem.selectedLineIdx])
    }
}

function resizeCanvas() {
    const elCanvasBackground = document.querySelector('.canvas-background')
    const elContainer = document.querySelector('.canvas-container')
    const canvasSize = elContainer.offsetWidth * gCurrRatio
    elCanvasBackground.style.height = canvasSize + 'px'
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = canvasSize

}

function highlightText(line) {
    const memIdx = getGMem().selectedLineIdx
    if (memIdx < 0) return
    if (!line) return
    gCtx.beginPath()
    const lineWidth = gCtx.measureText(line.txt).width + line.fontSize
    const lineHeight = line.fontSize + 25
    gCtx.strokeStyle = 'yellow'
    gCtx.strokeRect(  //draw square of frame
        line.pos.x - (lineWidth / 2) - 5,
        line.pos.y - (lineHeight / 2),
        lineWidth + 10,
        lineHeight
    )

}


function onSave() {
    removeHighlight()
    renderImgMem()
    const meme = gElCanvas.toDataURL('image/jpeg')
    saveMemeToStorage(meme)

}


function onDownload(elLink) {
    removeHighlight()
    renderImgMem()
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent

}


function onMoveY(diff) {
    let mem = getGMem()
    if (mem.lines[mem.selectedLineIdx].pos.y < 40) {
        mem.lines[mem.selectedLineIdx].pos.y = 41
    } else if (mem.lines[mem.selectedLineIdx].pos.y >= 500) {  //depands on screen size. check later
        mem.lines[mem.selectedLineIdx].pos.y = 480
    }
    mem.lines[mem.selectedLineIdx].pos.y += diff
    renderImgMem()
}


function onSetColor(isOutline) {
    var input
    if (isOutline) input = document.querySelector('.color-outline')
    else input = document.querySelector('.color-fill')
    input.focus()
    input.click()
    input.addEventListener('input', () => changeColor(isOutline, input.value))
    renderImgMem()
}

function onSetFontSize(diff) {
    changeFontSize(diff)
    renderImgMem()
}

function onAlign(direction) {
    alignText(direction)
    renderImgMem()
}

function onSetFont(font) {
    changeFont(font)
    renderImgMem()
    changeFont(font)
    renderImgMem()
}

function onAddLine() {
    addTextLine()
    renderImgMem()
}

function getFontValue() {
    return document.querySelector('.font-selector').value
}

function onSwitchLine() {

    switchLine()

    const txt = getLineText()
    if (txt) setTxtInput(txt)
    renderImgMem()
}

function onDeleteLine() {
    deleteLine()
    const txt = getLineText()
    if (txt) setTxtInput(txt)
    else clearTextInput()
    renderImgMem()
}

