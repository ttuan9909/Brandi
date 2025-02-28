const io = require("socket.io-client");

// Default server URL
let LOCAL_SERVER_URL = "http://localhost:3000"; // Default value

// Create a socket connection to the server
const socket = io(LOCAL_SERVER_URL);

socket.on("connect", () => {
  console.log("Connected to server");
});

// Fetch server URL from backend (if needed)
export const fetchServerUrl = async () => {
  try {
    const response = await fetch(`${LOCAL_SERVER_URL}/config`);
    const data = await response.json();
    LOCAL_SERVER_URL = data.serverUrl;
  } catch (error) {
    console.error("Error fetching server URL:", error);
  }
};

// Get Token from server using socket.io
export const getToken = async () => {
  try {
    await fetchServerUrl(); // Ensure LOCAL_SERVER_URL is updated

    return new Promise((resolve, reject) => {
      socket.emit("get-token", {}, (response) => {
        if (response.token) {
          resolve(response.token);
        } else {
          reject("Error fetching token");
        }
      });
    });
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

// Get Meeting ID from server using socket.io
export const getMeetingId = async (token) => {
  try {
    await fetchServerUrl(); // Ensure LOCAL_SERVER_URL is updated

    return new Promise((resolve, reject) => {
      socket.emit("create-meeting", { token }, (response) => {
        if (response.meetingId) {
          resolve(response.meetingId);
        } else {
          reject("Error fetching meeting ID");
        }
      });
    });
  } catch (error) {
    console.error("Error fetching meeting ID:", error);
    return null;
  }
};