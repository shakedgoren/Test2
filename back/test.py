import pandas as pd

df = pd.read_csv("alldiamonds.csv")

# The highest diamond price
max_value = df['price'].max()
print('The highest diamond price is:',max_value)

# The average price of a diamond
average_price = df['price'].mean()
print('The average price of a diamond is:',average_price)

# Number of Ideal diamonds
ideal_diamonds = df[df['cut'] == 'Ideal']
num_ideal_diamonds = len(ideal_diamonds)
print('Number of Ideal diamonds:',num_ideal_diamonds)

# The different colors
colors = df['color'].unique()
num_colors = len(colors)
print('Number of different colors:', num_colors, ', The colors:', colors)

# The median carat of premium diamonds
premium_diamonds = df[df['cut'] == 'Premium']
median_carat = premium_diamonds['carat'].median()
print('The median carat of premium diamonds:',median_carat)

# Average carat for each cut type
grouped_df = df.groupby(by="cut").mean()["carat"]
print('Average carat for each cut type:',grouped_df)

# price average for each color type
average_carat = df.groupby('color')['price'].mean()
print('price average for each color type:',average_carat)
