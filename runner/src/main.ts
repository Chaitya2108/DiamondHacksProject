import amqp from "amqplib";

import { z } from "zod";

import Parser from "tree-sitter";
import JavaScript from "tree-sitter-javascript";
import Python from "tree-sitter-python";

import "dotenv/config";

const url = process.env.AMQP_URL;
const user = process.env.AMQP_USER;
const pass = process.env.AMQP_PASS;

main();

async function main() {
  console.log(generateTestfile("js", [{ input: [1, 2], expected: 3 }]));
  console.log(editSubmission("js", "function add(a, b) { return a + b }"));
  console.log(editSubmission("py", "def add(a, b):\n  return a + b"));

  if (url === undefined || user === undefined || pass === undefined) {
    throw new Error("AMQP_URL, AMQP_USER, AMQP_PASS must be set");
  }

  const connection = await amqp.connect(url, {
    credentials: amqp.credentials.plain(user, pass),
  });

  const channel = await connection.createChannel();

  await channel.assertQueue("jobs", { durable: false });

  channel.prefetch(1);

  console.log(" [*] Waiting for messages jobs");

  let active = 0;

  channel.consume("jobs", async (msg) => {
    if (!msg) {
      return;
    }

    if (active >= 10) {
      return;
    }

    const res = await handle(JSON.parse(msg.content.toString()));

    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(JSON.stringify(res)),
      {
        correlationId: msg.properties.correlationId,
      },
    );

    channel.ack(msg);
  });
}

const jsonSchema = z.object({
  id: z.string(),
  lang: z.enum(["js", "py"]),
  tests: z.array(
    z.object({
      input: z.array(z.union([z.string(), z.number()])),
      expected: z.union([z.string(), z.number()]),
    }),
  ),
  submission: z.string(),
});

async function handle(json: z.infer<typeof jsonSchema>) {
  console.log(" [*] Received %s", json.id);

  return new Promise((resolve, reject) => {
    // exec(
    //   `docker run --rm -v ${folder}:/app/test runner node /app/run.cjs ${lang}`,
    //   (err, stdout, stderr) => {
    //     if (err) {
    //       console.error(err);
    //     }
    //
    //     console.log(stdout);
    //     console.error(stderr);
    //
    //     active--;
    //   },
    // );
    // active++;
  });
}

function generateTestfile(
  lang: string,
  tests: z.infer<typeof jsonSchema>["tests"],
) {
  if (lang === "js") {
    return `const func = require("./submission")
${tests
        .map(
          (test, i) => `test("test_${i + 1}", () => {
  expect(func(${test.input.map((x) => (typeof x === "string" ? `"${x}"` : x)).join(", ")})).toBe(${typeof test.expected === "string" ? `"${test.expected}"` : test.expected})
})`,
        )
        .join("\n")}
`;
  } else if (lang === "py") {
    return `from submission import func
${tests
        .map(
          (test, i) => `def test_${i + 1}():
  assert func(${test.input.map((x) => (typeof x === "string" ? `"${x}"` : x)).join(", ")}) == ${test.expected}`,
        )
        .join("\n")}
`;
  } else {
    throw new Error("unsupported lang");
  }
}

function editSubmission(lang: string, submission: string) {
  const parser = new Parser();

  if (lang === "js") {
    parser.setLanguage(JavaScript);
    const tree = parser.parse(submission);

    const funcs = tree.rootNode.children.filter(
      (node) => node.type === "function_declaration",
    );

    if (funcs.length !== 1) {
      throw new Error("only 1 function allowed, found " + funcs.length);
    }

    const func = funcs[0];
    const name = func!.children.find((node) => node.type === "identifier")?.text;

    if (name === undefined) {
      throw new Error("function name not found");
    }

    // check if module.exports exists
    const moduleExports = tree.rootNode.children.find(
      (node) => node.type === "module_exports",
    );

    if (moduleExports === undefined) {
      return submission + "\nmodule.exports = " + name;
    }

    return submission;
  } else if (lang === "py") {
    parser.setLanguage(Python);
    const tree = parser.parse(submission);

    const funcs = tree.rootNode.children.filter(
      (node) => node.type === "function_definition",
    );

    if (funcs.length !== 1) {
      throw new Error("only 1 function allowed, found " + funcs.length);
    }

    const func = funcs[0];
    const ident = func!.children.find((node) => node.type === "identifier");
    const name = ident?.text;

    if (name === undefined) {
      throw new Error("function name not found");
    }

    submission = submission.slice(0, ident!.startIndex) + "func" + submission.slice(ident!.endIndex);

    return submission;
  } else {
    throw new Error("unsupported lang");
  }
}
