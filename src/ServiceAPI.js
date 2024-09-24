// ServiceAPI.js

const BASE_URL = "https://your-api-endpoint.com"; // Replace with your actual API base URL

export const fetchServices = async (machineId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/services/${machineId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    const data = await response.json();
    return data.Services || []; // Assuming the response has a Services array
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error; // Rethrow the error for further handling
  }
};

export const fetchProcesses = async (machineId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/processes/${machineId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch processes");
    }
    const data = await response.json();
    return data.Processes || []; // Assuming the response has a Processes array
  } catch (error) {
    console.error("Error fetching processes:", error);
    throw error; // Rethrow the error for further handling
  }
};

// Optionally, add a function to run scripts if needed
export const runScript = async (scriptPayload) => {
  try {
    const response = await fetch(`${BASE_URL}/api/runscript`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scriptPayload),
    });
    if (!response.ok) {
      throw new Error("Failed to run script");
    }
    const result = await response.json();
    return result; // Assuming the response has the required structure
  } catch (error) {
    console.error("Error running script:", error);
    throw error; // Rethrow the error for further handling
  }
};
