import quotes from './quotes.js'
import bg from './bg.js'
window.onload = function() { 
// canvas1 displayBtn resImage


select__images__skull.style.display = 'flex'

let ctx = canvas1.getContext('2d')
let randomNum = 0
let textX = 80
let textY = 20
let lineTextY = 20
let lineTextX = 20
let selectedQuote 
let shadowBlur = 0
let lineWidth = 0
let textBrightness = 'brightness(120%)'
let spaceY = 45
let textLengthCon = 18

let chapterNum
let QuoteNum
let bookChoose 

let allText = ''

let images

ctx.shadowColor="black";

let font = '45px Gabriola'

randomNum = Math.floor(Math.random() * 34059 )
selectedQuote = quotes[randomNum]

function removeClickEvent () {
    document.querySelectorAll('.remove__button').forEach(item => {
        item.addEventListener('click',(e) => {
            e.stopPropagation()
            let parent = e.target.parentNode
            let grandpa = parent.parentNode
            fetch('/delete',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({idImg: e.target.id,category:grandpa.id.split('__')[2] })
            })
        })
    })
}

function selectFont(fontText) {
    font = fontText 
}

function imagesClickEvent() {
    images = document.querySelectorAll('.selImg')
    images.forEach(img => {
        img.addEventListener('click',(e) => {
            resImage.src = e.target.src
            writeImage(selectedQuote.quote,11) 
        })
    })
}

function writeImage(mod) {
    ctx.font = font;
    if(mod === 1)  ctx.filter = "brightness(90%)"
    if(mod === 2)  ctx.filter = "brightness(110%)"
    ctx.drawImage(resImage,0,0)
    ctx.drawImage(logo,315,615,70,50)
    let dataURL = canvas1.toDataURL('image/jpeg')

    let lineText = ''
    let textLength = 0


    lineTextY = textY
    lineTextX = textX


    allText.forEach((item,index) => {
        textLength += item.length

        let newItem = ''
        item.split('').forEach(letter => {
            if(letter === 'ṇ') newItem += 'n'
            else if(letter === 'Ṛ') newItem += 'R'
            else if(letter === 'ṛ') newItem += 'r'
            else if(letter === 'ṭ') newItem += 't'
            else if(letter === 'ḍ') newItem += 'd'
            else newItem += letter
        })
        
        if(textLength > textLengthCon ) {
            lineText += `${newItem} `
            lineTextY +=  Number(font.split(' ')[0].slice(0,2)) * 1.3
            console.log(font)
            textLength = 0
            ctx.shadowBlur = shadowBlur;
            ctx.lineWidth = lineWidth;
            //  ctx.strokeText(lineText,textX,lineTextY)
            ctx.filter = textBrightness   
            ctx.shadowBlur= 0 ;
            ctx.fillStyle="white";
            ctx.fillText(lineText,textX,lineTextY)
            lineText = ''

        } else if (index === allText.length - 1) {
                lineText += `${newItem} `
                lineTextY +=  Number(font.split(' ')[0].slice(0,2)) * 1.3
                ctx.shadowBlur = shadowBlur;
                ctx.lineWidth = lineWidth;
                //  ctx.strokeText(lineText,textX,lineTextY)   
                ctx.filter = textBrightness
                ctx.shadowBlur = 0;
                ctx.fillStyle = "white";
                ctx.fillText(lineText,textX,lineTextY)
                lineText = ''
           
        }
         else {
            lineText += `${newItem}. `
        }
        
    })

    ctx.font="30px Gabriola";
    lineTextY +=  Number(font.split(' ')[0].slice(0,2)) * 2.25
    ctx.shadowBlur = shadowBlur;
    ctx.lineWidth = lineWidth;
    //  ctx.strokeText(lineText,textX,lineTextY)   
    ctx.filter = textBrightness
    ctx.shadowBlur = 0;
    ctx.fillStyle = "white";
    let quoteText = `${bookChoose} ${chapterNum +1}.${QuoteNum}`
    let quoteWidth = ctx.measureText(quoteText).width
    ctx.fillText(quoteText,((350) - quoteWidth/2),lineTextY)


    // ctx.font = '22' + font.slice(2)
    // ctx.shadowBlur = shadowBlur;
    // ctx.lineWidth = lineWidth;
    // let measureLength = ctx.measureText(selectedQuote.author)
    //  ctx.strokeText(selectedQuote.author, 300 - measureLength.width / 2 ,570)  
    // ctx.filter = textBrightness 
    // ctx.shadowBlur=0;
    // ctx.fillStyle="white";
    // ctx.fillText(selectedQuote.author,300 - measureLength.width / 2 ,580)

    ctx.font="26px Gabriola";
    ctx.fillStyle = "white";
    let reinText = `@reinkarnacia.sk`
    let textWidth = ctx.measureText(reinText)
    ctx.fillText(reinText,((350) - (textWidth.width / 2)),700 - 15 );
    
    ctx.filter = 'brightness(100%)'
    resImage.src = dataURL
}

