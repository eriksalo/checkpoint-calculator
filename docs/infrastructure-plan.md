# Checkpoint Calculator Infrastructure Plan

## 1. Repository layout (GitHub)
- Repo: `github.com/eriksalo/checkpoint-calculator` (public recommended for Amplify preview builds).
- Branch strategy: `main` as deployable branch, feature branches via PR.
- CI: `.github/workflows/ci.yml` runs lint, build, and Playwright to gate merges.
- Secrets: store AWS Amplify access token (`AMPLIFY_ACCESS_TOKEN`) in repo secrets when connecting CI triggered previews.

## 2. Frontend stack
- React 18 + Vite + TypeScript for fast dev & bundle.
- TailwindCSS + custom tokens approximating vdura.com aesthetic (deep midnight background, aurora cyan accents, glassmorphism).
- Framer Motion animates checkpoint flow; Zustand handles state.
- Amplify JS handles future auth/API integrations. `src/aws-exports.js` is generated via `amplify init/pull` and is tracked so the frontend runs without manual steps.

### Local development
```bash
npm install
npm run dev
```
Vite dev server proxies will be added as Amplify features (AppSync, APIs) come online.

## 3. AWS Amplify setup
- Current app ID: `d9k1jcu79liuq` with default environment `stage` (stack `amplify-checkpointcalc-stage-dd1d8`).
- Generated IAM roles/bucket are named `amplify-checkpointcalc-stage-dd1d8-*`; rotate or lock down temporary credentials used during setup.

1. **Provision Amplify app**
   - Navigate to Amplify console → New app → Host web app.
   - Connect GitHub account `eriksalo`. Choose repo and branch `main`.
   - Amplify auto-generates build pipeline.

2. **Amplify build settings**
   - Root directory: `/` (Vite project at repo root).
   - Build command: `npm ci && npm run build`.
   - Output directory: `dist`.
   - Add environment variables:
     - `VITE_APP_STAGE`: `prod`/`staging` as needed.
     - `AMPLIFY_MONOREPO_APP_ROOT`: leave blank (single app).

3. **Custom domains**
   - Once vdura.com DNS hosted in Route53/other provider, add subdomain `calc.vdura.com` or similar.
   - Update DNS CNAME to Amplify provided target.

4. **Branch previews**
   - Enable preview builds for PR branches to collaborate.

## 4. Amplify backend services roadmap
- **Authentication (optional)**: `amplify add auth` to secure advanced calculators. Choose email-first with hosted UI themed to vdura palette.
- **API + storage**:
  - `amplify add api` (GraphQL) for persisting workload presets. Model `WorkloadPreset` with nodes, intervals, storageTier.
  - `amplify add storage` (S3) if exporting visualization artifacts.
- After configuration, run `amplify push`. Commit the generated `amplify/` directory and updated `src/aws-exports.js` (keep secrets out of git).

## 5. GitHub Actions → Amplify integration (optional enhancement)
- Add workflow that triggers Amplify deployments via `amplify-hosting-deploy` action when CI passes.
- Requires secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` with restricted policy (`AmplifyBackendDeploy` + `amplify:StartDeployment`).
- Example job snippet:
```yaml
- name: Deploy to Amplify
  uses: aws-actions/amazon-ecs-deploy-task-definition@v1
  if: github.ref == 'refs/heads/main'
  with:
    app-id: ${{ secrets.AMPLIFY_APP_ID }}
    branch-name: main
```
  *(Replace action with official Amplify deploy action once provisioned.)*

## 6. Monitoring & ops
- Enable Amplify access logs + CloudWatch metrics for request latency.
- Configure performance alerts (95th percentile > target) -> SNS.
- Add uptime checks via Route53 health checks or external service.

## 7. Next steps
1. Receive brand guidelines from vdura.com to finalize Tailwind tokens and typography.
2. Use the existing Amplify app (`AppId d9k1jcu79liuq`, env `stage`). Team members can run `npx @aws-amplify/cli pull --appId d9k1jcu79liuq --envName stage --yes` after authenticating to sync `amplify/` and regenerate `src/aws-exports.js`.
3. Build Playwright smoke test covering a sample interaction (dragging sliders, verifying output text).
4. Add README onboarding (dev setup, amplify deployment instructions).
