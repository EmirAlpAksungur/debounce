import pandas as pd
import re

# Boş bir liste oluşturuyoruz
airport_data = []

# 'airports.txt' dosyasını açıp satır satır okuyacağız
with open('airports.txt', 'r') as file:
    for line in file:
        # Her bir satırdaki 'INSERT INTO' kısmını ve parantezleri çıkarmak için regex kullanıyoruz
        match = re.search(r"VALUES\s*\((.*?)\);", line)
        if match:
            # Satırdaki verileri virgül ile ayırıp liste haline getiriyoruz
            values = match.group(1).split(',')
            # Verilerdeki tırnak işaretlerini temizliyoruz ve boşlukları kırpıyoruz
            values = [v.strip().strip("'") for v in values]
            # Sadece name ve iata_code alanlarını çekiyoruz
            name, iata_code = values[0], values[1]
            airport_data.append([name, iata_code])

# Pandas DataFrame ile veriyi oluşturuyoruz
df = pd.DataFrame(airport_data, columns=['Name', 'IATA Code'])

# Excel dosyasına yazıyoruz
df.to_excel('airports.xlsx', index=False)