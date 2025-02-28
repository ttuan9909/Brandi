document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    const createMeetingBtn = document.getElementById("createMeeting");
    const joinMeetingBtn = document.getElementById("joinMeeting");
    const meetingIdElem = document.getElementById("meetingId");
    const meetingInfo = document.getElementById("meetingInfo");
    const errorElem = document.getElementById("error");
    const meetingContainer = document.getElementById("meeting-container");

    let meetingId = "";
    let meetingUrl = "";

    createMeetingBtn.addEventListener("click", () => {
        socket.emit("create-meeting", {}, (response) => {
            console.log("Meeting created:", response);
            meetingId = response.meetingId;
            meetingIdElem.textContent = meetingId;
            meetingUrl = response.meetingUrl;
            meetingInfo.style.display = "block";
        });
    });

    joinMeetingBtn.addEventListener("click", () => {
        if (meetingId) {
            socket.emit("join-meeting", meetingId);
            console.log(`Joining meeting: ${meetingId}`);

            const iframe = document.createElement("iframe");
            iframe.src = meetingUrl;
            iframe.style.width = "100%";
            iframe.style.height = "500px";
            iframe.style.border = "none";
            iframe.allow = "camera; microphone";

            meetingContainer.innerHTML = "";
            meetingContainer.appendChild(iframe);
        } else {
            errorElem.textContent = "No meeting available to join.";
        }
    });

    // Listen for other users joining the meeting
    socket.on("user-joined", (data) => {
        console.log(`User joined: ${data.userId}`);
    });

    socket.on("meeting-created", (data) => {
        meetingIdElem.textContent = data.meetingId;
        meetingId = data.meetingId;
        meetingUrl = data.meetingUrl;
        meetingInfo.style.display = "block";
    });

    socket.on("error", (data) => {
        errorElem.textContent = data.message;
    });
});
