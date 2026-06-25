const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

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

const architecturePatterns = [
  {id:'secure-workbench', layer:'foundation', title:'01. Secure R&D Azure ML Workbench', summary:'End-to-end secure workspace for small R&D data science team, model development, training, and controlled deployment.', flow:['R&D Users','Private Access','Azure ML Workspace','Compute','Registry','Endpoint','Monitoring'], decisions:['Confirm hub-spoke landing zone path','Confirm private access requirements','Confirm workspace naming, tags, region, and subscription'], evidence:['Workspace deployed and accessible','Compute instance operational','Logs flowing to Log Analytics']},
  {id:'landing-zone', layer:'foundation', title:'02. Landing Zone Spoke Integration', summary:'Place Azure ML inside customer-provided Azure landing zone boundaries while respecting subscription, policy, identity, and network guardrails.', flow:['Landing Zone','ML Spoke VNet','Policies','RBAC','Diagnostics','Cost Controls'], decisions:['Which subscription and management group host the workload?','Which Azure Policies are enforced?','Who owns policy exceptions and approvals?'], evidence:['Policy compliance checked','Diagnostic settings enabled','Tagging baseline applied']},
  {id:'private-network', layer:'security', title:'03. Private Endpoint and DNS Flow', summary:'Private path for Azure ML, Storage, Key Vault, ACR, and endpoint access where public access is restricted.', flow:['Corporate DNS','Private DNS Zones','Private Endpoints','Azure ML','Storage','Key Vault','ACR'], decisions:['Who owns private DNS zones?','Is public network access disabled?','Are self-hosted DevOps agents required?'], evidence:['Name resolution validated','Private endpoint connectivity tested','Public access setting documented']},
  {id:'identity-rbac', layer:'security', title:'04. Identity and RBAC Model', summary:'Role separation for data scientists, ML engineers, platform owners, approvers, and pipeline identities.', flow:['Entra ID Groups','Azure RBAC','Managed Identity','Key Vault Access','Pipeline Service Connection'], decisions:['Which groups map to each persona?','Will PIM or approval workflow be required?','Use managed identity or service principal for pipelines?'], evidence:['Access matrix approved','Least-privilege roles assigned','Pipeline identity tested']},
  {id:'dev-env', layer:'ml', title:'05. Notebook Development Environment', summary:'Compute instance based development for Python/R notebooks with controlled data access and reproducible environments.', flow:['Data Scientist','Compute Instance','Notebook','Datastore','Experiment','MLflow'], decisions:['Who can create/start/stop compute instances?','Which base environments are approved?','Is outbound internet allowed?'], evidence:['Notebook starts successfully','Sample experiment logged','Compute auto-shutdown configured']},
  {id:'feature-batch', layer:'ml', title:'06. Feature Engineering and Batch Processing', summary:'CPU compute cluster for feature engineering, data preparation, and batch jobs without overusing GPU resources.', flow:['Input Data','Datastore','CPU Cluster','Pipeline Job','Features','Artifacts'], decisions:['Where is source data stored?','Are feature outputs persisted?','What is acceptable job runtime and cost?'], evidence:['CPU cluster autoscale validated','Feature job executed','Artifacts stored in approved storage']},
  {id:'gpu-training', layer:'ml', title:'07. GPU Training and MLflow Tracking', summary:'On-demand GPU cluster for intermittent model training with experiment tracking, reproducibility, and cost control.', flow:['Training Code','GPU Cluster','MLflow','Metrics','Artifacts','Model Candidate'], decisions:['Is GPU quota available?','Which VM family is approved?','What metric decides candidate quality?'], evidence:['GPU cluster deployable','Training job completed','MLflow metrics and artifacts captured']},
  {id:'registry-promotion', layer:'mlops', title:'08. Model Registry and Promotion Gates', summary:'Versioned model lifecycle with approval gates before deployment to test or production-like endpoint.', flow:['Model Candidate','Evaluation','Approval Gate','Model Registry','Versioned Model'], decisions:['Who approves model promotion?','What validation threshold is required?','What rollback version is retained?'], evidence:['Model registered with version','Approval evidence captured','Rollback model identified']},
  {id:'online-serving', layer:'serving', title:'09. Managed Online Endpoint Serving', summary:'Real-time model serving through Azure ML managed online endpoint, with smoke testing and controlled traffic updates.', flow:['Registered Model','Deployment','Managed Endpoint','Smoke Test','Consumer App','Telemetry'], decisions:['Is endpoint private or public?','What SLA expectation exists for R&D?','Is blue-green or canary rollout needed?'], evidence:['Endpoint deployed','Smoke test passed','Application Insights telemetry visible']},
  {id:'web-observability', layer:'serving', title:'10. Web UI, Batch Inference, and Observability', summary:'Lightweight user interface through Azure Container Apps plus batch scoring capability and operational monitoring.', flow:['Web UI','Container Apps','Online Endpoint','Batch Endpoint','App Insights','Log Analytics'], decisions:['What does application access mean for acceptance?','Is batch inference required now or capability only?','Who monitors after handover?'], evidence:['Web UI reachable','Batch job pattern validated','Runbook and monitoring queries handed over']}
];

