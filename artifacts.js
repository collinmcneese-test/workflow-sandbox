const { Octokit } = require("@octokit/action");

const octokit = new Octokit();
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const workflowId = process.env.RUN_ID;

octokit.actions.listWorkflowRunArtifacts({
  owner,
  repo,
  run_id: workflowId,
}).then(response => {
  const artifacts = response.data.artifacts;

  console.log('Processing artifacts: ', artifacts);

  artifacts.forEach(artifact => {
    console.log('Cleaning up artifact:', artifact.name);

    octokit.actions.deleteArtifact({
      owner,
      repo,
      artifact_id: artifact.id,
    });
  });
});
