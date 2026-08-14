const API = "http://127.0.0.1:5000";

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("panel-" + tab.dataset.tab).classList.add("active");
  });
});

function show(id, html) {
  document.getElementById(id).innerHTML = html;
}

function loading(id) {
  show(id, '<div class="card">Checking...</div>');
}

function errorCard(id, msg) {
  show(id, `<div class="card"><span class="badge err">Not found</span><p>${msg}</p></div>`);
}

async function getJSON(url) {
  const res = await fetch(url);
  const data = await res.json();
  return { ok: res.ok, data };
}

async function lookupOrder() {
  const id = document.getElementById("order-input").value.trim();
  if (!id) return;
  loading("order-result");

  try {
    const { ok, data } = await getJSON(`${API}/api/order/${id}`);
    if (!ok || !data.found) {
      return errorCard("order-result", data.message || "Order not found. Check the number and try again.");
    }

    const badge = data.status === "delivered" ? "ok" : data.status === "cancelled" ? "err" : "warn";
    show(
      "order-result",
      `<div class="card">
        <h3>Order ${data.order_id} <span class="badge ${badge}">${data.status}</span></h3>
        <p><span class="k">ETA:</span> ${data.eta || "-"}<br>
        <span class="k">Shipped:</span> ${data.shipped_date || "not yet"}<br>
        <span class="k">Carrier:</span> ${data.carrier || "-"} ${data.tracking ? `(${data.tracking})` : ""}</p>
      </div>`
    );
  } catch (e) {
    errorCard("order-result", "Can't reach the server. Is the backend running on port 5000?");
  }
}

async function lookupReturn() {
  const id = document.getElementById("return-input").value.trim();
  if (!id) return;
  loading("return-result");

  try {
    const { ok, data } = await getJSON(`${API}/api/return/${id}`);
    if (!ok || !data.found) {
      return errorCard("return-result", data.message || "No return info for that order.");
    }

    const badge = data.returnable ? "ok" : "err";
    show(
      "return-result",
      `<div class="card">
        <h3>Order ${data.order_id} <span class="badge ${badge}">${data.returnable ? "returnable" : "not returnable"}</span></h3>
        <p><span class="k">Window:</span> ${data.window_days} days (${data.days_left} left)<br>
        <span class="k">Refund:</span> ${data.refund_status}</p>
        <p>${data.instructions}</p>
      </div>`
    );
  } catch (e) {
    errorCard("return-result", "Can't reach the server. Is the backend running on port 5000?");
  }
}

async function lookupStock() {
  const sku = document.getElementById("stock-input").value.trim();
  if (!sku) return;
  loading("stock-result");

  try {
    const { ok, data } = await getJSON(`${API}/api/stock/${sku}`);
    if (!ok || !data.found) {
      return errorCard("stock-result", data.message || "SKU not found.");
    }

    const badge = data.in_stock ? "ok" : "warn";
    const alternatives = data.alternatives?.length
      ? `<p><span class="k">Alternatives:</span> ${data.alternatives.join(", ")}</p>`
      : "";

    show(
      "stock-result",
      `<div class="card">
        <h3>${data.name} <span class="badge ${badge}">${data.in_stock ? "in stock" : "out of stock"}</span></h3>
        <p><span class="k">Quantity:</span> ${data.quantity}<br>
        ${data.restock_date ? `<span class="k">Restock:</span> ${data.restock_date}` : ""}</p>
        ${alternatives}
      </div>`
    );
  } catch (e) {
    errorCard("stock-result", "Can't reach the server. Is the backend running on port 5000?");
  }
}
