document.addEventListener('DOMContentLoaded', function () {
    const pages = document.querySelectorAll('.page');

    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
    }

    // Default to login page
    showPage('loginPage');

    // Handle login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        showPage('mainPage');
    });

    // Navigation functions
    window.showPage = showPage;

    // Person Detection & Gender Classification
    window.runPersonDetection = function () {
        document.getElementById('resultPersonDetection').innerText = 'Running person detection... (Results will be shown here.)';
        // Simulate processing time
        setTimeout(() => {
            document.getElementById('resultPersonDetection').innerText = 'Person Detection Results: Detected 5 people. 3 women and 2 men.';
        }, 2000);
    }

    // Gender Distribution
    window.analyzeGenderDistribution = function () {
        document.getElementById('resultGenderDistribution').innerText = 'Analyzing gender distribution... (Results will be shown here.)';
        // Simulate processing time
        setTimeout(() => {
            document.getElementById('resultGenderDistribution').innerText = 'Gender Distribution Analysis: 40% women, 60% men.';
        }, 2000);
    }

    // Identifying a Lone Woman at Night
    window.identifyLoneWoman = function () {
        document.getElementById('resultLoneWoman').innerText = 'Identifying lone woman at night... (Results will be shown here.)';
        // Simulate processing time
        setTimeout(() => {
            document.getElementById('resultLoneWoman').innerText = 'Lone Woman Detection: No lone women detected at this time.';
        }, 2000);
    }

    // Detection of a Woman Surrounded by Men
    window.detectWomanSurroundedByMen = function () {
        document.getElementById('resultWomanSurrounded').innerText = 'Detecting woman surrounded by men... (Results will be shown here.)';
        // Simulate processing time
        setTimeout(() => {
            document.getElementById('resultWomanSurrounded').innerText = 'Detection Results: 1 woman surrounded by 4 men detected.';
        }, 2000);
    }

    // Recognizing SOS Situation
    window.recognizeSOSSituation = function () {
        document.getElementById('resultSOSSituation').innerText = 'Recognizing SOS situation... (Results will be shown here.)';
        // Simulate processing time
        setTimeout(() => {
            document.getElementById('resultSOSSituation').innerText = 'SOS Recognition: SOS signal detected. Alert sent to authorities.';
        }, 2000);
    }

    // Identifying Hotspots
    window.identifyHotspots = function () {
        document.getElementById('resultHotspots').innerText = 'Identifying hotspots... (Results will be shown here.)';
        // Simulate processing time
        setTimeout(() => {
            document.getElementById('resultHotspots').innerText = 'Hotspot Identification: High-risk area detected at Central Park.';
        }, 2000);
    }
});
