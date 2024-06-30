from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

# Define the specific RGB triplets provided by the user
specific_colors = {
    'Red': [150, 0, 0],
    'Green': [0, 150, 0],
    'Blue': [0, 0, 150],
    'Beige': [245, 245, 220]
}

# Initialize color counts
color_counts = {color: 0 for color in specific_colors.keys()}

# Load the image and convert to numpy array
image_path = 'images/walker-2hours.png'
image = Image.open(image_path)
image_array = np.array(image)

# Function to check if two colors are the same
def colors_are_same(pixel, target_color, tolerance=10):
    return np.all(np.abs(pixel[:3] - target_color) <= tolerance)

# Flatten the image array for easier processing
flattened_image = image_array.reshape(-1, image_array.shape[2])

# Count pixels for each specific color
for pixel in flattened_image:
    for color, target_color in specific_colors.items():
        if colors_are_same(pixel, target_color):
            color_counts[color] += 1
            break

# Calculate total pixels
total_pixels = flattened_image.shape[0]

# Filter out colors with zero counts and calculate proportions
filtered_colors = {color: count for color, count in color_counts.items() if count > 0}
proportions = [count / total_pixels for count in filtered_colors.values()]

# Plot pie chart
fig, ax = plt.subplots()
ax.pie(proportions, labels=filtered_colors.keys(), colors=['#960000', '#009600', '#000096', '#f5f5dc'], autopct='%1.1f%%', startangle=90)
ax.axis('equal')
plt.title('Color Proportions in Image')
plt.show()