const labs = [
  {title:'Azure ML in a Day', level:'Beginner', time:'2-3h', outcome:'Understand workspace, compute, training, and deployment basics.', url:'https://learn.microsoft.com/en-us/azure/machine-learning/tutorial-azure-ml-in-a-day'},
  {title:'Microsoft Learn MLOps Challenges', level:'Hands-on', time:'4-6h', outcome:'Run end-to-end MLOps with Azure ML: experiment, pipeline, model, endpoint.', url:'https://microsoftlearning.github.io/mslearn-mlops/'},
  {title:'Azure MLOps v2 Accelerator', level:'Advanced', time:'1 day', outcome:'Study deployable enterprise-ready MLOps patterns for classical ML, CV, and NLP.', url:'https://github.com/Azure/mlops-v2'},
  {title:'Azure ML Examples', level:'Practical', time:'4h', outcome:'Deploy CLI v2 examples for jobs, components, environments, endpoints, and MLflow.', url:'https://github.com/Azure/azureml-examples'},
  {title:'Azure DevOps + Azure ML Pipeline', level:'Delivery', time:'3-5h', outcome:'Learn repo, service connection, YAML stages, Azure CLI task, model deployment flow.', url:'https://learn.microsoft.com/en-us/azure/machine-learning/how-to-setup-mlops-azureml'}
];

const practices = [
  ['foundation','Keep the workbench small and scoped','Design for 2 users, 3 models, MB to low-GB data, and intermittent GPU. Do not introduce Databricks or lakehouse scope unless formally changed.'],
  ['foundation','Use landing-zone standards first','Adopt customer naming, tags, diagnostics, policies, region, subscription model, and environment boundaries before deploying anything.'],
  ['security','Prefer private access where policy requires it','Validate private endpoints, private DNS, firewall path, and DevOps agent reachability before endpoint deployment.'],
  ['security','Use least privilege RBAC','Separate data scientist, ML engineer, platform owner, security reviewer, and approver roles. Avoid broad contributor access.'],
  ['security','Use managed identities where possible','Reduce secret sprawl. Store unavoidable secrets in Key Vault and document ownership and rotation outside project scope.'],
  ['compute','Autoscale compute to control cost','Use CPU for feature engineering and batch jobs. Use GPU only for training. Set min nodes to zero where possible.'],
  ['mlops','Treat notebooks as exploration, not deployment','Production flow should use scripts, job YAML, environment definitions, model registry, and pipeline execution.'],
  ['mlops','Track experiments with MLflow','Log parameters, metrics, artifacts, model files, and dataset references so results are reproducible.'],
  ['mlops','Define model promotion criteria early','Customer data science SME must define validation metrics, threshold, and approval authority.'],
  ['serving','Deploy one model first','Prove training, registration, deployment, smoke test, monitoring, and rollback before scaling to all models.'],
  ['serving','Keep endpoint rollout controlled','Use test endpoint first. Consider blue-green or canary only if the customer needs safe traffic shifting.'],
  ['operations','Make monitoring acceptance-based','Show endpoint health, errors, latency, job status, and logs. Do not overpromise model drift monitoring unless in scope.'],
  ['operations','Create handover evidence','Screenshots, pipeline logs, runbook, configuration notes, access matrix, and KT recording should support sign-off.'],
  ['governance','Document customer-owned controls','Identity, data governance, compliance, security operation, network enforcement, and ongoing monitoring remain customer-owned unless scope says otherwise.'],
  ['governance','Push access dependencies on day one','Subscriptions, Azure DevOps access, service connection approval, GPU quota, private DNS, and datasets are the critical path.']
];

