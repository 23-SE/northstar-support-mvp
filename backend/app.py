from pathlib import Path
import json

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATA_DIR = Path(__file__).resolve().parent / "data"


def load(name: str):
    with open(DATA_DIR / name, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "service": "northstar-support-mvp"})


@app.get("/api/order/<order_id>")
def get_order(order_id: str):
    orders = load("orders.json")
    order = orders.get(order_id)
    if order:
        return jsonify({"found": True, **order})
    return (
        jsonify(
            {
                "found": False,
                "message": "Order not found. Check the number and try again.",
            }
        ),
        404,
    )


@app.get("/api/return/<order_id>")
def get_return(order_id: str):
    # TODO (OWNER: Grace)
    return jsonify({"found": False, "message": "Not implemented yet"}), 501


@app.get("/api/stock/<sku>")
def get_stock(sku: str):
    # TODO (OWNER: Kelly)
    return jsonify({"found": False, "message": "Not implemented yet"}), 501


if __name__ == "__main__":
    app.run(port=5000, debug=True)
