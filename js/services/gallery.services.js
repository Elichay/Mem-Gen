'use strict'

var gCurrSearch = ''
var gSavedMemes = []
const DB_KEY = 'memesDB'
const IMG_DB_KEY = 'imgsDB'
let gStoredImg = []
let gCurrImg

var galleryImgs = [
    { id: 1, url: 'img/non-ratio/1.jpg', keywords: ['politics', 'angry', 'trump', 'president', 'man'] },
    { id: 2, url: 'img/non-ratio/2.jpg', keywords: ['animals', 'cute', 'dog'] },
    { id: 3, url: 'img/non-ratio/3.jpg', keywords: ['animals', 'cute', 'dog', 'baby', 'sleep'] },
    { id: 4, url: 'img/non-ratio/4.jpg', keywords: ['animals', 'cute', 'cat', 'sleep', 'keyboard'] },
    { id: 5, url: 'img/non-ratio/5.jpg', keywords: ['angry', 'cute', 'kid', 'baby', 'beach'] },
    { id: 6, url: 'img/non-ratio/6.jpg', keywords: ['wired', 'teacher', 'hair', 'history', 'man'] },
    { id: 7, url: 'img/non-ratio/7.jpg', keywords: ['kid', 'cute', 'surprise', 'baby'] },
    { id: 8, url: 'img/non-ratio/8.jpg', keywords: ['movie', 'willi', 'money', 'wonka', 'tie', 'man'] },
    { id: 9, url: 'img/non-ratio/9.jpg', keywords: ['kid', 'cute', 'evil', 'baby', 'laugh'] },
    { id: 10, url: 'img/non-ratio/10.jpg', keywords: ['politics', 'obama', 'president', 'funny', 'smile', 'man'] },
    { id: 11, url: 'img/non-ratio/11.jpg', keywords: ['sport', 'kiss', 'pride', 'gay', 'man'] },
    { id: 12, url: 'img/non-ratio/12.jpg', keywords: ['israel', 'tv', 'rightuse', 'man'] },
    { id: 13, url: 'img/non-ratio/13.jpg', keywords: ['movie', 'glass', 'money', 'cheers', 'smile', 'man'] },
    { id: 14, url: 'img/non-ratio/14.jpg', keywords: ['movie', 'glasses', 'seriouse', 'man'] },
    { id: 15, url: 'img/non-ratio/15.jpg', keywords: ['movie', 'teacher', 'man'] },
    { id: 16, url: 'img/non-ratio/16.jpg', keywords: ['movie', 'tv', 'startrek', 'picard', 'smile', 'man'] },
    { id: 17, url: 'img/non-ratio/17.jpg', keywords: ['politics', 'putin', 'teacher', 'seriouse', 'man'] },
    { id: 18, url: 'img/non-ratio/18.jpg', keywords: ['movie', 'animation', 'space', 'pixar'] },
    { id: 19, url: 'img/non-ratio/19.jpg', keywords: ['movie', 'evil', 'funny', 'man'] },
    { id: 20, url: 'img/non-ratio/20.jpg', keywords: ['what', 'question', 'funny', 'man'] },
    { id: 21, url: 'img/non-ratio/21.jpg', keywords: ['kid', 'baby', 'funny', 'dance', 'happy'] },
    { id: 22, url: 'img/non-ratio/22.jpg', keywords: ['movie', 'dance', 'happy', 'woman'] },
    { id: 23, url: 'img/non-ratio/23.jpg', keywords: ['politics', 'angry', 'trump', 'president', 'man'] },
    { id: 24, url: 'img/non-ratio/24.jpg', keywords: ['animals', 'dog', 'cute', 'strach'] },
    { id: 25, url: 'img/non-ratio/25.jpg', keywords: ['celeb', 'tv', 'oprah', 'woman'] },
]

function clearSearchVar() {
    gCurrSearch = ''
    document.querySelector('.search-nav-input').value = ''
}

function updateSearchWord(searchWord) {
    if (searchWord === 'all' || searchWord === 'All') searchWord = ''
    gCurrSearch = searchWord
    // increaseWordRate(searchWord)
}

function getImgs() {
    if (!gCurrSearch) return galleryImgs
    return galleryImgs.filter((img) => img.keywords.includes(gCurrSearch))
    // return gImgs
}

function getSavedMemes() {  //gallery services
    gSavedMemes = loadFromStorage(DB_KEY)
    if (!gSavedMemes) gSavedMemes = []
    return gSavedMemes
}

function sendToStorage(savedImgs) {
    saveToStorage(DB_KEY, savedImgs)
}


function loadImageFromInput(ev, onImageReady) {  //1:1 from canvas onclass 4
    const reader = new FileReader()
    reader.onload = (event) => {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function onAddImgToGallery(img) {
    gCurrImg = img.src
    const userKeyWords = askForKeys()
    addSavedImg(gCurrImg, userKeyWords)
}

function addSavedImg(img, keywords = []) {
    gStoredImg = getSavedImgs()
    const uploadedImg = {
        id: makeId(),
        url: img,
        keywords
    }
    gStoredImg.push(uploadedImg)
    saveToStorage(IMG_DB_KEY, gStoredImg)
}

function getSavedImgs() {
    const storedImg = loadFromStorage(IMG_DB_KEY)
    if (storedImg === null) return []
    return storedImg
}