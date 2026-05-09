async function buildMissingFiles(structure) {
  const created = [];

  for (const file of structure.files) {
    const exists = await fetch(file.path)
      .then(res => res.ok)
      .catch(() => false);

    if (!exists) {
      const content = file.generate();
      created.push({ path: file.path, content });
    }
  }

  return created;
}

async function applyBuild(changes) {
  const output = document.getElementById("output-container");

  output.innerHTML = `
    <h3>Self-Build Results</h3>
    <pre>${JSON.stringify(changes, null, 2)}</pre>
  `;
}

export async function runSelfBuilder(structure) {
  const missing = await buildMissingFiles(structure);
  await applyBuild(missing);
}
