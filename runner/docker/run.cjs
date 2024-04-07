const spawnSync = require("child_process").spawnSync;
const fs = require("fs");
const xml2js = require("xml2js");
const readline = require("readline");

if (process.argv.length < 3) {
  console.log("Usage: node run.js <lang>");
  process.exit(1);
}

const lang = process.argv[2];

const input = fs.readFileSync(0, "utf8");

const [file1, file2] = input.split("🨫");

if (!file1 || !file2) {
  console.error("Invalid input");
  process.exit(1);
}

// Run stuff
if (lang === "js") {
  fs.writeFileSync("submission.js", file1);
  fs.writeFileSync("test.js", file2);

  const proc = spawnSync("jest", ["test", "--json"]);
  const stdout = proc.stdout;
  const json = JSON.parse(stdout.toString());

  try {
    const tests = json.testResults[0].assertionResults.map((test) => ({
      name: test.title,
      passed: test.status === "passed",
      msg:
        test.status === "passed"
          ? undefined
          : `expected: ${test.failureDetails[0].matcherResult.expected}, got: ${test.failureDetails[0].matcherResult.actual}`,
    }));
    process.stdout.write(JSON.stringify({ tests }));
    process.exit(0);
  } catch (e) {
    console.error(e);
    throw new Error("JSON parsing failed");
  }
} else if (lang === "py") {
  fs.writeFileSync("submission.py", file1);
  fs.writeFileSync("test.py", file2);

  proc = spawnSync("pytest", ["--junitxml=out.xml"]);

  const xml = fs.readFileSync("out.xml", "utf8");

  const parser = new xml2js.Parser();

  parser.parseString(xml, (err, result) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const tests = result.testsuites.testsuite[0].testcase.map((test) => ({
      name: test.$.name,
      passed: test.failure === undefined,
      msg: test.failure ? test.failure[0].$.message : undefined,
    }));

    process.stdout.write(JSON.stringify({ tests }));
    process.exit(0);
  });
} else {
  console.error(`Unsupported language: ${lang}`);
  process.exit(1);
}
