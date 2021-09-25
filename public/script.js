import quotes from './quotes.js'
import bg from './bg.js'
import sb from './sb.js' 
window.onload = function() { 
// canvas1 displayBtn resImage


select__images__skull.style.display = 'flex'

let ctx = canvas1.getContext('2d')
ctx.imageSmoothingEnabled = false; 

let randomNum = 0
let textX = 120
let textY = 120
let lineTextY = 20
let lineTextX = 20
let selectedQuote 
let shadowBlur = 0
let lineWidth = 0
let textBrightness = 'brightness(120%)'
let quoteY = 600
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
    ctx.font = fontText 
}

function selectStyles(textLength) {
    console.log(textLength)
    console.log('select styles func')

     // DEFAULT 0 - 100
     selectFont("60px Gabriola");


     // 101 - 200
     if(textLength > 100 && textLength <= 150 ) {

         selectFont("54px Gabriola");
         textY = 100
         textLengthCon = 18
     }

     // 151 - 200
     if(textLength > 150 && textLength <= 200 ) {

         selectFont("51px Gabriola");
         textY = 70
         textLengthCon = 20
     }

     // 201 - 250
     if(textLength > 200 && textLength <= 250 ) {

         selectFont("45px Gabriola");
         textY = 85
         textLengthCon = 25
     }

     // 251 - 300
     if(textLength > 250 && textLength <= 300 ) {

         selectFont("42px Gabriola");
         textY = 65
         textLengthCon = 27
     }

     // 301 - 351
     if(textLength > 300 && textLength <= 350 ) {

         selectFont("39px Gabriola");
         textY = 55
         textLengthCon = 30
     }

     // 351 - 400
     if(textLength > 351 && textLength <= 400 ) {

        selectFont("36px Gabriola");
        textY = 55
        textLengthCon = 32
    }

     // 401 - 450
     if(textLength > 400 && textLength <= 450 ) {

         selectFont("33px Gabriola");
         textY = 50
         textLengthCon = 36
     }

     // 451 - 500
     if(textLength > 450 && textLength <= 500 ) {

        selectFont("30px Gabriola");
        textY = 50
        textLengthCon = 40
    }

     // 501 - 600
     if(textLength > 500 && textLength <= 600 ) {

         selectFont("21px Gabriola");
         textY = 110
         textLengthCon = 50
     }


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
    test.textContent = ctx.imageSmoothingEnabled
    let font = ctx.font
    console.log(font)
    if(mod === 1)  ctx.filter = "brightness(90%)"
    if(mod === 2)  ctx.filter = "brightness(110%)"
    ctx.drawImage(resImage,0,0)

    let logo = new Image()
    logo.src = './logo.svg'
    ctx.drawImage(logo,315,615,70,50)
    let dataURL = canvas1.toDataURL('image/jpeg')

    let lineText = ''
    let textLength = 0


    lineTextY = textY
    lineTextX = textX


    allText.forEach((item,index) => {
        textLength += item.length
        let textWidth

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
            lineTextY +=  Number(ctx.font.split(' ')[0].slice(0,2)) * 1.35
            textLength = 0
            ctx.shadowBlur = shadowBlur;
            ctx.lineWidth = lineWidth;
            ctx.shadowBlur=8;
            ctx.lineWidth=3;
            textWidth = ctx.measureText(lineText).width
            ctx.strokeText(lineText,((350) - textWidth / 2),lineTextY)
            ctx.filter = textBrightness   
            ctx.shadowBlur= 0 ;
            ctx.fillStyle="white";
            ctx.fillText(lineText,((350) - textWidth / 2),lineTextY)
            lineText = ''

        } else if (index === allText.length - 1) {
                lineText += `${newItem} `
                lineTextY +=  Number(ctx.font.split(' ')[0].slice(0,2)) * 1.35
                ctx.shadowBlur = shadowBlur;
                ctx.lineWidth = lineWidth;
                ctx.shadowBlur=8;
                ctx.lineWidth=3;
                textWidth = ctx.measureText(lineText).width
                 ctx.strokeText(lineText,((350) - textWidth / 2),lineTextY)   
                ctx.filter = textBrightness
                ctx.shadowBlur = 0;
                ctx.fillStyle = "white";
                ctx.fillText(lineText,((350) - textWidth / 2),lineTextY)
                lineText = ''
           
        }
         else {
            lineText += `${newItem} `
        }
        
    })

    selectFont("30px Gabriola");
    // let quoteAddY = Number(font.split(' ')[0].slice(0,2)) * 1.55
    // lineTextY +=  quoteAddY <= 35 ? 35 : quoteAddY
    ctx.shadowBlur = shadowBlur;
    ctx.lineWidth = lineWidth;
    let quoteText = `${bookChoose} ${chapterNum +1}.${QuoteNum}`
    let quoteWidth = ctx.measureText(quoteText).width
    ctx.shadowBlur=7;
    ctx.lineWidth=3;
     ctx.strokeText(quoteText,((350) - quoteWidth/2),quoteY)   
    ctx.filter = textBrightness
    ctx.shadowBlur = 0;
    ctx.fillStyle = "white";
    ctx.fillText(quoteText,((350) - quoteWidth/2),quoteY)


    // ctx.font = '22' + font.slice(2)
    // ctx.shadowBlur = shadowBlur;
    // ctx.lineWidth = lineWidth;
    // let measureLength = ctx.measureText(selectedQuote.author)
    //  ctx.strokeText(selectedQuote.author, 300 - measureLength.width / 2 ,570)  
    // ctx.filter = textBrightness 
    // ctx.shadowBlur=0;
    // ctx.fillStyle="white";
    // ctx.fillText(selectedQuote.author,300 - measureLength.width / 2 ,580)

    selectFont("26px Gabriola");
    let reinText = `@reinkarnacia.sk`
    let textWidthRein = ctx.measureText(reinText)
    ctx.shadowBlur=8;
    ctx.lineWidth=3;
    ctx.strokeText(reinText,((350) - (textWidthRein.width / 2)),700 - 15)
    ctx.fillStyle = "white";
    ctx.shadowBlur=0;
    ctx.fillText(reinText,((350) - (textWidthRein.width / 2)),700 - 15 );
    
    ctx.filter = 'brightness(100%)'
    ctx.font = font
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
    console.log('up ' + ctx.font)
    textY -= 10
    writeImage(0)
   
})