displayBtn.addEventListener('click',() => {
    randomNum = Math.floor(Math.random() * 34059 )
    selectedQuote = quotes[randomNum]
    writeImage(0)
   
})

brightnessDown.addEventListener('click',() => {
    writeImage(1)
   
})

brightnessUp.addEventListener('click',() => {
    writeImage(2)
   
})

downbtn.addEventListener('click',() => {
    textY += 10
    writeImage(0)
   
})

upbtn.addEventListener('click',() => {
    textY -= 10
    writeImage(0)
   
})

leftbtn.addEventListener('click',() => {
    textX -= 10
    writeImage(0)
   
})

rightbtn.addEventListener('click',() => {
    textX += 10
    writeImage(0)
   
})

lengthUp.addEventListener('click',() => {
    textLengthCon += 1
    writeImage(0)
   
})

lengthDown.addEventListener('click',() => {
    textLengthCon -= 1
    writeImage(0)
   
})


showNature.addEventListener('click',() => {
    select__images__nature.style.display = 'flex'
    select__images__spirit.style.display = 'none'
    select__images__book.style.display = 'none'
    select__images__skull.style.display = 'none'
    showNature.classList.add('active')
    showSpirit.classList.remove('active')
    showBook.classList.remove('active')
    showSkull.classList.remove('active')
    fetch('/nature')
    .then(res => res.json())
    
    .then(data => {
        data.forEach((img,index) => {
            if(index === 0) select__images__nature.innerHTML = `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
            else select__images__nature.innerHTML += `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
            if(index === data.length - 1) select__images__nature.innerHTML += `<div class="selImg"><img src="./addBtn.png" id="addBtnNature" class="addBtn" alt=""></div>`
        })
        imagesClickEvent()
        removeClickEvent()
        if(data.length === 0) select__images__nature.innerHTML = `<div class="selImg"><img src="./addBtn.png" id="addBtnNature" class="addBtn" alt=""></div>`
        addBtnNature.addEventListener('click', () => {
            addDiv.style.display = 'initial'
            selectCategory.value = 'nature'
        })
    })
})

showSpirit.addEventListener('click',() => {
    select__images__nature.style.display = 'none'
    select__images__spirit.style.display = 'flex'
    select__images__book.style.display = 'none'
    select__images__skull.style.display = 'none'
    showNature.classList.remove('active')
    showSpirit.classList.add('active')
    showBook.classList.remove('active')
    showSkull.classList.remove('active')
    fetch('/spirit')
    .then(res => res.json())
    
    .then(data => {
        data.forEach((img,index) => {
            if(index === 0) select__images__spirit.innerHTML = `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
            else select__images__spirit.innerHTML += `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
            if(index === data.length - 1) select__images__spirit.innerHTML += `<div class="selImg"><img src="./addBtn.png" id="addBtnSpirit" class="addBtn" alt=""></div>`
        })
        imagesClickEvent() 
        removeClickEvent()
        if(data.length === 0) select__images__spirit.innerHTML = `<div class="selImg"><img src="./addBtn.png" id="addBtnSpirit" class="addBtn" alt=""></div>`
        addBtnSpirit.addEventListener('click', () => {
            addDiv.style.display = 'initial'
            selectCategory.value = 'spirit'
        })
    })
    
})

