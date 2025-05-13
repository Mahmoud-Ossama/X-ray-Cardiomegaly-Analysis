from setuptools import setup, find_packages

setup(
    name="cardiomegaly-classifier",
    version="1.0.0",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "Flask",
        "tensorflow",
        "numpy",
        "Pillow",
    ],
    author="AI College Bioinformatics Department",
    author_email="contact@example.com",
    description="A Flask web application that uses AI to detect Cardiomegaly in X-ray images",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Framework :: Flask",
        "Intended Audience :: Healthcare Industry",
        "Programming Language :: Python :: 3",
        "Topic :: Scientific/Engineering :: Medical Science Apps."
    ],
)
