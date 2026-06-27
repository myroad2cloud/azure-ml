import os
import pickle
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

iris = load_iris()
x_train, x_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(x_train, y_train)
accuracy = accuracy_score(y_test, model.predict(x_test))
print(f"accuracy={accuracy}")
os.makedirs("outputs", exist_ok=True)
with open("outputs/model.pkl", "wb") as f:
    pickle.dump(model, f)
