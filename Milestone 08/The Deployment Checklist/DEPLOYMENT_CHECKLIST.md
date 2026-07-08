# Deployment Checklist

**Application:** LaunchPad  
**Platform:** Render (or Railway)  
**Live URL:** https://muraai-contract-remainder.onrender.com  
**Checklist completed:** 08-07-2026
**Engineer:** Abhishek B K

---

| # | Item | Status | Evidence |
|---|------|:------:|----------|
| 01 | Environment variables configured on platform | ✅ PASS | `screenshots/01-env-vars-platform.png` |
| 02 | Build passes locally | ✅ PASS | `screenshots/02-local-build.png` |
| 03 | Build passes in CI | ✅ PASS / ⏭️ SKIP | `screenshots/03-ci-build.png` or GitHub Actions URL |
| 04 | Database migrations executed | ✅ PASS | `screenshots/04-migration-log.png` |
| 05 | CORS verified | ✅ PASS | `screenshots/05-cors-network-tab.png` |
| 06 | API base URL correct in production | ✅ PASS | `screenshots/06-api-url.png` |
| 07 | Authentication flow tested in production | ✅ PASS | `screenshots/07-auth-production.png` |
| 08 | Health endpoint responding | ✅ PASS | `screenshots/08-health-endpoint.png` |
| 09 | No secrets committed to Git | ✅ PASS | `screenshots/09-no-secrets-git.png` |
| 10 | `.env.example` committed | ✅ PASS | `screenshots/10-env-example.png` |
| 11 | Node version pinned | ✅ PASS | `screenshots/11-node-version.png` |
| 12 | Docker image builds locally | ⏭️ SKIP / ✅ PASS | `screenshots/12-docker-build.png` (if applicable) |

---

## Follow-up Tasks

> Add only the items that actually failed during your deployment.

- [ ] Item 05: Update `CORS_ORIGIN` on the deployment platform if requests from the production frontend are blocked.
- [ ] Item 08: Add a `/health` endpoint if it does not exist and redeploy.
- [ ] Item 11: Add the `engines` field to `package.json` if the Node.js version is not pinned.

---

## Skip Justifications

- **Item 12:** Docker was not used for deployment. The application was deployed directly from GitHub to Render/Railway, which manages the build environment automatically.