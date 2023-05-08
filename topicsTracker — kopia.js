const topics = {
    "hungry": 15,
    "horny": 15,
    "angry": 15,
    "anxious": 15,
    "lonely": 15,
    "tired": 15,
    "sad": 15,
    "bored": 15,
    "pain": 15,
};

function displayTopics() {
    const topicsList = document.getElementById("topicsList");
    topicsList.innerHTML = "";
    const sortedTopics = Object.entries(topics);
    sortedTopics.forEach(([topic, value]) => {
        const topicDiv = document.createElement("div");
        topicDiv.classList.add("topic");

        const topicInfo = document.createElement("span");
        topicInfo.classList.add("topic-info");
        topicInfo.textContent = topic;
        topicDiv.appendChild(topicInfo);

        const editNameBtn = document.createElement("button");
        editNameBtn.textContent = "Edit Name";
        editNameBtn.classList.add("edit-name-btn");
        editNameBtn.onclick = () => editTopicName(topic);
        topicDiv.appendChild(editNameBtn);

        const sliderContainer = document.createElement("div");
        sliderContainer.classList.add("slider-container");
        const slider = document.createElement("input");
slider.type = "range";
slider.min = "1";
slider.max = "30";
slider.value = value;
slider.addEventListener("change", () => updateTopicValue(topic, slider.value));
sliderContainer.appendChild(slider);
topicDiv.appendChild(sliderContainer);


        const editValueBtn = document.createElement("button");
        editValueBtn.textContent = "Edit Value";
        editValueBtn.classList.add("edit-value-btn");
        editValueBtn.onclick = () => editTopicValue(topic);
        topicDiv.appendChild(editValueBtn);

        const topicValue = document.createElement("span");
        topicValue.classList.add("topic-value");
        topicValue.textContent = value;
        topicDiv.appendChild(topicValue);

        topicsList.appendChild(topicDiv);
    });
}

function editTopicName(oldName) {
    const newName = prompt(`Enter a new name for "${oldName}":`);
    if (newName) {
        if (!topics.hasOwnProperty(newName)) {
            topics[newName] = topics[oldName];
            delete topics[oldName];
            displayTopics();
        } else {
            alert("A topic with that name already exists.");
        }
    }
}

function updateTopicValue(topic, newValue) {
    topics[topic] = parseInt(newValue);
    displayTopics();
}

function editTopicValue(topic) {
    const oldValue = topics[topic];
    const newValue = parseInt(prompt(`Enter a new value for "${topic}" (1-30):`, oldValue));
    if (1 <= newValue && newValue <= 30) {
        topics[topic] = newValue;
        displayTopics();
    } else {
        alert("Invalid value. Please enter a number between 1 and 30.");
    }
}

function sortTopics() {
    const sortedTopics = Object.entries(topics).sort((a, b) => b[1] - a[1]);
    for (const [newTopic, newValue] of sortedTopics) {
        delete topics[newTopic];
        topics[newTopic] = newValue;
    }
    displayTopics();
}

document.getElementById("sortBtn").addEventListener("click", sortTopics);
displayTopics();

