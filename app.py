from datetime import datetime, timezone
from pathlib import Path
import sqlite3

from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__)
BASE_DIR = Path(__file__).resolve().parent
DATABASE_PATH = BASE_DIR / "pentecost.db"


# =========================================================
# BUSINESS INFORMATION
# =========================================================

business = {

    "name": "Pentecost Global Service",

    "phone": "09069739190",

    "email": "Populardivine2000@gmail.com",

    "address":
        "Shop A64, Ejison Plaza, New Market Road, "
        "Onitsha Main Market",

    "specialties": [
        "iPhone",
        "Samsung",
        "Mobile Phones",
        "Phone Accessories"
    ]

}


products = [
    {
        "id": "iphone-series",
        "brand": "Apple",
        "name": "iPhone Series",
        "category": "iphone",
        "description": "Premium iPhone devices available in different models and storage options.",
    },
    {
        "id": "samsung-galaxy",
        "brand": "Samsung",
        "name": "Samsung Galaxy",
        "category": "samsung",
        "description": "Samsung Galaxy smartphones for work, entertainment and everyday use.",
    },
    {
        "id": "iphone-pro",
        "brand": "Premium",
        "name": "iPhone Pro",
        "category": "iphone",
        "description": "Premium iPhone Pro models with advanced features.",
    },
    {
        "id": "galaxy-series",
        "brand": "Samsung",
        "name": "Galaxy Series",
        "category": "samsung",
        "description": "Galaxy smartphones available across different price ranges.",
    },
    {
        "id": "chargers-cables",
        "brand": "Accessories",
        "name": "Chargers & Cables",
        "category": "accessories",
        "description": "Quality charging cables and chargers for mobile devices.",
    },
    {
        "id": "phone-cases",
        "brand": "Accessories",
        "name": "Phone Cases",
        "category": "accessories",
        "description": "Protective phone cases and useful accessories for different devices.",
    },
]


services = [
    {
        "id": "phone-sales",
        "name": "Phone Sales",
        "description": "We deal in iPhone, Samsung and other popular smartphone brands.",
    },
    {
        "id": "phone-accessories",
        "name": "Phone Accessories",
        "description": "Get chargers, cables, phone cases and other mobile accessories.",
    },
    {
        "id": "customer-enquiries",
        "name": "Customer Enquiries",
        "description": "Contact us to check availability, models and current prices.",
    },
]


def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialise_database():
    with get_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS enquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )


initialise_database()


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/<path:filename>")
def assets(filename):
    if filename.startswith("api/"):
        return jsonify({"error": "Not found"}), 404
    return send_from_directory(BASE_DIR, filename)


# =========================================================
# BUSINESS API
# =========================================================

@app.route("/api/business")
def get_business():
    return jsonify(business)


@app.route("/api/products")
def get_products():
    category = request.args.get("category", "all").strip().lower()
    valid_categories = {"all", "iphone", "samsung", "accessories"}

    if category not in valid_categories:
        return jsonify({"error": "Invalid category"}), 400

    matching_products = [
        product for product in products
        if category == "all" or product["category"] == category
    ]
    return jsonify(matching_products)


@app.route("/api/services")
def get_services():
    return jsonify(services)


@app.route("/api/enquiries", methods=["POST"])
def create_enquiry():
    payload = request.get_json(silent=True) or {}
    name = str(payload.get("name", "")).strip()
    phone = str(payload.get("phone", "")).strip()
    message = str(payload.get("message", "")).strip()

    if not name or not phone or not message:
        return jsonify({
            "error": "name, phone and message are required"
        }), 400

    if len(name) > 100 or len(phone) > 30 or len(message) > 2000:
        return jsonify({"error": "One or more fields are too long"}), 400

    created_at = datetime.now(timezone.utc).isoformat()
    with get_connection() as connection:
        cursor = connection.execute(
            """
            INSERT INTO enquiries (name, phone, message, created_at)
            VALUES (?, ?, ?, ?)
            """,
            (name, phone, message, created_at),
        )

    return jsonify({
        "message": "Your enquiry has been received",
        "enquiry_id": cursor.lastrowid,
    }), 201


# =========================================================
# HEALTH CHECK
# =========================================================

@app.route("/api/status")
def status():

    return jsonify({
        "status": "online",
        "business": "Pentecost Global Service"
    })


# =========================================================
# RUN SERVER
# =========================================================

if __name__ == "__main__":

    app.run(
        debug=True,
        host="127.0.0.1",
        port=5000
    )