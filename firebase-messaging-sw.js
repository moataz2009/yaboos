importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyCyWI0t5k_Mcf-uu88gKoMQHpYVMwnnRo4",
    authDomain: "yaboos-851fc.firebaseapp.com",
    databaseURL: "https://yaboos-851fc.firebaseio.com",
    projectId: "yaboos-851fc",
    storageBucket: "yaboos-851fc.appspot.com",
    messagingSenderId: "958303527354",
    appId: "1:958303527354:web:f1df3bba9654383c72fd83",
    measurementId: "G-Z68PMERT26"
});
const messaging = firebase.messaging();