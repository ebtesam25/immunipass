# ImmuniPass
A standardised and digitized immunization verification system to make public areas safe, post COVID-19 immunization.

## About
The COVID-19 vaccines are estimated to arrive around three years from now, when the world will be completely shattered by the pandemic. When public areas start going back to normal, there will be complete chaos as the vaccines would have just started shipping. There would be no way to know who is immunized and who is not. To solve this problem, **we propose ImmuniPass: A standardized digital verification system for identifying immunized individuals in public areas such as malls, restaurants, airports etc. **

## How it Works
Our mobile app enables immunized individuals to access public areas by verifying that they are immunized by a unique two-step process:
* First, the owner or manager of a public area such as a restaurant scans a unique QR code automatically generated * by the app. 
* Next, they take a photo of the immunized person, and our backend server runs a secure face ID using AES encrypted, prior collected face data of the person. This ensures that the account represented by the QR code belongs to the same person.  

We have also developed a security surveillance system that uses security cameras, microphones, and other sensors to do the following:
* Runs advanced camera vision models on real time video to detect whether the people in a certain area are wearing face masks or not.
* Runs machine learning models on real time audio data from microphones to detect if anyone is coughing in that area.
* Uses various sensors to detect air quality.
* If any security risk is seen in a certain area (for example if multiple instances of people coughing were detected), our backend server automatically sends a notification to alert all the people who are registered in that area at the time, as well as the manager of the area (such as a restaurant owner) about the potential risks.

Lastly, we have developed a web app for doctors and hospital agencies, where verified immunization centers can register new people into the system, who were previously un-immunized,  along with their face data, after giving them the vaccine. This web app also provides data visualization of the surveillance data for doctors to analyze trends. To make this system more user friendly, we have added a feature in our mobile app, by which un-immunized individuals can find nearby verified immunization centers, via the google maps API. 

## Tech Stack
In order to build our system, we used an assortment of technologies and platforms:
* **React native** to build the frontend interface for both users and managers of public areas.
* **React js** to build a web app for doctors and hospitals to register immunized people into the system
* **Auth0**, which we integrated with our react native app and react web frontend, for login, registration, and authentication.
* **Flask Python** for our backend server, mainly for integrating the front-end with the database.
* **MongoDB** Atlas to store user data, hashed passwords, registered immunization centers, and environment data such as Air Quality
* **Python OpenCV + Keras** for mask detection from video feeds.
* **Google’s teachable machine** for cough detection, which takes into account background noise from real time audio data in a noisy public area.
* **Dlib + OpenCV** for facial recognition and SHA256 + AES encryption for secure storage of face data.
* **Vercel** to deploy our react web app.
* **Raspberry pi** with a webcam, microphone and air quality sensor to simulate a surveillance system.
* **Google Maps API** for nearby immunization centers feature.
* **Microsoft Azure** to store the encrypted image embeddings
* **AWS** for the lambda functions and server/backend services
* **Digital Ocean** to host the flask backend for the nearby immunization centers retrieval

## How to use it
* We used expo to create the react native app. Run `npm i` and either `expo start` or `npm start`
* Run `python maps_data.py` to start the server for the maps feature and nearby immunization center retrivals
* Open `main.html` for cough detection
* Open `compare_face.py` for facial recognition and encryption functions
* Run `face.py` for mask detection

