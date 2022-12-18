'use strict'


function setLineTxt(text) { 
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    // console.log('gMeme', gMeme)
}
function getLineText(){
    return gMeme.lines[gMeme.selectedLineIdx].txt 
}



function createTextLine(line) {
    // console.log(line.font)

    // console.log('line', line)
    // console.log('gCtx', gCtx)
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = line.align
    gCtx.fillStyle = line.fillColor  //why its not getting color on first time?
    gCtx.strokeStyle = line.strokeColor
    // gCtx.lineWidth = 1   --check
    // console.log(line.id, 'line.fontSize', line.fontSize) //if is selected change size?
    gCtx.font = `${line.fontSize}px ${line.font}`
    // console.log('gCtx', gCtx)
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
}


function changeColor(isOutline, color) {
    if (isOutline) gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
    else gMeme.lines[gMeme.selectedLineIdx].fillColor = color
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += diff
}

function alignText(direction) {
    gMeme.lines[gMeme.selectedLineIdx].align = direction
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function addTextLine() {
    resetIsSelected()
    //unsetSelcted() //for each unselect
    const linesAmnt = gMeme.lines.length //before adding new line
    // console.log('linesAmnt', linesAmnt)
    const posY = (linesAmnt === 1) ? gElCanvas.height - 80 : gElCanvas.height / 2
    const font = getFontValue()
    const line = {
        id: gLineId++,
        txt: 'Insert your text',
        fontSize: 40,
        align: 'center',
        fillColor: 'white',
        strokeColor: 'black',
        font: font,
        isSelected: true,  //for mark line
        pos: {
            x: gElCanvas.width / 2,
            y: posY,
        },
        isDrag: false  //for moving item later (see canvas lesson sample 5)
    }

    gMeme.lines.push(line)
    gMeme.selectedLineIdx = linesAmnt //its length -1
    setTxtInput(gMeme.lines[gMeme.selectedLineIdx].txt)
    
    // highlightText(gMeme.lines[gMeme.selectedLineIdx]) //also use for switch 
    // console.log('gMeme', gMeme)
}


function switchLine(){
    if (!gMeme.lines.length) return
    resetIsSelected()
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
        return  //if last one is chosen, go back to first.
    } //Add switch to sticker
    gMeme.selectedLineIdx++
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    // highlightText(gMeme.lines[gMeme.selectedLineIdx])
}

function deleteLine() {
    const id = gMeme.selectedImgId
    if (!gMeme.lines.length) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if (!gMeme.lines.length) setGMeme(id)
    gMeme.selectedLineIdx--
    switchLine()
}

function resetIsSelected(){
    const textLines = gMeme.lines
    textLines.forEach(line => line.isSelected = false)
    // console.log('gMeme', gMeme)
}

function removeHighlight(){
    gMeme.selectedLineIdx = -1
}