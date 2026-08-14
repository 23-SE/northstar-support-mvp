# Northstar Support Deflection MVP

Self-service support deflection for order status and returns, with stock check as a bonus category.

## Stack

- Backend: Flask + flask-cors
- Frontend: Vanilla HTML/CSS/JavaScript
- Data: Mock JSON files (no database)

## Run Locally

1. Start the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```
2. Start the frontend in a second terminal:
   ```bash
   cd frontend
   python -m http.server 8000
   ```
3. Open http://127.0.0.1:8000

## Categories And Owners

| Category | Owner |
| --- | --- |
| Order Status | Alex |
| Returns & Refunds | Grace |
| Stock Check (Bonus) | Kelly |

## Commit Convention

Use this format:

`<type>: <what changed> - <why it matters>`

Avoid vague messages like "wip" or "updates".
