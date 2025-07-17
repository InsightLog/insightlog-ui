import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

const CodeBlock = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative bg-gray-900 text-white p-4 rounded-lg font-mono text-sm border border-white/10">
            <pre className="whitespace-pre-wrap break-words">{code}</pre>
            <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 bg-gray-700 p-1 rounded hover:bg-gray-600"
            >
                {copied ? (
                    <CheckIcon className="h-4 w-4 text-green-400" />
                ) : (
                    <ClipboardIcon className="h-4 w-4 text-gray-300" />
                )}
            </button>
        </div>
    );
};

export default function CLIPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen w-full bg-[#141322] text-white px-4 py-8 sm:px-10 mx-auto"
        >
            <h1 className="text-3xl font-bold mb-4">🧠 InsightLog CLI</h1>
            <p className="text-gray-400 mb-8">
                A simple command-line interface (CLI) to post developer logs to InsightLog — directly from your terminal.
            </p>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">📦 Installation</h2>
                <p className="text-gray-400 mb-2">Requires Node.js v18+</p>
                <CodeBlock code="npm install -g insightlog-cli" />
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">🔐 Login</h2>
                <p className="text-gray-400 mb-2">
                    Prompts for your email and password and saves session info to <code>.insightlogrc</code>.
                </p>
                <CodeBlock code="insightlog login" />
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">📝 Post a Log</h2>
                <p className="text-gray-400 mb-2">
                    Prompts for title, opens default editor for content, and lets you add tags.
                </p>
                <CodeBlock code="insightlog post" />
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">🔒 Logout</h2>
                <p className="text-gray-400 mb-2">Clears saved token and config.</p>
                <CodeBlock code="insightlog logout" />
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">📁 Local Config</h2>
                <p className="text-gray-400 mb-2">
                    Session saved at <code>~/.insightlogrc</code>
                </p>
                <CodeBlock
                    code={`{
  "token": "JWT_TOKEN",
  "authorId": "user-uuid",
  "teamId": "team-uuid"
}`}
                />
            </section>

            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">🛠 Developer Usage</h2>
                <CodeBlock
                    code={`git clone https://github.com/InsightLog/insightlog-cli.git
cd insightlog-cli
npm install
node bin/index.js`}
                />
            </section>

            <footer className="text-xs text-gray-500 mt-10 border-t border-white/10 pt-6">
                MIT License © Sushil R — <a href="https://github.com/InsightLog" className="text-purple-400 hover:underline">GitHub</a>
            </footer>
        </motion.div>
    );
}
