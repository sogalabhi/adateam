# Layers

## Overview

This project is an innovative EdTech platform that allows learners to pay only for the content they want to access. With a flexible pay-per-video structure, we offer learners a distraction-free environment to learn at their own pace, on their own terms. This platform integrates various technologies to provide an efficient and user-friendly learning experience.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask
- **AI/ML**: NLTK (Natural Language Toolkit)
- **Database & Authentication**: Supabase (for storage, database, and authentication)

## Features

- **Pay-per-video Model**: Only pay for the content you want to access.
- **Distraction-Free Learning**: A separate app for learning to avoid distractions.
- **Affordable and Flexible**: Learn at your own pace without unnecessary subscriptions.
- **Database & Authentication**: Secure user authentication and data management using Supabase.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/edtech-platform.git
cd edtech-platform
```
### 2. For the backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask run
```

### 3. Frontend Setup (React)
```bash
cd frontend
npm i
npm start
```

### AI/ML Integration
This platform uses AI for content analysis and user experience enhancement:

1. NLTK: Utilized for Natural Language Processing tasks such as text tokenization, stemming, and analysis to improve content delivery.
2. OpenCV: Used for image and video processing to enhance multimedia content on the platform

### Database & Authentication
We use Supabase for:

1. Database: Storing user data, course content, and user progress.
2. Authentication: Secure user login and management.
3. Storage: Handling file storage for course content, videos, etc.
