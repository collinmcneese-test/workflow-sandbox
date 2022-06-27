const { Octokit } = require("@octokit/action");

const octokit = new Octokit();
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const workflowId = process.env.GITHUB_RUN_ID;

await octokit.actions.listWorkflowRunArtifacts({
  owner,
  repo,
  run_id: workflowId
}).then(response => {
  const artifacts = response.data.artifacts;
  artifacts.forEach(artifact => {
    octokit.actions.deleteArtifact({
      owner,
      repo,
      artifact_id: artifact.id
    });
  })
})
