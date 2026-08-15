const API = "http://127.0.0.1:5000";

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("panel-" + tab.dataset.tab).classList.add("active");
  });
});

// Load deflection stats on page load
window.addEventListener('DOMContentLoaded', () => {
  loadDeflectionStats();
});

async function loadDeflectionStats() {
  try {
    const res = await fetch(`${API}/api/deflection-stats`);
    if (res.ok) {
      const data = await res.json();
      const banner = document.getElementById('deflection-banner');
      if (banner && data.message) {
        banner.textContent = data.message;
      }
    }
  } catch (e) {
    // Fail silently
  }
}

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
    const { ok, data } = await getJSON(`${API}/api/orders/${id}`);
    if (!ok || !data.success) {
      return errorCard("order-result", data.error || "Order not found. Check the number and try again.");
    }

    const order = data.order;
    const badge = order.status === "Delivered" ? "ok" : order.status === "Processing" ? "warn" : "warn";
    const itemsList = order.items?.map(i => `${i.name} (${i.size || 'Standard'}) × ${i.qty}`).join(', ') || '-';
    
    show(
      "order-result",
      `<div class="card">
        <h3>Order ${order.orderId} <span class="badge ${badge}">${order.status}</span></h3>
        <p><span class="k">Customer:</span> ${order.customer}<br>
        <span class="k">Items:</span> ${itemsList}<br>
        <span class="k">Carrier:</span> ${order.carrier}<br>
        <span class="k">Tracking:</span> ${order.trackingNumber}<br>
        <span class="k">Est. Delivery:</span> ${order.estimatedDelivery}</p>
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
    const { ok, data } = await getJSON(`${API}/api/returns/${id}`);
    if (!ok || !data.success) {
      return errorCard("return-result", data.error || "No return info for that order.");
    }

    const itemsList = data.items?.map(i => `${i.name}`).join(', ') || 'N/A';
    const badge = data.items && data.items.length > 0 ? "ok" : "warn";
    
    show(
      "return-result",
      `<div class="card">
        <h3>Order ${data.orderId} <span class="badge ${badge}">${data.items?.length ? "Returnable" : "Policy Info"}</span></h3>
        <p><span class="k">Customer:</span> ${data.customer}<br>
        <span class="k">Eligible Items:</span> ${itemsList}<br>
        <span class="k">Return Window:</span> ${data.policyDays} days<br>
        <span class="k">Prepaid Label:</span> ${data.prepaidLabel ? 'Yes' : 'No'}</p>
      </div>`
    );
  } catch (e) {
    errorCard("return-result", "Can't reach the server. Is the backend running on port 5000?");
  }
}

async function lookupStock() {
  const query = document.getElementById("stock-input").value.trim();
  if (!query) return;
  loading("stock-result");

  try {
    const { ok, data } = await getJSON(`${API}/api/inventory?q=${encodeURIComponent(query)}`);
    if (!ok || !data.success) {
      return errorCard("stock-result", data.error || "No products found.");
    }

    const results = data.results;
    if (!results || results.length === 0) {
      return errorCard("stock-result", "No products match your search.");
    }

    const cardsHTML = results
      .map(item => {
        const badge = item.inStock ? "ok" : "warn";
        const restockInfo = !item.inStock && item.nextRestockDate
          ? `<p><span class="k">Restock:</span> ${item.nextRestockDate}</p>`
          : '';
        return `<div class="card">
          <h3>${item.name} <span class="badge ${badge}">${item.inStock ? "in stock" : "out of stock"}</span></h3>
          <p><span class="k">SKU:</span> ${item.sku}<br>
          <span class="k">Price:</span> ${item.price}<br>
          <span class="k">Stock:</span> ${item.stockCount} units</p>
          ${restockInfo}
        </div>`;
      })
      .join('');

    show("stock-result", cardsHTML);
  } catch (e) {
    errorCard("stock-result", "Can't reach the server. Is the backend running on port 5000?");
  }
}
