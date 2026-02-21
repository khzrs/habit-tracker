const form = document.getElementById("habit-form");
const input = document.getElementById("habit-name");
const list = document.getElementById("habit-list");

let habits = [];

const saved = localStorage.getItem("habits");
if (saved) habits = JSON.parse(saved);

function renderHabits(){
    localStorage.setItem("habits", JSON.stringify(habits));

    list.innerHTML = "";
    //clears all existing habit items from the list so it can be redone without duplicates
    //innerHTML is built-in DOM on HTML elements, gets or replaces all THML content inside an element

    habits.forEach((habit, index) => { //array loop method taking the habit and index arguments
        const li = document.createElement("li");

        li.innerHTML = `
        <label style="display:flex; align-items:center; gap:10px;">
            <input type="checkbox" data-index="${index}" ${habit.completedToday ? "checked" : ""} />
            <span> ${habit.name}</span>
        </label>
        `;

        list.appendChild(li); 
        //creates a newly created <li> element into the habit list on the page
    
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = input.value.trim();
    if(!name) return;

    habits.push({ name, completedToday: false, streak: 0});

    input.value = "";
    renderHabits();
});

list.addEventListener("change", (e) => {
    if (e.target.tagName != "INPUT" || e.target.type != "checkbox") return;

    const index = Number(e.target.dataset.index);
    habits[index].completedToday = e.target.checked;

    renderHabits();
});

renderHabits();