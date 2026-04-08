let loadLevel = () => {
  let url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLevel(json.data));
};


let spinner=document.getElementById("spinner")
let showSpinner = () => {
  spinner.classList.remove("hidden")
}
let hideSpinner = () => {
  spinner.classList.add("hidden")
}


let searchWord = () => {
  let input = document.getElementById("search-input")
  let searchText = input.value.toLowerCase()

  fetch("https://openapi.programming-hero.com/api/words/all")
  .then(res => res.json())
  .then(data => {
    let words = data.data
    let filterWords = words.filter(word => word.word.toLowerCase().includes(searchText))
    
    displayLevelWord(filterWords)
  })
}



let loadLevelWord = (id) => {
  showSpinner()
  let lessonButtons=document.querySelectorAll(".lesson-btn")
      lessonButtons.forEach(btn => {
        btn.classList.remove("btn-active")        
  });
  let url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let clickbtn=document.getElementById(`lesson-btn-${id}`)
      clickbtn.classList.add("btn-active");
      displayLevelWord(data.data)
      hideSpinner()
    });
};

let loadWordDetails = async(id) => {
  showSpinner()
  let url=`https://openapi.programming-hero.com/api/word/${id}`
  let res = await fetch(url);
  let details = await res.json();
  displayWordDetails(details.data);

  hideSpinner()
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}






let displayLevel = (lessons) => {
  console.log(lessons);
  /* 
    1.get the container and empty
    2.get into every lesson
    3.create element
    4.append
    */

  let levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    let btnDiv = document.createElement("div");
    /* {
"id": 101,
"level_no": 1,
"lessonName": "Basic Vocabulary"
}, */
    btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="lesson-btn btn btn-primary btn-outline"><img src="./assets/fa-book-open.png" alt="" class="">Lesson - ${lesson.level_no}</button>
        `;
    levelContainer.appendChild(btnDiv);
  });
};

let displayLevelWord = (words) => {
  console.log(words);
  let wordContainer = document.getElementById("word-container");
  /* "id": 4,
"level": 5,
"word": "Diligent",
"meaning": "পরিশ্রমী",
"pronunciation": "ডিলিজেন্ট" */
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="col-span-full text-center space-y-6">
          <img class="mx-auto" src="./assets/alert-error.png" alt="">
          <p class="font-bangla text-gray-500 text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <p class="font-bangla text-4xl font-bold">নেক্সট Lesson এ যান</p>
        </div>
    `;
  }

  words.forEach((word) => {
    let card = document.createElement("div");
    card.innerHTML = `
        <div class="space-y-4 text-center card bg-white shadow-sm rounded-xl p-10 h-72">
            <h1 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h1>
            <p class="text-xl font-semibold">Meaning / Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায় নি"}"</div>
            <div class="flex items-center justify-between">
            <button onclick="loadWordDetails(${word.id})" class="bg-blue-200 btn hover:bg-blue-400"><i class="fa-solid fa-circle-info"></i>
</button>
<button onclick="pronounceWord('${word.word}')" class="bg-blue-200 btn hover:bg-blue-400"><i class="fa-solid fa-volume-up"></i>
</button>
        </div>
        </div>
        `;
    wordContainer.appendChild(card);
  });
};


/* 
"word": "Eager",
"meaning": "আগ্রহী",
"pronunciation": "ইগার",
"level": 1,
"sentence": "The kids were eager to open their gifts.",
"points": 1,
"partsOfSpeech": "adjective",
"synonyms": [
"enthusiastic",
"excited",
"keen"
],
"id": 5
*/

let displayWordDetails = (word) =>{
  let modelContainer = document.getElementById("model-container");

  modelContainer.innerHTML=`
    
    <div>
      <h2 class="text-2xl font-bold"><span>${word.word}</span> (<i class="fa-solid fa-microphone" style="color: rgb(0, 0, 0);"></i> :<span class="font-bangla text-3xl">${word.pronunciation}</span>)</h2>
    </div>

    <div>
      <p class="font-semibold">Meaning</p>
      <p class="font-bold font-bangla">${word.meaning}</p>
    </div>
    <div>
      <p class="font-bold">Example</p>
      <p>${word.sentence}</p>
    </div>
    <div class="space-y-3">
      <p class="font-semibold">Synonyms</p>
      <div class="flex flex-row gap-3">
        ${word.synonyms.map(syn => `<span class="badge badge-xl p-5 bg-blue-100">${syn}</span>`).join("")}
      </div>
    </div>
  `
  document.getElementById("my_modal_2").showModal()
}




loadLevel();
