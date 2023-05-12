const topics = {
    "🍗 Hungry": 0,
    "🤬 Angry / agitated": 0,
    "😬 Anxious / stressed": 0,
    "👤 Lonely": 0,
    "🛌 Tired / uncomfortable": 0,
    "☹ Sad": 0,
    "😒 Bored": 0,
	"⚡ Pain": 0,
	"🔞 Urges": 0,
};

function displayTopics() {
    const topicsList = document.getElementById("topicsList"); // Get the topics list element by its ID
    topicsList.innerHTML = ""; // Clear the inner HTML of the topics list element
    const sortedTopics = Object.entries(topics); // Convert the topics object to an array of key-value pairs
    sortedTopics.forEach(([topic, value]) => { // Iterate through the sortedTopics array
        const topicDiv = document.createElement("div"); // Create a new div element for the topic
        topicDiv.classList.add("topic"); // Add the "topic" class to the new div element

        const topicInfo = document.createElement("span"); // Create a new span element for the topic info
        topicInfo.classList.add("topic-info"); // Add the "topic-info" class to the new span element
        topicInfo.textContent = topic; // Set the text content of the topicInfo element to the topic name
        topicDiv.appendChild(topicInfo); // Append the topicInfo element to the topicDiv

        const editNameBtn = document.createElement("button"); // Create a new button element for editing the topic name
        editNameBtn.textContent = "Edit\nName"; // Set the text content of the editNameBtn to "Edit Name"
        editNameBtn.classList.add("edit-name-btn"); // Add the "edit-name-btn" class to the new button element
        editNameBtn.onclick = () => editTopicName(topic); // Set the onclick event handler for the editNameBtn
        topicDiv.appendChild(editNameBtn); // Append the editNameBtn to the topicDiv

        const sliderContainer = document.createElement("div"); // Create a new div element for the slider container
        sliderContainer.classList.add("slider-container"); // Add the "slider-container" class to the new div element
        const slider = document.createElement("input"); // Create a new input element for the slider
        slider.type = "range"; // Set the input type of the slider to "range"
		slider.min = "-15"; // Set the minimum value of the slider to 1
		slider.max = "15"; // Set the maximum value of the slider to 30
		slider.step = "0.25"; // Set the step value of the slider to 0.25
		slider.value = value; // Set the current value of the slider to the topic value
        slider.addEventListener("input", () => updateDisplayValue(topic, slider.value, topicValue)); // Add an "input" event listener to update the displayed value when the slider is interacted with
		slider.addEventListener("change", () => updateTopicValue(topic, slider.value)); // Add a "change" event listener to update the topic value when the interaction is finished
        sliderContainer.appendChild(slider); // Append the slider element to the sliderContainer
        topicDiv.appendChild(sliderContainer); // Append the sliderContainer to the topicDiv

        const editValueBtn = document.createElement("button"); // Create a new button element for editing the topic value
        editValueBtn.textContent = "Edit\nValue"; // Set the text content of the editValueBtn to "Edit Value"
        editValueBtn.classList.add("edit-value-btn"); // Add the "edit-value-btn" class to the new button element
        editValueBtn.onclick = () => editTopicValue(topic); // Set the onclick event handler for the editValueBtn
        topicDiv.appendChild(editValueBtn); // Append the editValueBtn to the topicDiv

        const topicValue = document.createElement("span"); // Create a new span element for the topic value
        topicValue.classList.add("topic-value"); // Add the "topic-value" class to the new span element
        topicValue.textContent = value; // Set the text content of the topicValue element to the topic value
        topicDiv.appendChild(topicValue); // Append the topicValue element to the topicDiv

        topicsList.appendChild(topicDiv); // Append the topicDiv to the topicsList element
    });
}

function editTopicName(oldName) {
    const newName = prompt(`Enter a new name for "${oldName}":`); // Prompt the user to enter a new name for the topic
    if (newName) { // If the user entered a new name
        if (!topics.hasOwnProperty(newName)) { // If the new name is not already in the topics object
            topics[newName] = topics[oldName]; // Assign the value of the old topic to the new topic
            delete topics[oldName]; // Delete the old topic from the topics object
            displayTopics(); // Refresh the display of the topics
        } else { // If the new name is already in the topics object
            alert("A topic with that name already exists."); // Display an alert to the user
        }
    }
}

function updateTopicValue(topic, newValue) {
    topics[topic] = parseFloat(newValue); // Update the value of the specified topic with the new value
    displayTopics(); // Refresh the display of the topics
}


function editTopicValue(topic) {
    const oldValue = topics[topic]; // Get the current value of the specified topic
   const newValue = parseFloat(prompt(`Enter a new value for "${topic}" (-15 to 15):`, oldValue));
    if (-15 <= newValue && newValue <= 15) {
        topics[topic] = newValue;
        displayTopics();
    } else {
        alert("Invalid value. Please enter a number between -15 and 15.");
    }
}

function updateDisplayValue(topic, newValue, topicValueElement) {
    topicValueElement.textContent = parseFloat(newValue).toFixed(2); // Update the displayed value of the topic with the new value
}


function sortTopics() {
    const sortedTopics = Object.entries(topics).sort((a, b) => b[1] - a[1]); // Sort the topics array by their values in descending order
    for (const [newTopic, newValue] of sortedTopics) { // Iterate through the sortedTopics array
        delete topics[newTopic]; // Delete the topic from the topics object
        topics[newTopic] = newValue; // Add the topic back to the topics object with its new value
    }
    displayTopics(); // Refresh the display of the topics
}
function exportToClipboard() {
    const timestamp = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Warsaw', dateStyle: 'full', timeStyle: 'medium' }).format(new Date());
    let data = `Timestamp: ${timestamp}\n`; // \n\nTopic\tValue
    
    for (const [topic, value] of Object.entries(topics)) {
        data += `${topic}\t${value}\n`;
    }

    // Copy the data to the clipboard
    navigator.clipboard.writeText(data).then(() => {
        alert("Data copied to clipboard successfully!");
    }, (err) => {
        console.error("Could not copy data to clipboard:", err);
        alert("Failed to copy data to clipboard.");
    });
}
function resetTopics() {
    for (const topic in topics) {
        topics[topic] = 0; // Reset the value of the topic to 15
    }
    displayTopics(); // Refresh the display of the topics
}


document.getElementById("sortBtn").addEventListener("click", sortTopics); // Add a click event listener to the sort button to sort the topics when clicked
document.getElementById("exportBtn").addEventListener("click", exportToClipboard);
displayTopics(); // Initialize the display of the topics
document.getElementById("resetBtn").addEventListener("click", resetTopics);

