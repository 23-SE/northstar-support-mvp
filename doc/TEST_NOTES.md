# Test Notes — Northstar Support MVP

End-to-end test pass covering Order Status, Returns, and Stock Check flows, run against the live backend + frontend (localhost).

## Order Status
- Input: `ORD-1001`
- Result: ✅ Worked — returned the order and timeline as expected.
- Endpoint hit: `/api/orders/ORD-1001` → 200

## Returns
- Input: `ORD-1001`
- Result: ✅ Worked — returned the correct returnable items.
- Endpoint hit: `/api/returns/ORD-1001` → 200

## Stock Check
- Input: `Shoe`
- Result: ✅ Worked — returned matching product (Ultra-Fit Running Shoes, SKU-SHOE-01, in stock, 42 units).
- Endpoint hit: `/api/inventory?q=Shoe` → 200

## Endpoint correction
`PROJECT_BOARD.md` (and the go-live note) currently list the old endpoint paths:
- `/api/order/<id>` → should be `/api/orders/<id>`
- `/api/return/<id>` → should be `/api/returns/<id>`
- `/api/stock/<sku>` → should be `/api/inventory`

Confirmed via browser Network tab that the frontend actually calls the corrected paths above, all returning 200.

## Summary
All three core flows (Order Status, Returns, Stock Check) work end-to-end against the live backend. No breakages found. Endpoint documentation has been corrected to match the real API paths.