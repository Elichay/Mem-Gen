'use strict'
let gCurrView = 'gallery'  //gallery, saved or editor
let gElCanvas
let gCtx




function onInit() {

    gElCanvas = document.getElementById('mame-canvas')
    gCtx = gElCanvas.getContext('2d')
    getSavedMemes()
    clearSearchVar()
    renderGallery()
    addListeners()
}

function onToggleMenu() {
    document.body.classList.toggle('menu');
}

function onToggleAbout() {
    document.body.classList.toggle('about');
    closeManu()
}

function addListeners() {

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderImgMem()
    })
}

function renderGallery() {
    let showImgs = getImgs()
    let showSavedImgs = getSavedImgs()
    let savedStrHmls = ''
    let strHtmls =
        '<div class="file-input-container gallery-img"><h2>Upload your image!</h2><input type="file" class="file-input gallery-img" name="image" onchange="onImgInput(event)"/></div>'
    strHtmls += showImgs.map(img => `<img src="${img.url}"  class="gallery-img" data-id="${img.id}" onclick="onGetImg(${img.id},false)" />`
    ).join('')
    if (showSavedImgs.length > 0) {
        savedStrHmls += showSavedImgs.map(savedImg => `<img src="${savedImg.url}" class="gallery-img" data-id="'${savedImg.id}'" onclick="onGetImg('${savedImg.id}',true)" />`
        ).join('')
    }
    document.querySelector('.grid-imgs').innerHTML = strHtmls + savedStrHmls
}


function onGetImg(id,isSaved) {
    showEditor()
    drawImg(id,isSaved)
}


function onFilterImgs(elSearch) {
    console.log('elSearch', elSearch)
    // ev.preventDefault()
    const searchWord = document.querySelector('.search-nav-input').value
    console.log('searchWord', searchWord)
    // document.querySelector('.search-nav-input').value = ''
    updateSearchWord(searchWord)
    renderGallery()
}


function onClickSearchWord(searchWord) {
    updateSearchWord(searchWord)
    renderGallery()
}


function onSearchMore() {
    document.body.classList.toggle('more')
}

function showEditor() {
    const elGallery = document.querySelector('.gallery')
    const elEditor = document.querySelector('.meme-editor')
    elGallery.classList.add('hide')
    elEditor.classList.remove('hide')
    gCurrView = 'editor'
}

function onGallery() {
    if (gCurrView === 'gallery') return
    document.querySelector('.font-selector').selectedIndex = 0
    clearTextInput()
    const elGallery = document.querySelector('.gallery')
    const elEditor = document.querySelector('.meme-editor')
    const elSaved = document.querySelector('.saved-mems')
    elGallery.classList.remove('hide')

    if (gCurrView === 'editor') elEditor.classList.add('hide')
    else (elSaved.classList.add('hide'))

    clearSearchVar()
    renderGallery()
    gCurrView = 'gallery'
    closeManu()
}



function onImgInput(ev) {
    loadImageFromInput(ev, onAddImgToGallery)
    setTimeout(renderGallery, 100)
}

function askForKeys() {
    return prompt('please enter keys seperated with , :')
}


///SAVED MEMES

function onViewSaved() {
    if (gCurrView === 'saved') return
    if (gCurrView === 'editor') {
        document.querySelector('.font-selector').selectedIndex = 0
        clearTextInput()
        const elEditor = document.querySelector('.meme-editor')
        elEditor.classList.add('hide')
    } else {
        const elGallery = document.querySelector('.gallery')
        elGallery.classList.add('hide')
    }
    const elSaved = document.querySelector('.saved-mems')
    elSaved.classList.remove('hide')

    let savedImgs = getSavedMemes()
    renderSavedImgs(savedImgs)
    gCurrView = 'saved'
    closeManu()
}



function renderSavedImgs(savedImgs) {
    let strHtmls = ''
    strHtmls += savedImgs.map(meme => `<div class="export-img flex wrap">
    <img src="${meme.img}"  class="gallery-img" data-id="${meme.id}"/>
    <div class="export-img-btn flex space-between">
    <button class="editor-btn export-btn fa-solid download" onclick="onSavedDownload('${meme.img}')" data-title="download"></button>
    <button class="editor-btn export-btn fa trash" onclick="onSavedDelete('${meme.id}')" data-title="Delete"></button>
    </div></div>`
    ).join('')
    document.querySelector('.saved-imgs').innerHTML = strHtmls
}


function onSavedDownload(imgData) {
      downloadURL(imgData,'my-mem')
}

function downloadURL(url, filename) { //talks with DOM
    var link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()
}


function onSavedDelete(id) {
    let savedImgs = getSavedMemes()
    savedImgs.splice(id, 1)
    sendToStorage(savedImgs)
    renderSavedImgs(savedImgs)
}


function closeManu() {
    const ElBody = document.querySelector('body')
    if (ElBody.classList.contains('menu')) onToggleMenu()
}


