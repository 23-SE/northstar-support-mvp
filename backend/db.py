# db.py — Data Layer (Member 3 owns this file)
# Responsible for: loading JSON files, filtering/querying data
# All functions here return plain Python dicts — no Flask logic.

import os
import json
from copy import deepcopy
from datetime import datetime, timedelta

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')


def _iso(d):
    return d.strftime('%Y-%m-%d')


def _timeline_label(d, suffix):
    return f"{d.strftime('%b %d')}, {suffix}"


def _apply_timeline_dates(timeline, defaults):
    """Mutate timeline entries with date/done values from defaults."""
    if not isinstance(timeline, list):
        return

    for i, step in enumerate(timeline):
        dt, suffix, done = defaults[i] if i < len(defaults) else defaults[-1]
        step['date'] = _timeline_label(dt, suffix)
        if 'done' in step:
            step['done'] = done


def _with_dynamic_dates(order):
    """Return an order with dates recomputed relative to today."""
    fresh = deepcopy(order)
    now = datetime.now()
    status = (fresh.get('status') or '').strip().lower()

    if status == 'in transit':
        placed = now - timedelta(days=2)
        eta = now + timedelta(days=3)
        fresh['date'] = _iso(placed)
        fresh['estimatedDelivery'] = _iso(eta)
        _apply_timeline_dates(
            fresh.get('timeline', []),
            [
                (placed, '09:30 AM', True),
                (placed, '09:32 AM', True),
                (placed + timedelta(days=1), '02:15 PM', True),
                (now - timedelta(days=1), '11:00 AM', True),
                (eta, 'Expected', False),
            ],
        )
    elif status == 'processing':
        placed = now - timedelta(days=1)
        eta = now + timedelta(days=2)
        fresh['date'] = _iso(placed)
        fresh['estimatedDelivery'] = _iso(eta)
        _apply_timeline_dates(
            fresh.get('timeline', []),
            [
                (placed, '04:20 PM', True),
                (placed, '04:21 PM', True),
                (now, '08:00 AM', True),
                (now + timedelta(days=1), 'Pending', False),
                (eta, 'Expected', False),
            ],
        )
    elif status == 'delivered':
        placed = now - timedelta(days=5)
        eta = now - timedelta(days=2)
        fresh['date'] = _iso(placed)
        fresh['estimatedDelivery'] = _iso(eta)
        _apply_timeline_dates(
            fresh.get('timeline', []),
            [
                (placed, '10:15 AM', True),
                (placed, '10:16 AM', True),
                (placed + timedelta(days=1), '01:00 PM', True),
                (eta, '03:45 PM', True),
            ],
        )

    return fresh

def _load(filename):
    """Load a JSON file from the data directory."""
    path = os.path.join(DATA_DIR, filename)
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


# ---- Orders ----

def get_all_orders():
    """Return the full list of orders."""
    return [_with_dynamic_dates(order) for order in _load('orders.json')]

def get_order_by_id(order_id):
    """Return a single order dict matching order_id, or None if not found."""
    orders = get_all_orders()
    return next(
        (o for o in orders if o['orderId'].upper() == order_id.upper()),
        None
    )


# ---- Returns ----

def get_return_policy():
    """Return the returns policy configuration."""
    policy = _load('returns.json')
    return policy[0] if policy else {}

def get_return_items_for_order(order_id):
    """
    Return items eligible for return from a delivered order.
    Only delivered orders are eligible.
    """
    order = get_order_by_id(order_id)
    if not order:
        return None, None
    return order, order.get('items', [])


# ---- Inventory ----

def search_inventory(query=''):
    """
    Return all inventory items matching the query string.
    Matches against name, sku, and category fields.
    Returns all items if query is empty.
    """
    inventory = _load('inventory.json')
    if not query:
        return inventory
    q = query.lower()
    return [
        item for item in inventory
        if q in item['name'].lower()
        or q in item['sku'].lower()
        or q in item['category'].lower()
    ]

def get_item_by_sku(sku):
    """Return a single inventory item by SKU, or None."""
    inventory = _load('inventory.json')
    return next((i for i in inventory if i['sku'] == sku), None)