// leftbtn.addEventListener('click',() => {
//     textX -= 10
//     writeImage(0)
   
// })

// rightbtn.addEventListener('click',() => {
//     textX += 10
//     writeImage(0)
   
// })

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

// showSpirit.addEventListener('click',() => {
//     select__images__nature.style.display = 'none'
//     select__images__spirit.style.display = 'flex'
//     select__images__book.style.display = 'none'
//     select__images__skull.style.display = 'none'
//     showNature.classList.remove('active')
//     showSpirit.classList.add('active')
//     showBook.classList.remove('active')
//     showSkull.classList.remove('active')
//     fetch('/spirit')
//     .then(res => res.json())
    
//     .then(data => {
//         data.forEach((img,index) => {
//             if(index === 0) select__images__spirit.innerHTML = `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
//             else select__images__spirit.innerHTML += `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
//             if(index === data.length - 1) select__images__spirit.innerHTML += `<div class="selImg"><img src="./addBtn.png" id="addBtnSpirit" class="addBtn" alt=""></div>`
//         })
//         imagesClickEvent() 
//         removeClickEvent()
//         if(data.length === 0) select__images__spirit.innerHTML = `<div class="selImg"><img src="./addBtn.png" id="addBtnSpirit" class="addBtn" alt=""></div>`
//         addBtnSpirit.addEventListener('click', () => {
//             addDiv.style.display = 'initial'
//             selectCategory.value = 'spirit'
//         })
//     })
    
// })

// showBook.addEventListener('click',() => {
//     select__images__nature.style.display = 'none'
//     select__images__spirit.style.display = 'none'
//     select__images__book.style.display = 'flex'
//     select__images__skull.style.display = 'none'
//     showNature.classList.remove('active')
//     showSpirit.classList.remove('active')
//     showBook.classList.add('active')
//     showSkull.classList.remove('active')
//     fetch('/book')
//     .then(res => res.json())
    
//     .then(data => {
//         data.forEach((img,index) => {
//             if(index === 0) select__images__book.innerHTML = `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
//             else select__images__book.innerHTML += `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
//             if(index === data.length - 1) select__images__book.innerHTML += `<div class="selImg"><img src="./addBtn.png" id="addBtnBook" class="addBtn" alt=""></div>`
//         })
//         imagesClickEvent()
//         removeClickEvent()
//         if(data.length === 0) select__images__book.innerHTML = `<div class="selImg"><img src="./addBtn.png" id="addBtnBook" class="addBtn" alt=""></div>`
//         addBtnBook.addEventListener('click', () => {
//             addDiv.style.display = 'initial'
//             selectCategory.value = 'book'
//         })
//     })
// })



// showSkull.addEventListener('click',() => {
//     select__images__nature.style.display = 'none'
//     select__images__spirit.style.display = 'none'
//     select__images__book.style.display = 'none'
//     select__images__skull.style.display = 'flex'
//     showNature.classList.remove('active')
//     showSpirit.classList.remove('active')
//     showBook.classList.remove('active')
//     showSkull.classList.add('active')
//     fetch('/skull')
//     .then(res => res.json())
    
//     .then(data => {
//         data.forEach((img,index) => {
//             if(index === 0) select__images__skull.innerHTML = `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
//             else select__images__skull.innerHTML += `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}" class="remove__button">X</button></div>`
//             if(index === data.length - 1) select__images__skull.innerHTML += `<div class="selImg"><img src="./addBtn.png" id="addBtnSkull" class="addBtn" alt=""></div>`
//         })
//         imagesClickEvent()
//         removeClickEvent()
//         if(data.length === 0) select__images__skull.innerHTML = `<div class="selImg"><img src="./addBtn.png" id="addBtnSkull" class="addBtn" alt=""></div>`
//         addBtnSkull.addEventListener('click', () => {
//             addDiv.style.display = 'initial'
//             selectCategory.value = 'skull'
//         })
//     })
// })
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
        console.log(book)


        ////////////////////////// BG BG BG BG BG  BG BG BG BG BG  BG BG BG BG BG  BG BG BG BG BG 
        
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
                    bookChoose = 'Bhagavad-Gíta'
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

                            let allTextLength = allText.length
                            console.log(allTextLength)

                            selectStyles(allText.length)



                            allText = allText.slice(0,allText.indexOf('VERS'))
                            allText = allText.split(' ') 
                            writeImage(0)
                        })
                    })
                })
            })
        }

          ////////////////////////// BG BG BG BG BG  BG BG BG BG BG  BG BG BG BG BG  BG BG BG BG BG  BG BG BG BG BG 
        
        
        
        
        ////////////////////////// SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB  
        
        
        
        
        if(book === 'sb') {
            bg__chapters.style.display = 'none'
            bg__quotes.style.display = 'none'
            sb__quotes.innerHTML = ``
            console.log(sb.length)
        }















        ////////////////////////// SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB  
        if(book === 'cc') {
            bg__chapters.style.display = 'none'
            bg__quotes.style.display = 'none'
        }
    })
})


canvas1.addEventListener('click',(e) => {
    quoteY = e.clientY - 138
    console.log(quoteY)
    writeImage(0)
})











}












