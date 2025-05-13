import os
import numpy as np
import tensorflow as tf
import io
import base64
from flask import Flask, render_template, request, url_for, flash
from PIL import Image
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'cardiomegaly_classifier_secret_key'
app.config['ALLOWED_EXTENSIONS'] = {'jpg', 'jpeg', 'png'}

# Load the model once
print("Loading model...")
model = tf.keras.models.load_model("best_model.keras")
print("Model loaded successfully!")

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/')
def index():
    example_image = url_for('static', filename='images/example_xray.jpg')
    return render_template('index.html', example_image=example_image)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        flash('No file part', 'error')
        return render_template('index.html')
    
    file = request.files['file']
    if file.filename == '':
        flash('No selected file', 'error')
        return render_template('index.html')
    
    if file and allowed_file(file.filename):
        # Process the image in memory without saving to disk
        image_bytes = file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        # Preprocess the image
        img_size = (224, 224)
        img_array = np.array(image.resize(img_size)) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Make prediction
        prediction = model.predict(img_array)[0][0]
        label = "Positive (Cardiomegaly)" if prediction >= 0.5 else "Negative (Normal)"
        confidence_pct = prediction * 100 if prediction >= 0.5 else (1 - prediction) * 100
        status_class = "danger" if prediction >= 0.5 else "success"
        
        # Convert image to base64 for display
        buffered = io.BytesIO()
        image.resize((400, 400), Image.Resampling.LANCZOS).save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        img_data_uri = f"data:image/jpeg;base64,{img_str}"
        
        return render_template('index.html', 
                              label=label, 
                              confidence=f"{confidence_pct:.2f}%",
                              image_data=img_data_uri,
                              status_class=status_class,
                              show_result=True)
    
    flash('Invalid file type. Please upload JPG, JPEG or PNG files.', 'error')
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)