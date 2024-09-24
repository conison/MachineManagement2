import React, { useState, useEffect } from "react";
import FrequencyPicker from "./FrequencyPicker";
import { fetchServices, fetchProcesses } from "./ServiceAPI"; // Import the service API functions
import "./App.css"; // Import the CSS file

function Detail({ machine }) {
  const [activeTab, setActiveTab] = useState("services");
  const [frequency, setFrequency] = useState("");
  const [eventActions, setEventActions] = useState([
    { action: "", sequence: "" },
  ]);
  const [services, setServices] = useState([]);
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    const loadServicesAndProcesses = async () => {
      try {
        const servicesData = await fetchServices(machine.name);
        setServices(servicesData);

        const processesData = await fetchProcesses(machine.name);
        setProcesses(processesData);
      } catch (error) {
        console.error("Error loading services and processes:", error);
      }
    };

    loadServicesAndProcesses();
  }, [machine]);

  const handleFrequencyChange = (newFrequency) => {
    setFrequency(newFrequency);
  };

  const handleActionChange = (index, field, value) => {
    const newActions = [...eventActions];
    newActions[index][field] = value;
    setEventActions(newActions);
  };

  const addAction = () => {
    setEventActions([...eventActions, { action: "", sequence: "" }]);
  };

  const renderEventCreation = () => (
    <div className="event-creation">
      <h3>Create Event</h3>
      <input type="text" placeholder="Event Name" />
      <FrequencyPicker onFrequencyChange={handleFrequencyChange} />

      <h4>Actions</h4>
      {eventActions.map((eventAction, index) => (
        <div key={index} className="action-sequence">
          <input
            type="text"
            placeholder="Action (e.g., Run Script)"
            value={eventAction.action}
            onChange={(e) =>
              handleActionChange(index, "action", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Sequence (e.g., 1, 2, 3)"
            value={eventAction.sequence}
            onChange={(e) =>
              handleActionChange(index, "sequence", e.target.value)
            }
          />
          <button
            onClick={() =>
              setEventActions(eventActions.filter((_, i) => i !== index))
            }
          >
            Remove
          </button>
        </div>
      ))}
      <button onClick={addAction}>Add Action</button>
      <button>Create Event</button>
    </div>
  );

  const renderServiceTab = () => (
    <div>
      <h1>Services</h1>
      <table className="grid">
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.name}>
              <td>{service.name}</td>
              <td
                style={{
                  color: service.status === "Running" ? "green" : "red",
                }}
              >
                {service.status}
              </td>
              <td>
                <button>Stop</button>
                <button>Restart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderProcessTab = () => (
    <div>
      <h1>Processes</h1>
      <table className="grid">
        <thead>
          <tr>
            <th>Process Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.name}>
              <td>{process.name}</td>
              <td
                style={{ color: process.status === "Active" ? "green" : "red" }}
              >
                {process.status}
              </td>
              <td>
                <button>Kill</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderLogs = () => (
    <div className="logs">
      <h1>Logs</h1>
      <table className="grid">
        <thead>
          <tr>
            <th>Date</th>
            <th>Log Type</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-09-24</td>
            <td>Info</td>
            <td>Machine started successfully</td>
          </tr>
          <tr>
            <td>2024-09-23</td>
            <td>Error</td>
            <td>Failed to start Service A</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderSettings = () => (
    <div className="settings">
      <h1>Settings</h1>
      <div className="settings-item">
        <label>Toggle Feature A:</label>
        <input type="checkbox" />
      </div>
      <div className="settings-item">
        <label>Feature B Preferences:</label>
        <input type="text" placeholder="Enter preference" />
      </div>
    </div>
  );

  return (
    <div className="detail">
      <div className="machine-details">
        <h2>{machine.name}</h2>
        <p style={{ color: machine.status === "Online" ? "green" : "red" }}>
          Status: {machine.status}
        </p>
        <p style={{ color: "blue" }}>IP Address: {machine.ipAddress}</p>
        <p>Services Running: {machine.servicesRunning}</p>
        <p>Last Health Check: {machine.lastHealthCheck}</p>
      </div>
      <div className="sidebar">
        <ul className="tab-list">
          <li
            className={activeTab === "services" ? "active" : ""}
            onClick={() => setActiveTab("services")}
          >
            Services
          </li>
          <li
            className={activeTab === "processes" ? "active" : ""}
            onClick={() => setActiveTab("processes")}
          >
            Processes
          </li>
          <li
            className={activeTab === "logs" ? "active" : ""}
            onClick={() => setActiveTab("logs")}
          >
            Logs
          </li>
          <li
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </li>
          <li
            className={activeTab === "events" ? "active" : ""}
            onClick={() => setActiveTab("events")}
          >
            Events
          </li>
        </ul>
      </div>
      <div className="content-area">
        {activeTab === "services" && renderServiceTab()}
        {activeTab === "processes" && renderProcessTab()}
        {activeTab === "logs" && renderLogs()}
        {activeTab === "settings" && renderSettings()}
        {activeTab === "events" && renderEventCreation()}
      </div>
    </div>
  );
}

export default Detail;