const questions = [
  ['business','What are the three models expected in scope, and what business outcome does each support?'],
  ['business','Are the models classical ML, forecasting, optimization, computer vision, NLP, or GenAI?'],
  ['business','Is this workbench for R&D only, test deployment, or production-like controlled access?'],
  ['business','Who approves a model before it is exposed through an endpoint or web UI?'],
  ['business','What does acceptance mean: platform deployed, sample model deployed, or business model validated?'],
  ['data','Where is the source data today: Blob, ADLS, SQL, SAP, files, SharePoint, or another platform?'],
  ['data','What is the data classification and does it include personal, supplier, formula, or sensitive R&D data?'],
  ['data','Will data be copied into the workspace or accessed through approved datastores only?'],
  ['data','What refresh pattern is expected for training and batch inference?'],
  ['data','Who owns data quality, schema, feature logic, and validation labels?'],
  ['security','Which subscription, region, resource group, naming standard, and tags must be used?'],
  ['security','Are public network access settings blocked by Azure Policy?'],
  ['security','Who owns private endpoints, firewall rules, private DNS zones, and connectivity testing?'],
  ['security','Which Entra ID groups should map to data scientist, ML engineer, reader, approver, and platform owner roles?'],
  ['security','Are PIM, conditional access, approved locations, or device compliance policies enforced?'],
  ['devops','Should the solution use a new Azure DevOps project or an existing project?'],
  ['devops','Are Microsoft-hosted agents allowed or must we use a self-hosted agent inside the network?'],
  ['devops','Who creates and approves the service connection?'],
  ['devops','What branching model and environment approval rules should the pipelines use?'],
  ['devops','Who owns pipeline support and changes after handover?'],
  ['mlops','What is the minimum pipeline expected: train only, train plus register, or train-register-deploy?'],
  ['mlops','Which metric decides whether a model can be registered or promoted?'],
  ['mlops','Is retraining in scope or only deployment of a sample model?'],
  ['mlops','What is the rollback requirement for failed deployment?'],
  ['mlops','Should batch inference be fully implemented or only proven as capability?'],
  ['operations','Which logs must go to Log Analytics?'],
  ['operations','Which alerts are needed for acceptance?'],
  ['operations','Who monitors endpoint health and pipeline failures after handover?'],
  ['operations','What retention period is required for logs, runs, and artifacts?'],
  ['operations','Is model/data drift monitoring required in scope or deferred?'],
  ['acceptance','Which sample dataset and model should be used for sign-off?'],
  ['acceptance','What is the designated test environment?'],
  ['acceptance','Who signs off workspace access, compute, model registry, endpoint, web UI, monitoring, and runbook?'],
  ['acceptance','What evidence format is required: screenshots, logs, demo recording, document, or all of these?'],
  ['acceptance','What is the escalation path if customer-owned access, data, network, or approval blocks delivery?']
];

const raciHeaders = ['Activity','Azure Architect','Data/ML Architect','Customer Platform','Customer Network','Customer Data Science','Customer Security','Customer DevOps'];
const raciRows = [
  ['Kickoff, scope confirmation, delivery plan','A','C','R','C','C','C','C'],
  ['Subscription, region, naming, tags, policy baseline','R','C','A','C','I','C','I'],
  ['Azure ML workspace design and deployment','A','C','R','C','C','C','C'],
  ['Private endpoint, DNS, firewall, connectivity','C','I','C','A/R','I','C','C'],
  ['Identity groups, RBAC, approvals','R','C','C','I','C','A','C'],
  ['Compute instance, CPU cluster, GPU cluster','A/R','C','C','I','C','C','I'],
  ['Dataset availability and model validation criteria','C','C','I','I','A/R','C','I'],
  ['MLflow tracking and model registry','C','A/R','I','I','C','I','C'],
  ['Azure DevOps project, repo, service connection','C','C','I','C','I','C','A/R'],
  ['Train-register-deploy pipeline','C','A/R','I','C','C','I','R'],
  ['Managed online endpoint and smoke test','A/R','C','C','C','C','C','C'],
  ['Web UI / Container Apps access pattern','A/R','C','C','C','C','C','C'],
  ['Monitoring, logs, dashboard, alerts','A/R','C','C','I','I','C','C'],
  ['Runbook, KT, handover, acceptance evidence','A/R','C','C','C','C','C','C'],
  ['Post-handover operations and support','I','I','A/R','A/R','A/R','A/R','A/R']
];

function renderFilterButtons(target, values, active, handler) {
  const el = $(target);
  if (!el) return;
  el.innerHTML = values.map(v => `<button class="filter ${v === active ? 'active' : ''}" data-filter="${esc(v)}" type="button">${esc(v[0].toUpperCase() + v.slice(1))}</button>`).join('');
  $$('.filter', el).forEach(btn => btn.addEventListener('click', () => {
    $$('.filter', el).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    handler(btn.dataset.filter);
  }));
}

