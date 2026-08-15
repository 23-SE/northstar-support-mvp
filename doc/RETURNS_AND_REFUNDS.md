RTN-001
Test: Check return eligibility for valid order
Request: GET /api/returns/ORD-1001
Expected: 200 OK with order and return-policy information
Actual: 200 OK with order and return-policy information
Result: PASS
RTN-002 — Non-existent order
Request: GET /api/returns/DOES-NOT-EXIST
Expected: 404 Not Found with an appropriate error message
Actual: 404 Not Found with "Order 'DOES-NOT-EXIST' not found."
Result: PASS
RTN-003 — Generate return slip
Request: POST /api/returns/generate-slip

Input:
{
  "orderId": "ORD-1001",
  "itemName": "Ultra-Fit Running Shoes"
}

Expected:
200 OK with RMA code and return instructions

Actual:
200 OK
RMA code generated: RMA-59365-RET
Carrier: FedEx Parcel Return
Return instructions returned successfully

Result: PASS
RTN-004 — Missing orderId
Request: POST /api/returns/generate-slip

Input:
{
  "itemName": "Ultra-Fit Running Shoes"
}

Expected:
Request rejected because orderId is required.

Actual:
200 OK. The API accepted the request with an empty orderId and generated RMA-90448-RET.

Result: FAIL
Finding: Missing orderId validation is not currently enforced.
RTN-005 — Missing itemName
Request: POST /api/returns/generate-slip

Input:
{
  "orderId": "ORD-1001"
}

Expected:
Request rejected because itemName is required.

Actual:
200 OK. The API accepted the request with an empty itemName and generated an RMA.

Result: FAIL

Finding:
Missing itemName validation is not currently enforced.
RTN-006 — Empty request body
Request: POST /api/returns/generate-slip

Input:
{}

Expected:
Request rejected because orderId and itemName are required.

Actual:
200 OK. The API accepted the empty request and generated RMA-00000-RET with empty orderId and itemName.

Result: FAIL

Finding:
The generate-slip endpoint does not currently validate required request fields.