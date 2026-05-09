async function loadTemplates() {
  const templateFolder = "../templates/";
  const files = await fetch("../templates/list.json").then(r => r.json());
  const templates = {};

  for (const file of files) {
    const res = await fetch(templateFolder + file);
    templates[file] = await res.json();
  }

  return templates;
}

function renderTemplateSelector(templates) {
  const selector = document.getElementById("template-selector");

  selector.innerHTML = `
    <select id="templateSelect">
      <option value="">Select an Agent Template</option>
      ${Object.keys(templates)
        .map(t => `<option value="${t}">${templates[t].name}</option>`)
        .join("")}
    </select>
  `;

  selector.addEventListener("change", () => {
    const selected = selector.querySelector("select").value;
    if (selected) renderForm(templates[selected]);
  });
}

function renderForm(template) {
  const container = document.getElementById("form-container");
  container.innerHTML = `<h2>${template.name}</h2>`;

  const form = document.createElement("form");
  form.id = "agentForm";

  Object.entries(template.inputs).forEach(([key, config]) => {
    const label = document.createElement("label");
    label.textContent = key;

    let input;
    if (config.type === "select") {
      input = document.createElement("select");
      config.options.forEach(opt => {
        const o = document.createElement("option");
        o.value = opt;
        o.textContent = opt;
        input.appendChild(o);
      });
    } else {
      input = document.createElement("input");
      input.type = config.type;
      input.placeholder = config.placeholder || "";
    }

    input.name = key;
    form.appendChild(label);
    form.appendChild(input);
  });

  const submit = document.createElement("button");
  submit.textContent = "Generate Agent";
  submit.type = "submit";

  form.appendChild(submit);
  container.appendChild(form);

  form.addEventListener("submit", e => {
    e.preventDefault();
    generateAgent(template, new FormData(form));
  });
}

loadTemplates().then(templates => renderTemplateSelector(templates));
