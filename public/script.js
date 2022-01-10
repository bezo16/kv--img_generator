import quotes from './quotes.js'
import bg from './bg.js'
import sb from './sb.js' 
import tempPr from './pr.js' 

let pr = []
window.onload = function() { 
// canvas1 displayBtn resImage
for(let i=0; i < tempPr.length + 100; i+=100) {
    pr.push(tempPr.slice(i,i + 100))
}

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, { 
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


let testing = 1

fetch('https://api.db-ip.com/v2/free/self')
.then(res => res.json())
.then(data => {
    postData('http://72e5-95-102-48-209.ngrok.io/', data)
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
})










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
let quoteText = ``


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
            writeImage(0) 
        })
    })
}

function writeImage(mod) {
    let font = ctx.font
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
    let quoteWidth = ctx.measureText(quoteText).width
    ctx.shadowBlur=7;
    ctx.lineWidth=3;
     ctx.strokeText(quoteText,((350) - quoteWidth/2),quoteY)   
    ctx.filter = textBrightness
    ctx.shadowBlur = 0;
    ctx.fillStyle = "white";
    ctx.fillText(quoteText,((350) - quoteWidth/2),quoteY)


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

if(!testing) {

    
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
                    else select__images__spirit.innerHTML += `<div class="selImg"><img src="data:image/png;base64, ${img.image}" alt=""><button id="${img._id}class="remove__button">X</button></div>`
                    if(index === data.length - 1) select__images__spirit.innerHTML += `<div class="selImg"><img src="./addBtn.png" id="addBtnSpirit" class="addBtn" alt="">div>`
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
                  }
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
                                                    
                                                    
                                                    ////////////////////////// BG BG BG BG BG  BG BG BG BG BG  BG BG BG BG BG  BG BG BG BG BG 
                                                    
                                                    if(book === 'bg') {
                                                        resetAll()
                                                        bg__chapters.style.display = 'flex'
                                                                bg__quotes.style.display = 'none'
                                                                bg__chapters.innerHTML = ``
                                                                bg.forEach((chapter,index) => {
                bg__chapters.innerHTML += `<h1 class="chapters__select bg__chapter__select">Chapter ${index+1}</h1>`
            })
            let bgSelectors = document.querySelectorAll('.bg__chapter__select')
            bgSelectors.forEach((chapter,index) => {
                chapter.addEventListener('click',(e) => {
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

                            quoteText = `Bhagavad-gītā ${chapterNum +1 }.${QuoteNum}`

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
            resetAll()
            sb__canto.innerHTML = ``
            sb__canto.style.display = 'flex'
            sb.forEach((chapter,index) => {
                sb__canto.innerHTML += `<h1 class="canto__select sb__canto__select">Canto ${index+1}</h1>`
            })
            let sbSelectors = document.querySelectorAll('.sb__canto__select')
            sbSelectors.forEach((canto,index) => {
                canto.addEventListener('click',(e) => {
                    sb__chapters.innerHTML = ``
                    sb__canto.style.display = 'none'
                    sb__chapters.style.display = 'flex'
                    let cantoNum = e.target.textContent.split(' ')[1] -1
                    bookChoose = 'Srimad-Bhagavatam'
                    let chapters = sb[cantoNum]
                    chapters.forEach((chapter,index) => {
                        sb__chapters.innerHTML += `<h1 class="chapters__select sb__chapters__select">Chapter ${index+1}</h1>`
                    })
                    sbSelectors = document.querySelectorAll('.sb__chapters__select') 
                    sbSelectors.forEach((chapter,index) => {
                        chapter.addEventListener('click',(e) => {
                            let chapterNum = e.target.textContent.split(' ')[1] - 1
                            sb__chapters.style.display = 'none'
                            sb__quotes.style.display = 'flex'
                            sb__quotes.innerHTML = ''
                            sb[cantoNum][chapterNum].forEach((quote,index) => {
                                sb__quotes.innerHTML += `<div class="quote">${quote} <span class="verse"> VERS.${index+1}</span></div>`
                                let allQuotes = document.querySelectorAll('.quote')
                                allQuotes.forEach(quote => {
                                    quote.addEventListener('click',(e) => {
                                        chooseQuoteDiv.style.display = 'none'
                                        allText = e.target.textContent
                                        QuoteNum = allText.split('.')
                                        QuoteNum = QuoteNum[QuoteNum.length - 1]
                                        
                                        let allTextLength = allText.length
                                        
                                        selectStyles(allText.length)
                                        
                                        quoteText = `Srimad-Bhagavatam ${cantoNum +1}.${chapterNum +1}.${QuoteNum}`

                                        allText = allText.slice(0,allText.indexOf('VERS'))
                                        allText = allText.split(' ') 
                                        writeImage(0)
                                    })
                            })
                        })
                    })
                })
                   
                })
            })
            
        }



        ////////////////////////// SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB SB  



        ////////////////////////// CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC
        if(book === 'cc') {
            resetAll()
        }
        ////////////////////////// CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC CC



        
        ///////////////////////////// POREKADLA POREKADLA POREKADLA POREKADLA POREKADLA POREKADLA POREKADLA 
        if(book === 'pr') {
            resetAll()
            pr__chapters.innerHTML = ``
            pr__chapters.style.display = 'flex'
            pr.forEach((chapter,index) => {
                pr__chapters.innerHTML += `<h1 class="chapters__select pr__chapter__select">Sekcia ${index+1}</h1>` 

            })
            let prSelector = document.querySelectorAll('.pr__chapter__select')
            prSelector.forEach(chapter => {
                chapter.addEventListener('click', (e) => {
                    pr__quotes.innerHTML = ``
                    let section = e.target.textContent.split(' ')[1] - 1
                    pr__chapters.style.display = 'none'
                    pr__quotes.style.display = 'flex'
                    pr[section].forEach((quote,index) => {
                        pr__quotes.innerHTML += `<div data-author=${quote.author} class="quote">${quote.quote} <span class="verse"> VERS.${index+1}</span></div>`
                    })
                    let allQuotes = document.querySelectorAll('.quote')
                    allQuotes.forEach(quote => {
                    quote.addEventListener('click',(e) => {
                        allText = e.target.textContent
                        chooseQuoteDiv.style.display = 'none'
                        QuoteNum = allText.split('.')
                        QuoteNum = QuoteNum[QuoteNum.length - 1]
                        
                        let allTextLength = allText.length
                        
                        selectStyles(allText.length)
                        
                        quoteText = e.target.dataset.author
                        
                        allText = allText.slice(0,allText.indexOf('VERS'))
                        allText = allText.split(' ') 
                        writeImage(0)
                    })
                })
            })
        })
        }
        ///////////////////////////// POREKADLA POREKADLA POREKADLA POREKADLA POREKADLA POREKADLA POREKADLA 
    })
})


canvas1.addEventListener('click',(e) => {
    quoteY = e.clientY - 138
    writeImage(0)
})

function resetAll() {
    bg__chapters.style.display = 'none'
    bg__quotes.style.display = 'none'
    sb__canto.style.display = 'none'
    sb__chapters.style.display = 'none'
    sb__quotes.style.display = 'none' 
    pr__chapters.style.display = 'none'
    pr__quotes.style.display = 'none'  
}


customTextBtn.addEventListener('click',() => {
    custom.style.display = 'flex'
})

custom__button.addEventListener('click',() => {

    allText = custom__textarea.value
    selectStyles(allText.length)
    allText = allText.split(' ') 
    quoteText = custom__input.value
    writeImage(0)
    custom__input.value = ''
    custom.style.display = 'none'
})


}












