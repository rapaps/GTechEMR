# train_model_v2.py

import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("heart_disease_risk_mock_data_3000.csv")

# Encode gender (M/F)
le_gender = LabelEncoder()
df['gender'] = le_gender.fit_transform(df['gender'])

# Separate features and target
X = df.drop(columns='risk_level')
y = df['risk_level']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# Train model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Save model + encoder
with open("risk_model.pkl", "wb") as f:
    pickle.dump(clf, f)

with open("encoders.pkl", "wb") as f:
    pickle.dump(le_gender, f)

print("✅ Model trained and saved as risk_model.pkl")
