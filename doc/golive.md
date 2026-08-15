Northstar Retail Co. — Support Deflection MVP

Go-Live Readiness Note

1. Purpose

The Northstar Support Deflection MVP is a self-service support solution designed to reduce manual handling of common customer enquiries. The MVP focuses on Order Status and Returns & Refunds as the two required support categories. Stock Check is included as a bonus category.

2. What Works

- Order Status: The MVP provides an Order Status endpoint at "/api/order/<id>" for retrieving order information.
- Returns & Refunds: The MVP provides a Returns endpoint at "/api/return/<id>" for retrieving return and refund information.
- Frontend: The application provides a tabbed interface for accessing the available support categories.
- Order Status interface: A valid order number can be entered to retrieve the corresponding order result and status.
- Returns interface: The frontend is connected to the Returns endpoint to retrieve return and refund information.
- Stock Check: The MVP includes a Stock Check endpoint at "/api/stock/<sku>" as a bonus feature.
- Data: The MVP uses mock JSON files for the demonstration scenarios.
- Documentation: The repository contains setup instructions and an API contract describing the available endpoints and expected responses.

3. Known Limitations

- The MVP uses mock JSON files rather than a live Northstar database or production system.
- The solution is an MVP/prototype, not a complete production deployment.
- Unknown order, return, or stock identifiers may return a 404 response.
- Requests outside the supported categories may require human support.
- Integration with Northstar's live systems, production security, monitoring, and operational support processes would be required before full production deployment.

### 4. Handoff Steps

1. Obtain access to the "northstar-support-mvp" repository.
2. Review the "README.md" and "API_CONTRACT.md" documentation.
3. Start the backend using the documented setup instructions.
4. Start the frontend using the documented instructions.
5. Open the application in a browser.
6. Test the Order Status and Returns & Refunds workflows using the available demonstration data.
7. Review the supported categories and known limitations.
8. Record any issues identified during the pilot and determine whether additional support categories are required.

### 5. Go-Live Recommendation

The Northstar Support Deflection MVP is suitable for a controlled MVP demonstration or pilot covering Order Status and Returns & Refunds. Before production use, Northstar should validate the workflows with its own data, integrate the solution with relevant live systems, and complete the necessary security, reliability, and operational testing.

### 6. Handover Items

The handover package includes the working MVP repository, "README.md", "API_CONTRACT.md", relevant project and audit records, and this Go-Live Readiness Note.
