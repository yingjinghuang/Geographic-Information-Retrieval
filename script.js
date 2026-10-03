const course = {
  title: 'Geographic Information Retrieval',
  semester: '2026W',
  semesterLong: 'Winter Semester 2026/27',
  weeks: [
    ['Introduction', 'What makes search geographic?', 'Part I · Text → Places', 'Text document + concept map', 'Oct 9'],
    ['Geoparsing I', 'How can places be recognised in text?', 'Part I · Text → Places', 'Predicted place-name spans', 'Oct 16'],
    ['Geoparsing II', 'How good are the predictions?', 'Part I · Text → Places', 'Metrics + error analysis', 'Oct 23'],
    ['Geocoding I', 'Which entity and coordinates does a name refer to?', 'Part I · Text → Places', 'Candidates + evaluation', 'Nov 13'],
    ['Geocoding II', 'How do context, scope, and evidence support verification?', 'Part I · Text → Places', 'Traceable decision record', 'Nov 20'],
    ['Midterm Exam', 'Assessment of Weeks 1–5', 'Assessment', 'Midterm exam', 'Nov 27'],
    ['Text Indexing', 'How can documents be searched efficiently?', 'Part II · Places → Search', 'Inverted index + Boolean retrieval', 'Dec 4'],
    ['Spatial Indexing', 'How can geometries be searched efficiently?', 'Part II · Places → Search', 'Spatial index + verified queries', 'Dec 11'],
    ['Textual Ranking', 'How can matching documents be ranked by text relevance?', 'Part II · Places → Search', 'TF-IDF + cosine ranking', 'Dec 18'],
    ['Spatial and Hybrid Ranking', 'How should text and space jointly determine ranking?', 'Part II · Places → Search', 'Scores + sensitivity analysis', 'Jan 8'],
    ['Final Project Presentation', 'How does the complete GIR workflow perform?', 'Assessment', 'Team presentation', 'Jan 15']
  ],
  schedule: [
    ['Oct 6',  'Oct 9',  'Introduction', '', false],
    ['Oct 13', 'Oct 16', 'Geoparsing I', 'Zilong', false],
    ['Oct 20', 'Oct 23', 'Geoparsing II', 'Zilong', false],
    ['Oct 27', 'Nov 13', 'Geocoding I + <span class="schedule-accent">Quiz (Save the date!)</span>', 'Zilong', false],
    ['Nov 03', 'Nov 20', 'Geocoding II', 'Zilong', false],
    ['Nov 10', 'Nov 27', 'Midterm exam (Save the date!)', '', true],
    ['Nov 17', 'Dec 4',  'Text Indexing', 'Yingjing', false],
    ['Nov 24', 'Dec 11', 'Spatial Indexing + <span class="schedule-accent">Project proposal (Save the date!)</span>', 'Yingjing', false],
    ['Dec 01', 'Dec 18', 'Textual Ranking', 'Yingjing', false],
    ['Dec 15', 'Jan 8',  'Spatial and Hybrid Ranking', 'Yingjing', false],
    ['Jan 12', 'Jan 15', 'Final project presentation (Save the date!)', '', true]
  ]
};

document.head.insertAdjacentHTML('beforeend', '<link rel="icon" href="img/favicon.svg" type="image/svg+xml">');

function sidebar(activeWeek) {
  const hiddenWeeks = new Set([6, 11]);
  const links = course.weeks.map((w, i) => {
    const n = i + 1;
    if (hiddenWeeks.has(n)) return '';
    return `<a href="week${n}.html" class="${activeWeek === n ? 'active' : ''}"><span>W${n}</span>${w[0]}</a>`;
  }).join('');
  const isProjectProposal = document.body.dataset.page === 'project-proposal';
  const isFinalProject = document.body.dataset.page === 'final-project';
  return `<aside class="sidebar" id="sidebar"><div class="sidebar-header">
    <img src="img/uni_logo.png" alt="University of Vienna" class="sidebar-logo">
    <h2>${course.title}</h2>
    <div class="semester">${course.semester} · University of Vienna</div></div>
    <nav><div class="nav-title">Overview</div><a href="index.html" class="nav-home ${!activeWeek && !isProjectProposal && !isFinalProject ? 'active' : ''}">Home</a>
    <div class="nav-title">Lectures &amp; Labs</div><div class="week-nav">${links}</div>
    <div class="nav-title">Course Project</div><div class="week-nav"><a href="project-proposal.html" class="${isProjectProposal ? 'active' : ''}"><span>PP</span>Project Proposal</a><a href="final-project.html" class="${isFinalProject ? 'active' : ''}"><span>FP</span>Final Project</a></div></nav></aside><div class="backdrop" id="backdrop"></div>`;
}

function shell() {
  const activeWeek = Number(document.body.dataset.week || 0);
  document.body.insertAdjacentHTML('afterbegin', sidebar(activeWeek));
  const main = document.querySelector('.main');
  main.insertAdjacentHTML('afterbegin', `<div class="topbar"><button class="icon-button menu-toggle" id="menuToggle" aria-label="Open navigation">☰</button><span class="topbar-label">Geographic Information Retrieval</span><button class="icon-button" id="themeToggle" aria-label="Toggle colour theme">☾</button></div>`);
  document.querySelectorAll('[data-course-title]').forEach(el => el.textContent = course.title);
  const footer = document.querySelector('.footer');
  if (footer) footer.textContent = `${course.title} · University of Vienna · ${course.semester}`;

  const saved = localStorage.getItem('gir-theme');
  if (saved) document.documentElement.dataset.theme = saved;
  const themeButton = document.getElementById('themeToggle');
  const updateThemeButton = () => themeButton.textContent = document.documentElement.dataset.theme === 'dark' ? '☀' : '☾';
  updateThemeButton();
  themeButton.addEventListener('click', () => {
    document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('gir-theme', document.documentElement.dataset.theme);
    updateThemeButton();
  });
  const side = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  document.getElementById('menuToggle').addEventListener('click', () => { side.classList.toggle('open'); backdrop.classList.toggle('show'); });
  backdrop.addEventListener('click', () => { side.classList.remove('open'); backdrop.classList.remove('show'); });
}

function renderSchedule() {
  const tbody = document.getElementById('scheduleBody');
  if (!tbody) return;
  tbody.innerHTML = course.schedule.map((row, i) => {
    const [tue, fri, topic, lecturer, highlight] = row;
    const week = i + 1;
    let topicCell = topic;
    if (week === 11) topicCell = `<a href="final-project.html">${topic}</a>`;
    else if (week !== 6) topicCell = `<a href="week${week}.html">${topic}</a>`;
    return `<tr class="${highlight ? 'schedule-highlight' : ''}"><td>Week ${week}</td><td>${tue}</td><td>${fri}</td><td>${topicCell}</td><td>${lecturer}</td></tr>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => { shell(); renderSchedule(); });
