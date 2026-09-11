from flask import Flask, jsonify, send_from_directory

app = Flask(__name__)


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


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def home():

    return send_from_directory(
        ".",
        "index.html"
    )


# =========================================================
# BUSINESS API
# =========================================================

@app.route("/api/business")
def get_business():

    return jsonify(business)


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