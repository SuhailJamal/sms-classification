FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies
# Install Python dependencies
COPY requirements.txt .
RUN pip install  -r requirements.txt

# Install NLTK data
RUN python -m nltk.downloader punkt stopwords

# Copy application files
COPY . /app

# Expose the port the app runs on
EXPOSE 5001

# Command to run the application
CMD ["python", "app.py"]
