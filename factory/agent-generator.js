function generateAgent(template, formData) {
  const output = document.getElementById("output-container");

  const inputValues = {};
  for (const [key, value] of formData.entries()) {
    inputValues[key] = value;
  }

  const result = {
    template: template.name,
    inputs: inputValues,
    workflows: template.workflows,
    outputs: template.outputs
  };

  output.innerHTML = `
    <h3>Generated Agent</h3>
    <pre>${JSON.stringify(result, null, 2)}</pre>
  `;
}
