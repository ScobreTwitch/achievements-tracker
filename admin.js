fetch("progress.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("achievementList");
    data.achievements.forEach((ach, i) => {
      const div = document.createElement("div");
      div.className = "achievement";
      div.innerHTML = \`
        <label>\${ach.title}</label><br>
        <input type="number" value="\${ach.current}" min="0" id="cur-\${i}"> / 
        <input type="number" value="\${ach.total}" min="1" id="tot-\${i}">
      \`;
      container.appendChild(div);
    });

    document.getElementById("saveBtn").onclick = () => {
      data.achievements.forEach((ach, i) => {
        ach.current = parseInt(document.getElementById("cur-" + i).value);
        ach.total = parseInt(document.getElementById("tot-" + i).value);
      });

      fetch("/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(res => res.text()).then(txt => alert(txt));
    };
  });