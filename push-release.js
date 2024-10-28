// scripts/push-release.js
import { execSync } from 'child_process';

// eslint-disable-next-line no-undef
const versionType = process.argv[2] || 'patch';

try {
  // Step 1: Get the current branch name
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf-8' }).trim();

  // Step 2: Check if the branch exists on the remote
  const branchExistsOnRemote = execSync(`git ls-remote --heads origin ${currentBranch}`, {
    encoding: 'utf-8',
  }).includes(currentBranch);

  // Step 3: Push with appropriate flags based on branch existence
  if (branchExistsOnRemote) {
    console.log(`Branch "${currentBranch}" exists on origin. Force pushing...`);
    execSync(`git push -f origin ${currentBranch}`, { stdio: 'inherit' });
  } else {
    console.log(`Branch "${currentBranch}" does not exist on origin. Pushing with -u...`);
    execSync(`git push -u origin ${currentBranch}`, { stdio: 'inherit' });
  }

  // Step 4: Push tags to remote
  execSync('git push --tags', { stdio: 'inherit' });

  console.log(`Successfully pushed ${versionType} release to branch ${currentBranch}`);
} catch (error) {
  console.error('Error pushing release:', error.message);
  // eslint-disable-next-line no-undef
  process.exit(1);
}
