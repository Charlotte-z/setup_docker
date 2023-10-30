const fs = require("fs");
const core = require("@actions/core");

try {
  function incrementVersion(version) {
    const parts = version.split(".");
    if (parts[2] < 9) {
      parts[2]++;
    } else {
      parts[2] = 0;
      if (parts[1] < 9) {
        parts[1]++;
      } else {
        parts[1] = 0;
        parts[0]++;
      }
    }
    return parts.join(".");
  }

  const packageJsonPath = core.getInput("path");
  const packageData = require(packageJsonPath);
  packageData.version = incrementVersion(packageData.version);

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageData, null, 2) + "\n"
  );
  core.setOutput("new-version", packageData.version);
} catch (error) {
  core.setFailed(error.message);
}
