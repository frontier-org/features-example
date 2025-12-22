import sys
import random
import datetime

print("--- SCRIPT (PYTHON) ---")
try:
    nome = sys.argv[1]
    print(f"Analise iniciada para: {nome}")
except:
    print("Analise anonima")

score = random.randint(0, 100)
print(f"Score de Credito Gerado: {score}")
print(f"Timestamp: {datetime.datetime.now()}")