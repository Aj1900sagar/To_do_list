const themeToggle = document.getElementById("themeToggle");
const calendarTitle = document.getElementById("calendarTitle");
const calendarDate = document.getElementById("calendarDate");
const markDateBtn = document.getElementById("markDateBtn");
const markedDaysBox = document.getElementById("markedDays");
const exportPDFBtn = document.getElementById("exportPDFBtn");

let markedDays = JSON.parse(localStorage.getItem("markedDays")) || [];

// Theme toggle
themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
    themeToggle.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
};

function saveMarkedDays() {
    localStorage.setItem("markedDays", JSON.stringify(markedDays));
}

function renderMarkedDays() {
    markedDaysBox.innerHTML = "";
    markedDays.forEach((item, i) => {
        const div = document.createElement("div");
        div.className = "marked-item";
        div.innerHTML = `
            <span>✔ ${item.date} — <b>${item.title}</b></span>
            <button onclick="deleteMarked(${i})">✕</button>
        `;
        markedDaysBox.appendChild(div);
    });
}

markDateBtn.onclick = () => {
    if (!calendarTitle.value || !calendarDate.value) {
        alert("Please enter title and select date!");
        return;
    }

    markedDays.push({
        title: calendarTitle.value,
        date: calendarDate.value
    });

    saveMarkedDays();
    renderMarkedDays();

    calendarDate.value = "";
};

function deleteMarked(i) {
    markedDays.splice(i, 1);
    saveMarkedDays();
    renderMarkedDays();
}

// Export as PDF
exportPDFBtn.onclick = () => {
    if (markedDays.length === 0) {
        alert("No marked days to export!");
        return;
    }

    let content = `<h2 style="text-align:center">Your daily goals</h2>
                   <p style="text-align:center">Generated on: ${new Date().toDateString()}</p>
                   <hr><ul>`;

    markedDays.forEach(item => {
        content += `<li style="margin:8px 0;font-size:15px">
                        ✔ <b>${item.date}</b> — ${item.title}
                    </li>`;
    });

    content += "</ul>";

    let win = window.open("", "", "width=800,height=600");
    win.document.write(`
        <html>
        <head>
            <title>Your Daily Goals PDF</title>
            <style>
                body { font-family: Arial; padding: 30px; }
                h2 { color: #4f46e5; }
                ul { padding-left: 20px; }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `);

    win.document.close();
    win.print();
};

renderMarkedDays();
