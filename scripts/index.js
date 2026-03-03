const levelButtonsContainer=document.getElementById('lesson-buttons-container')
const wordContainer=document.getElementById('words-container')
const getAllLevels=()=>{

  fetch('https://openapi.programming-hero.com/api/levels/all')
  .then(response=>response.json())
  .then(levelData=>loadAllLevelsButton(levelData.data))

}


/**
 * 
 *{
    "id": 8,
    "level": 2,
    "word": "Hesitate",
    "meaning": "দ্বিধা করা",
    "pronunciation": "হেজিটেট"
}
 */


const renderLessonWords=(wordList)=>{

// word list gives empthy data it will show a default skeleton

if(wordList.length===0){
  wordContainer.innerHTML=``

const defaultEmpthyWordSekelton=document.createElement('div')

defaultEmpthyWordSekelton.innerHTML=`

  <div class=" text-center space-y-4 py-10  font-bangla mx-auto " >
<img src="./assets/alert-error.png" alt="" class="mx-auto">

<p class="font-bangla text-[#79716b] text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>

<h6 class="font-medium text-4xl text-[#292524]">নেক্সট Lesson এ যান</h6>

  </div>
`

defaultEmpthyWordSekelton.classList.add('col-span-full')

wordContainer.appendChild(defaultEmpthyWordSekelton)
return;
}






wordContainer.innerHTML=''

wordList.forEach(wordData=>{

const {word,meaning,pronunciation}=wordData

const wordCard=document.createElement('div')
wordCard.innerHTML=`
<div class="p-10 rounded-xl text-center space-y-3 bg-base-100 shadow-sm h-full">

  <h2 class="font-bold text-3xl">${word}</h2>
<p class="font-medium text-xl">Meaning/Pronounciation</p>
<p class="font-bangla text-2xl font-semibold">${meaning?meaning:'অর্থ খুঁজে পাওয়া যায়নি'}/${pronunciation}</p>
<div class="flex justify-between items-center">
<button class="btn bg-primary-content text-lg"><i class="fa-solid fa-circle-info pointer-events-none"></i></button>
<button class="btn bg-primary-content text-lg"><i class="fa-solid fa-volume-high pointer-events-none"></i></button>

</div>
</div>
`

wordContainer.appendChild(wordCard)



})

}


const lessonButtonActive=(id)=>{

const allButtons=levelButtonsContainer.querySelectorAll('.lesson-btn')

allButtons.forEach(button=>{

  button.classList.remove('bg-primary','text-white')

})

const targetButton=document.getElementById(`lesson-btn-${id}`)

targetButton.classList.add('bg-primary','text-white')



}

const getSpecificLessonWord=(id)=>{

fetch(`https://openapi.programming-hero.com/api/level/${id}`)

.then(res=>res.json()).then(x=>{

  lessonButtonActive(id)

return renderLessonWords(x.data)

})


}

const loadAllLevelsButton=(x)=>{

levelButtonsContainer.innerHTML=``

x.forEach(level=>{

const {level_no}=level

const buttonsDiv=document.createElement('div')

buttonsDiv.innerHTML=`
<button onclick='getSpecificLessonWord(${level_no})'
id='lesson-btn-${level_no}'  class="lesson-btn btn btn-primary btn-outline"><i class="fa-solid fa-book-open"></i> Lesson-${level_no}</button>
`

levelButtonsContainer.appendChild(buttonsDiv)

})

}
getAllLevels()
