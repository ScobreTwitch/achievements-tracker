async function loadProgress() {
  try {
    const res = await fetch("progress.json?_=" + new Date().getTime());
    const data = await res.json();

    const achievements = data.achievements;
    const total = achievements.reduce((sum, a) => sum + a.total, 0);
    const current = achievements.reduce((sum, a) => sum + a.current, 0);
    const percent = Math.floor((current / total) * 100);

    document.getElementById("main-bar").style.width = percent + "%";
    document.getElementById("main-percent").textContent = percent + "%";

    const list = document.getElementById("achievement-list");
    list.innerHTML = "";
    achievements.forEach(a => {
      const isComplete = a.current >= a.total;
      const li = document.createElement("li");
      li.textContent = `${a.title} - ${a.current}/${a.total}`;
      if (isComplete) li.style.color = "#00ff88";
      list.appendChild(li);
    });

  } catch (err) {
    console.error("Error loading progress:", err);
  }
}

loadProgress();
setInterval(loadProgress, 3000);