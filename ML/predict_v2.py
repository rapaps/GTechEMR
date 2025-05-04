# predict_v2.py

import pickle
import json
import sys
import os
import warnings
warnings.filterwarnings("ignore")

# Ensure relative model path
base_dir = os.path.dirname(os.path.abspath(__file__))

# Load model and encoder
with open(os.path.join(base_dir, "risk_model.pkl"), "rb") as f:
    model = pickle.load(f)

with open(os.path.join(base_dir, "encoders.pkl"), "rb") as f:
    le_gender = pickle.load(f)

def predict_risk(data):
    try:
        data['gender'] = le_gender.transform([data['gender'].strip().upper()])[0]
    except:
        data['gender'] = 0  # fallback

    X = [[
        data['age'],
        data['gender'],
        data['has_diabetes'],
        data['has_hypertension'],
        data['family_history'],
        data['is_smoker']
    ]]

    return str(model.predict(X)[0])

if __name__ == "__main__":
    try:
        # Read from stdin or from input JSON file
        input_data = sys.stdin.read()
        patient_data = json.loads(input_data)

        # Check if sufficient fields are provided
        required = ['age', 'gender', 'has_diabetes', 'has_hypertension', 'family_history', 'is_smoker']
        if not all(k in patient_data for k in required):
            print("❌ Insufficient data for prediction")
        else:
            result = predict_risk(patient_data)
            print("Predicted Risk Level:", result)

    except Exception as e:
        print("❌ Prediction error:", str(e))
