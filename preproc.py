import pandas as pd
cleaned = pd.read_csv('data/CleanedData.csv')
all_country = pd.read_csv('data/countries.csv')
out_df = cleaned.join(all_country.set_index('COUNTRY'), on='Country_Name', how='inner')
out_df = out_df[['Year', 'Country_Name', 'Total_Medals', 'Gold','Silver', 'Bronze', 'HDI', 'Continent', 'longitude', 'latitude']]
out_df.to_csv('data/sicong_data.csv', index=False)
