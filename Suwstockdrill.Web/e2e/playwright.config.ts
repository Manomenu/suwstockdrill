import { defineConfig } from "@playwright/test";
import { e2eTests } from "@maniumek/suwgate/playwright";

const SERVER_PORT = Number(process.env["E2E_SERVER_PORT"] ?? 6341);
const WEB_PORT = Number(process.env["E2E_WEB_PORT"] ?? 3341);
const DATABASE = process.env["E2E_DATABASE"] ?? "suwstockdrill_e2e";

export default defineConfig(
    e2eTests({
        outputDir: "../../.artifacts/e2e/test-results",
        use: { baseURL: `http://127.0.0.1:${WEB_PORT}` },
        webServer: [
            {
                command: "dotnet run --project Suwstockdrill.Server --no-build --no-launch-profile > .artifacts/logs/e2e-server.jsonl 2>&1",
                cwd: "../..",
                url: `http://127.0.0.1:${SERVER_PORT}/api/health`,
                env: {
                    ASPNETCORE_URLS: `http://127.0.0.1:${SERVER_PORT}`,
                    ConnectionStrings__Default:
                        process.env["E2E_CONNECTION_STRING"] ??
                        `Host=127.0.0.1;Port=5573;Database=${DATABASE};Username=suwstockdrill;Password=suwstockdrill`,
                },
                reuseExistingServer: false,
                timeout: 60_000,
            },
            {
                command: `pnpm exec vite --host 127.0.0.1 --port ${WEB_PORT} --strictPort`,
                cwd: "..",
                url: `http://127.0.0.1:${WEB_PORT}`,
                env: { API_PROXY_TARGET: `http://127.0.0.1:${SERVER_PORT}` },
                reuseExistingServer: false,
                timeout: 60_000,
            },
        ],
    }),
);
