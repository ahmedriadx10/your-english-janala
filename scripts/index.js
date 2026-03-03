const levelButtonsContainer=document.getElementById('lesson-buttons-container')

const getAllLevels=()=>{

  fetch('https://openapi.programming-hero.com/api/levels/all')
  .then(response=>response.json())
  .then(levelData=>loadAllLevelsButton(levelData.data))

}

/**
 * 
 *

 {id: 107, level_no: 7, lessonName: 'Mastering Vocabulary'}
} x 
 */


const loadAllLevelsButton=(x)=>{

levelButtonsContainer.innerHTML=``

x.forEach(level=>{

const {level_no}=level

const buttonsDiv=document.createElement('div')

buttonsDiv.innerHTML=`
<a href="" class="btn btn-primary btn-outline"><i class="fa-solid fa-book-open"></i> Lesson-${level_no}</a>
`

levelButtonsContainer.appendChild(buttonsDiv)

})

}
getAllLevels()
