
# Emergency and Mental Well-being Project

## Description

The **Emergency and Mental Well-being Project** is a comprehensive web application designed to support users in managing their mental health and providing immediate assistance in emergencies. This application facilitates users in assessing their mental well-being, receiving recommendations for supportive resources, and sending emergency alerts with their live location to designated contacts.

### Key Features

- **User Registration and Authentication:** Secure user accounts are created and managed through a robust authentication system.
  
- **Mental Health Assessments:** Users can take assessments to evaluate their mental well-being, allowing them to gain insights into their emotional state.
  
- **Recommendation System:** Based on the assessment results, users receive personalized recommendations, including videos and resources aimed at promoting mental health and well-being.

- **Emergency SOS Functionality:** Users can send SOS alerts that include their current location, ensuring that help is dispatched quickly in critical situations.

- **User-Friendly Interface:** The application features an intuitive interface built with React, enhancing the user experience and accessibility.

### Project Goals

The primary goal of this project is to create a supportive digital environment that aids individuals in managing their mental health and provides quick access to emergency assistance. By leveraging technology, we aim to reduce the stigma surrounding mental health and encourage users to seek help when needed.

## Table of Contents

- [Project Setup](#project-setup)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Technologies Used](#technologies-used)

---

## Project Setup

To successfully set up and run the project, follow these steps for both the frontend and backend.

### Frontend Setup

1. **Install Dependencies**  
   Run the following commands to install necessary packages:
   ```bash
   npm install axios
   npm install react-router-dom
   npm install leaflet react-leaflet
   ```
2. **Start the Application**  
   Run the frontend using:
   ```bash
   npm start
   ```

### Backend Setup

1. **User Authentication Module**  
   Start the User Authentication module. This will automatically use port `8080`.

2. **SOS Module Setup**  
   - Update the `application.properties` file in the SOS module with your email configuration for SMTP and MySQL database connection. Here’s a sample configuration:

     ```properties
     # SMTP Configuration for Email
     spring.mail.host=smtp.gmail.com
     spring.mail.port=587
     spring.mail.username=your_user_email
     spring.mail.password=your_email_password
     spring.mail.properties.mail.smtp.auth=true
     spring.mail.properties.mail.smtp.starttls.enable=true
     spring.mail.properties.mail.smtp.ssl.trust=smtp.gmail.com

     # SOS Module Server Port
     server.port=8081

     # Database Configuration
     spring.datasource.url=jdbc:mysql://localhost:3306/users
     spring.datasource.username=root
     spring.datasource.password=Jitesh@2001
     spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL8Dialect
     spring.jpa.show-sql=true
     ```
   - **Run the SOS Module**  
     After configuring, run the SOS module. Note that it might take a moment to load fully.

---

## Technologies Used
- **Frontend:** React, Axios, React Router, Leaflet, React Leaflet
- **Backend:** Spring Boot, Spring Security, MySQL, SMTP (Gmail)
- **Database:** MySQL

---
