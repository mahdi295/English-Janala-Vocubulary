let loadLevel = () => {
  let url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLevel(json.data));
};

let loadLevelWord = (id) => {
  let url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

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
            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-primary btn-outline"><img src="./assets/fa-book-open.png" alt="" class="">Lesson - ${lesson.level_no}</button>
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
  words.forEach((word) => {
    let card = document.createElement("div");
    card.innerHTML = `
        <div class="space-y-4 text-center card bg-white shadow-sm rounded-xl p-10 h-72">
            <h1 class="text-2xl font-bold">${word.word}</h1>
            <p class="text-xl font-semibold">Meaning / Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex items-center justify-between">
            <button class="bg-blue-200 btn hover:bg-blue-400"><i class="fa-solid fa-circle-info"></i>
</button>
<button class="bg-blue-200 btn hover:bg-blue-400"><i class="fa-solid fa-volume-up"></i>
</button>
        </div>
        </div>
        `;
        wordContainer.appendChild(card)
  });
};

loadLevel();
