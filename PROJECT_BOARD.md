# Project Board — Northstar Support Deflection MVP

Board columns: **To Do → In Progress → Done**. Move each card the **same day** you work on it.
Priority: 🔴 High (must-ship) · 🟡 Medium · 🟢 Low (bonus/nice-to-have).
Every task is scoped to **≤ 4 hours** with a single checkable Definition of Done.

| # | Task | Owner | Priority | Est. | Definition of Done (single checkable sentence) |
|---|------|-------|----------|------|-------------------------------------------------|
| 1 | Repo scaffold + folder structure | Alex | 🔴 High | 1h | Repo has `backend/` + `frontend/` + docs and pushes to `main` cleanly. |
| 2 | Order Status endpoint (`/api/orders/<id>`) | Grace | 🔴 High | 2h | Returns correct JSON for orders 1001–1004 and 404 for unknown IDs. |
| 3 | Returns endpoint (`/api/returns/<id>`) | Grace | 🔴 High | 3h | Returns refund/return JSON per `API_CONTRACT.md` and 404 for unknown IDs. |
| 4 | Mock data files (orders/returns/inventory) | Gilton | 🔴 High | 2h | All three JSON files parse without error and cover the demo cases. |
| 5 | Stock endpoint (`/api/inventory/<sku>`) | Kelly | 🟢 Low | 3h | Returns stock JSON incl. alternatives for out-of-stock SKUs; 404 for unknown SKU. |
| 6 | Frontend shell + tab navigation | Alex | 🔴 High | 2h | Three tabs render and switch panels correctly in the browser. |
| 7 | Frontend: Order Status wiring | Alex | 🔴 High | 1h | Entering a valid order number renders a result card with status badge. |
| 8 | Frontend: Returns wiring | Alex | 🔴 High | 1h | Returns tab renders refund info from the live endpoint. |
| 9 | Frontend: Stock wiring | Kelly | 🟢 Low | 1h | Stock tab renders availability + alternatives from the live endpoint. |
| 10 | API contract document | Alex | 🟡 Medium | 1h | `API_CONTRACT.md` lists all 3 endpoints with example 200/404 bodies. |
| 11 | End-to-end test pass (2+ categories) | Veronica | 🔴 High | 2h | Order + Returns flows verified working; results logged in a test note. |
| 12 | Go-Live Readiness Note (1 page) | Veronica | 🔴 High | 3h | One page covering what works / known-broken / handoff steps for Northstar. |
| 13 | README run instructions | Alex | 🟡 Medium | 1h | A new user can run backend + frontend by following the README only. |
| 14 | Team Charter signed by all | All | 🔴 High | 1h | All 5 members have signed/✅ the charter. |
| 15 | Audit log export + demo capture | Alex | 🔴 High | 2h | Commit history + board timestamps exported and a short demo recorded. |

## Must-ship vs bonus
- **Must ship (≥2 categories):** Order Status (2,7) + Returns (3,8). Protect these first.
- **Bonus:** Stock (5,9) --> cut without guilt if time runs short.

## Notes for the audit trail
- Sequencing tip: merge Grace's Returns PR before Kelly's Stock PR (both touch `app.py`).
- Each card should show at least one linked commit for traceability.