function renderArchitecture(filter = 'all') {
  const grid = $('#architecture-grid');
  const detail = $('#architecture-detail');
  if (!grid || !detail) return;
  const data = architecturePatterns.filter(x => filter === 'all' || x.layer === filter);
  grid.innerHTML = data.map((item, index) => `<article class="diagram-card ${index === 0 ? 'active' : ''}" data-id="${esc(item.id)}"><div class="diagram-top"><h3>${esc(item.title)}</h3><small>${esc(item.layer)}</small></div><p>${esc(item.summary)}</p><div class="mini-flow">${item.flow.map((n, i) => `<span class="flow-node">${esc(n)}</span>${i < item.flow.length - 1 ? '<span class="flow-arrow">→</span>' : ''}`).join('')}</div></article>`).join('');
  function show(item) {
    detail.innerHTML = `<span class="badge">${esc(item.layer)}</span><h3>${esc(item.title)}</h3><p>${esc(item.summary)}</p><h4>Key decisions</h4><ul class="detail-list">${item.decisions.map(x => `<li>${esc(x)}</li>`).join('')}</ul><h4>Evidence for sign-off</h4><ul class="detail-list">${item.evidence.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  }
  show(data[0] || architecturePatterns[0]);
  $$('.diagram-card', grid).forEach(card => card.addEventListener('click', () => {
    $$('.diagram-card', grid).forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    show(architecturePatterns.find(x => x.id === card.dataset.id));
  }));
}
renderFilterButtons('#arch-filters', ['all','foundation','security','ml','mlops','serving'], 'all', renderArchitecture);
renderArchitecture();

function renderLabs() {
  const grid = $('#lab-grid');
  if (!grid) return;
  grid.innerHTML = labs.map((lab, i) => `<article class="lab-card"><span class="badge">Lab ${i + 1}</span><h3>${esc(lab.title)}</h3><p>${esc(lab.outcome)}</p><div class="meta"><span class="badge">${esc(lab.level)}</span><span class="badge">${esc(lab.time)}</span></div><label><input type="checkbox" class="lab-check" data-lab="${i}"> Mark complete</label><a href="${esc(lab.url)}" target="_blank" rel="noreferrer">Open lab</a></article>`).join('');
  const saved = JSON.parse(localStorage.getItem('azureml-labs') || '{}');
  $$('.lab-check').forEach(cb => {
    cb.checked = Boolean(saved[cb.dataset.lab]);
    cb.addEventListener('change', () => {
      saved[cb.dataset.lab] = cb.checked;
      localStorage.setItem('azureml-labs', JSON.stringify(saved));
    });
  });
}
renderLabs();

function renderPractices(filter = 'all') {
  const grid = $('#practice-grid');
  if (!grid) return;
  const data = practices.filter(x => filter === 'all' || x[0] === filter);
  grid.innerHTML = data.map(([cat, title, text]) => `<article class="practice-card"><span class="badge">${esc(cat)}</span><strong>${esc(title)}</strong><p>${esc(text)}</p></article>`).join('');
}
renderFilterButtons('#practice-filters', ['all','foundation','security','compute','mlops','serving','operations','governance'], 'all', renderPractices);
renderPractices();

function renderQuestions(filter = 'all') {
  const grid = $('#question-grid');
  if (!grid) return;
  const data = questions.filter(([category]) => filter === 'all' || category === filter);
  grid.innerHTML = data.map(([category, text]) => `<article class="question-card"><small>${esc(category)}</small><p>${esc(text)}</p></article>`).join('');
}
renderFilterButtons('#question-filters', ['all','business','data','security','devops','mlops','operations','acceptance'], 'all', renderQuestions);
renderQuestions();

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

function renderRaci() {
  const table = $('#raci-table');
  if (!table) return;
  const pill = (v) => v.split('/').map(x => `<span class="raci-pill ${x.toLowerCase()}">${x}</span>`).join(' ');
  table.innerHTML = `<thead><tr>${raciHeaders.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${raciRows.map(row => `<tr>${row.map((cell, idx) => `<td>${idx === 0 ? esc(cell) : pill(cell)}</td>`).join('')}</tr>`).join('')}</tbody>`;
}
renderRaci();

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
  if (score) score.textContent = pct + '%';
}
updateScore();
