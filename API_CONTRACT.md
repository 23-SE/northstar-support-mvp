# API Contract

Base URL: `http://127.0.0.1:5000`

Order Status and Returns are must-ship categories. Stock Check is bonus.

## 1) Health

### `GET /api/health`

200 response:

```json
{
  "status": "ok",
  "service": "northstar-support-mvp"
}
```

## 2) Order Status

### `GET /api/order/<order_id>`

200 response example (`/api/order/1001`):

```json
{
  "found": true,
  "order_id": "1001",
  "customer": "Jane Mwangi",
  "status": "shipped",
  "shipped_date": "2026-08-12",
  "eta": "2026-08-16",
  "carrier": "Sendy",
  "tracking": "SND-1001-KE"
}
```

404 response example (`/api/order/9999`):

```json
{
  "found": false,
  "message": "Order not found. Check the number and try again."
}
```

## 3) Returns & Refunds

### `GET /api/return/<order_id>`

200 response example (`/api/return/1001`):

```json
{
  "found": true,
  "order_id": "1001",
  "returnable": true,
  "window_days": 30,
  "days_left": 26,
  "refund_status": "not_started",
  "instructions": "Start your return from the returns portal and use the prepaid label within 30 days of delivery."
}
```

404 response example (`/api/return/9999`):

```json
{
  "found": false,
  "message": "No return info for that order."
}
```

## 4) Stock Check (Bonus)

### `GET /api/stock/<sku>`

200 response example (`/api/stock/SKU-TEE-BLK-M`):

```json
{
  "found": true,
  "sku": "SKU-TEE-BLK-M",
  "name": "Northstar Tee - Black - Medium",
  "in_stock": false,
  "quantity": 0,
  "restock_date": "2026-08-20",
  "alternatives": ["SKU-TEE-BLK-L", "SKU-TEE-NVY-M"]
}
```

404 response example (`/api/stock/SKU-UNKNOWN`):

```json
{
  "found": false,
  "message": "SKU not found."
}
```