showBook.addEventListener('click',() => {
    select__images__nature.style.display = 'none'
    select__images__spirit.style.display = 'none'
    select__images__book.style.display = 'flex'
    select__images__skull.style.display = 'none'
    showNature.classList.remove('active')
    showSpirit.classList.remove('active')
    showBook.classList.add('active')
    showSkull.classList.remove('active')
    fetch('/book')
    .then(res => res.json())
    
    .then(data => {
        data.forEach((img,index) => {
            if(index === 0) select__images__book.innerHTML = `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
            else select__images__book.innerHTML += `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
            if(index === data.length - 1) select__images__book.innerHTML += `<div class="selImg"><img src="./addBtn.png" id="addBtnBook" class="addBtn" alt=""></div>`
        })
        imagesClickEvent()
        removeClickEvent()
        if(data.length === 0) select__images__book.innerHTML = `<div class="selImg"><img src="./addBtn.png" id="addBtnBook" class="addBtn" alt=""></div>`
        addBtnBook.addEventListener('click', () => {
            addDiv.style.display = 'initial'
            selectCategory.value = 'book'
        })
    })
})



showSkull.addEventListener('click',() => {
    select__images__nature.style.display = 'none'
    select__images__spirit.style.display = 'none'
    select__images__book.style.display = 'none'
    select__images__skull.style.display = 'flex'
    showNature.classList.remove('active')
    showSpirit.classList.remove('active')
    showBook.classList.remove('active')
    showSkull.classList.add('active')
    fetch('/skull')
    .then(res => res.json())
    
    .then(data => {
        data.forEach((img,index) => {
            if(index === 0) select__images__skull.innerHTML = `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
            else select__images__skull.innerHTML += `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
            if(index === data.length - 1) select__images__skull.innerHTML += `<div class="selImg"><img src="./addBtn.png" id="addBtnSkull" class="addBtn" alt=""></div>`
        })
        imagesClickEvent()
        removeClickEvent()
        if(data.length === 0) select__images__skull.innerHTML = `<div class="selImg"><img src="./addBtn.png" id="addBtnSkull" class="addBtn" alt=""></div>`
        addBtnSkull.addEventListener('click', () => {
            addDiv.style.display = 'initial'
            selectCategory.value = 'skull'
        })
    })
})
showSkull.click()

downloadBtn.addEventListener('click',() => {
    if(window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas1.msToBlob(),'jebo')
    } else {
        const a = document.createElement('a')
        
        document.body.appendChild(a)
        a.href = canvas1.toDataURL()
        a.download = "quote"
        a.click()
        document.body.removeChild(a)
    }
})

fontsSelect.addEventListener('input', (e) => {
    selectFont(e.target.value)
    writeImage(10)
})

closeAddDiv.addEventListener('click',() => {
    addDiv.style.display = 'none'
})


chooseQuoteBtn.addEventListener('click',() => {
    chooseQuoteDiv.style.display = 'initial'
})


let booksSelectors = document.querySelectorAll('.book__choose')
booksSelectors.forEach(book => {
    book.addEventListener('click',(e) => {
        let book = e.target.dataset.book
        
        if(book === 'bg') {
            bg__chapters.style.display = 'flex'
            bg__quotes.style.display = 'none'
            bg__chapters.innerHTML = ``
            bg.forEach((chapter,index) => {
                bg__chapters.innerHTML += `<h1 class="chapter__select bg__chapter__select">Chapter ${index+1}</h1>`
            })
            let bgSelectors = document.querySelectorAll('.bg__chapter__select')
            bgSelectors.forEach((chapter,index) => {
                chapter.addEventListener('click',(e) => {
                    console.log('choosin chapter')
                    bg__quotes.innerHTML = ``
                    bg__chapters.style.display = 'none'
                    bg__quotes.style.display = 'flex'
                    chapterNum = e.target.textContent.split(' ')[1] -1
                    bookChoose = 'bhagavad-gíta'
                    let quotes = bg[chapterNum]
                    quotes.forEach((quote,index) => {
                        bg__quotes.innerHTML += `<div class="quote">${quote.text} <span class="verse"> VERS.${index+1}</span></div>`
                    })
                    let allQuotes = document.querySelectorAll('.quote')
                    allQuotes.forEach(quote => {
                        quote.addEventListener('click',(e) => {
                            chooseQuoteDiv.style.display = 'none'
                            allText = e.target.textContent
                            QuoteNum = allText.split('.')
                            QuoteNum = QuoteNum[QuoteNum.length - 1]

                            allText = allText.slice(0,allText.indexOf('VERS'))
                            allText = allText.split(' ') 
                            writeImage(0)
                        })
                    })
                })
            })
        }
        
        
        
        
        
        
        
        
        
        if(book === 'sb') {
        }
        if(book === 'cc') {
        }
    })
})
















}