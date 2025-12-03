import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import csv
import datetime
import os

# 1. Setup Firebase Credentials
# You need to download a service account key from Firebase Console -> Project Settings -> Service Accounts
# Save it as 'serviceAccountKey.json' in this folder
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://pondyuni-bus-tracker-default-rtdb.firebaseio.com' # Replace if different
})

def export_data():
    print("Fetching data from Firebase...")
    ref = db.reference('history')
    data = ref.get()

    if not data:
        print("No history data found.")
        return

    csv_file = 'bus_data.csv'
    file_exists = os.path.isfile(csv_file)

    with open(csv_file, mode='a', newline='') as file:
        writer = csv.writer(file)
        
        # Write header if file is new
        if not file_exists:
            writer.writerow(['Date', 'VehicleID', 'Timestamp', 'Latitude', 'Longitude', 'Speed', 'Accuracy'])

        # Iterate through dates and vehicles
        for date_key, vehicles in data.items():
            for vehicle_id, logs in vehicles.items():
                for timestamp, log in logs.items():
                    writer.writerow([
                        date_key,
                        vehicle_id,
                        timestamp,
                        log.get('lat', ''),
                        log.get('lng', ''),
                        log.get('speed', 0),
                        log.get('accuracy', 0)
                    ])

    print(f"Data exported to {csv_file}")

    # Optional: Delete data after export
    confirm = input("Do you want to delete the exported data from Firebase? (yes/no): ")
    if confirm.lower() == 'yes':
        ref.delete()
        print("History data deleted from Firebase.")
    else:
        print("Data kept in Firebase.")

if __name__ == "__main__":
    if not os.path.exists("serviceAccountKey.json"):
        print("Error: serviceAccountKey.json not found. Please download it from Firebase Console.")
    else:
        export_data()
