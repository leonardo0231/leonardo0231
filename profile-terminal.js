const output = document.querySelector("#output");
const command = document.querySelector("#command");
const replay = document.querySelector("#replay");
const date = document.querySelector("#date");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pause = (milliseconds) => new Promise((resolve) => {
  window.setTimeout(resolve, reduceMotion ? 0 : milliseconds);
});

const profile = [
  {
    command: "cat about.txt",
    render: () => [
      '<p class="line"><span class="label">name</span>      : <span class="value">Jalil Ahmad Afshar</span></p>',
      '<p class="line"><span class="label">role</span>      : <span class="value">Python Developer / ML Researcher</span></p>',
      '<p class="line"><span class="label">focus</span>     : <span class="value">Research systems, platforms, practical tools</span></p>',
      '<p class="line"><span class="label">location</span>  : <span class="value">Building from ideas and real workflows</span></p>',
    ].join(""),
  },
  {
    command: "ls projects/",
    render: () => [
      '<div class="project"><a href="https://github.com/leonardo0231/hurst-gated-gold-forecasting" target="_blank" rel="noreferrer">./hge-gold-forecasting</a><span class="muted">audit-first XAUUSD research, causal features, purged validation, MT5 replay</span></div>',
      '<div class="project"><a href="https://github.com/leonardo0231/DNSGame" target="_blank" rel="noreferrer">./dnsgame</a><span class="muted">Windows DNS benchmarking, safe snapshots, rollback, WPF</span></div>',
      '<div class="project"><a href="https://github.com/leonardo0231/study-assistant" target="_blank" rel="noreferrer">./study-assistant</a><span class="muted">FastAPI chatbot, embeddings, FAISS vector search</span></div>',
      '<div class="project"><a href="https://github.com/leonardo0231/Financial-market" target="_blank" rel="noreferrer">./financial-market</a><span class="muted">experimental XAU/USD automation, MT5, n8n, risk controls</span></div>',
    ].join(""),
  },
  {
    command: "cat principles.md",
    render: () => [
      '<p class="line"><span class="value">Define the contract.</span></p>',
      '<p class="line"><span class="value">Make the data traceable.</span></p>',
      '<p class="line"><span class="value">Test the boundary.</span></p>',
      '<p class="line"><span class="value">Report the result honestly.</span></p>',
    ].join(""),
  },
];

async function typeText(text) {
  command.textContent = "";
  if (reduceMotion) {
    command.textContent = text;
    return;
  }

  for (const character of text) {
    command.textContent += character;
    await pause(28);
  }
}

async function runProfile() {
  output.replaceChildren();
  command.textContent = "";
  date.textContent = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

  for (const item of profile) {
    const commandLine = document.createElement("p");
    commandLine.className = "line command-line";
    commandLine.innerHTML = '<span class="prompt">jalil@github:~$</span> ';
    const commandText = document.createElement("span");
    commandLine.append(commandText);
    output.append(commandLine);

    await typeText(item.command);
    commandText.textContent = item.command;
    await pause(260);

    const result = document.createElement("section");
    result.innerHTML = item.render();
    output.append(result);
    await pause(500);
  }

  command.textContent = "ready";
}

replay.addEventListener("click", runProfile);
runProfile();

