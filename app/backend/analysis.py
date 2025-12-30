import sys
import random
import datetime

print("--- SCRIPT (PYTHON) ---")
try:
    name = sys.argv[1]
    print(f"Analysis started for: {name}")
except:
    print("Anonymous analysis")

credit_score = random.randint(0, 100)
print(f"Generated Credit Score: {credit_score}")
print(f"Timestamp: {datetime.datetime.now()}")
