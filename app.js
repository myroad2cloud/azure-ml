const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const navToggle = $('.nav-toggle');
const navLinks = $('#nav-links');
navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

const themeToggle = $('#theme-toggle');
const savedTheme = localStorage.getItem('azureml-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
themeToggle.textContent = document.body.classList.contains('dark') ? 'Light' : 'Dark';
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('azureml-theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? 'Light' : 'Dark';
});

$$('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    $$('.tab').forEach((t) => t.classList.remove('active'));
    $$('.tab-panel').forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    $('#' + tab.dataset.tab).classList.add('active');
  });
});

const questions = [
  ['business', 'What are the models expected in scope, and what business decision does each model support?'],
  ['business', 'Who approves a model before it is exposed through an endpoint or web interface?'],
  ['business', 'Is this workbench for research only, test deployment, or production-like validation?'],
  ['data', 'Where is the source data today: storage account, database, files, SAP, SharePoint, or another platform?'],
  ['data', 'What is the data classification, and are there any personal, supplier, or sensitive research attributes?'],
  ['data', 'Is data copied into the workspace, or should jobs read from an approved datastore only?'],
  ['security', 'Which subscription, region, naming convention, tags, and policy assignments must be used?'],
  ['security', 'Are private endpoints and private DNS mandatory for Azure ML, Storage, Key Vault, and ACR?'],
  ['security', 'Which Entra ID groups map to data scientist, ML engineer, reader, approver, and platform owner roles?'],
  ['devops', 'Should this use a new Azure DevOps project or an existing project and repo?'],
  ['devops', 'Are Microsoft-hosted agents allowed, or is a self-hosted agent required for network access?'],
  ['devops', 'Who approves service connections, environment approvals, and pipeline deployment permissions?'],
  ['acceptance', 'Which sample model should be used for acceptance testing?'],
  ['acceptance', 'What model metric, smoke test, and endpoint evidence are required for sign-off?'],
  ['acceptance', 'Who signs off workspace access, pipeline execution, endpoint deployment, monitoring, and handover?']
];

const grid = $('#question-grid');
function renderQuestions(filter = 'all') {
  grid.innerHTML = '';
  questions
    .filter(([category]) => filter === 'all' || category === filter)
    .forEach(([category, text]) => {
      const card = document.createElement('article');
      card.className = 'question-card';
      card.innerHTML = `<small>${category}</small><p>${text}</p>`;
      grid.appendChild(card);
    });
}
renderQuestions();

$$('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.filter').forEach((f) => f.classList.remove('active'));
    button.classList.add('active');
    renderQuestions(button.dataset.filter);
  });
});

const pipelineText = {
  1: 'Data scientist commits training code, environment file, job YAML, scoring script, and endpoint YAML to the repository.',
  2: 'CI validates repo structure, installs dependencies, checks YAML, and confirms the Azure ML CLI path is usable.',
  3: 'Pipeline submits a training job to Azure ML compute and tracks parameters, metrics, artifacts, and outputs with MLflow.',
  4: 'If metrics meet the agreed threshold, the pipeline registers a versioned model in the Azure ML registry.',
  5: 'Release stage deploys the registered model to a managed online endpoint and runs a smoke test.',
  6: 'Application Insights and Log Analytics capture endpoint health, errors, latency, usage, and operational evidence.'
};
$$('.step').forEach((step) => {
  step.addEventListener('click', () => {
    $$('.step').forEach((s) => s.classList.remove('active'));
    step.classList.add('active');
    $('#pipeline-detail').textContent = pipelineText[step.dataset.step];
  });
});

const checks = $$('.task-list input[type="checkbox"]');
const score = $('#readiness-score');
const savedChecks = JSON.parse(localStorage.getItem('azureml-checks') || '{}');
checks.forEach((box, index) => {
  box.checked = Boolean(savedChecks[index]);
  box.addEventListener('change', () => {
    savedChecks[index] = box.checked;
    localStorage.setItem('azureml-checks', JSON.stringify(savedChecks));
    updateScore();
  });
});
function updateScore() {
  const done = checks.filter((c) => c.checked).length;
  const pct = Math.round((done / Math.max(checks.length, 1)) * 100);
  score.textContent = pct + '%';
}
updateScore();
