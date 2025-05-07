FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies (optional: curl, for debugging)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create directory for NLTK data and download it there
# Copy application files
RUN nltk.download("punkt")
RUN nltk.download("punk_tab")
RUN nltk.download("stopwords")
COPY . /app

# Expose the port the app runs on
EXPOSE 5001

# Command to run the application
CMD ["python", "app.py"]
