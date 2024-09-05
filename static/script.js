// Get the video element
const video = document.getElementById('video');

// Create a new WebSocket connection
const socket = new WebSocket('ws://' + window.location.host + '/video_feed');

// Set up the WebSocket event listeners
socket.onmessage = (event) => {
    // Get the frame data from the event
    const frame = event.data;

    // Create a new blob from the frame data
    const blob = new Blob([frame], { type: 'image/jpeg' });

    // Create a new URL from the blob
    const url = URL.createObjectURL(blob);

    // Set the video source to the new URL
    video.srcObject = url;
};

socket.onclose = () => {
    console.log('WebSocket connection closed');
};

socket.onerror = (error) => {
    console.log('WebSocket error:', error);
};