# Cardiomegaly X-ray Classifier

![image](https://github.com/user-attachments/assets/c897bb4e-dc9e-4d80-b159-0760a65ca12e)
![image](https://github.com/user-attachments/assets/3f04b19f-6e1a-49c2-9e51-259b12626594)


A professional web application that uses artificial intelligence to analyze chest X-ray images and detect signs of cardiomegaly (enlarged heart).

## Features

- Upload and analyze chest X-ray images
- AI-powered detection of cardiomegaly
- Clean, professional UI with light/dark mode
- Responsive design works on desktop and mobile
- Interactive image preview before submission
- Real-time results with confidence scores
- Educational information about cardiomegaly

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5
- **AI/ML**: TensorFlow, Keras
- **Image Processing**: Pillow

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd App2
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install required packages:
   ```
   pip install -r requirements.txt
   ```

4. Make sure you have the model file:
   - Place your trained model `best_model.keras` in the project root directory

## Usage

1. Start the application:
   ```
   python app.py
   ```

2. Open your web browser and navigate to:
   ```
   http://localhost:5000
   ```

3. Upload a chest X-ray image to analyze it for signs of cardiomegaly

## Development

- The application uses Flask for the backend
- Bootstrap 5 is used for responsive UI components
- Custom CSS provides theming and dark mode support
- JavaScript provides interactivity and image preview

## License

This project is created for educational and research purposes.

## Disclaimer

This application is not certified for clinical use. Always consult with qualified healthcare professionals for medical advice and diagnosis.
