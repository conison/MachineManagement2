import React, { useState } from "react";
import Detail from "./Detail";
import "./App.css"; // Ensure you have the CSS imported

function App() {
  const [activeTab, setActiveTab] = useState("searchMachines");
  const [selectedMachine, setSelectedMachine] = useState(null); // Track selected machine

  const handleMachineSelect = (machine) => {
    setSelectedMachine(machine);
    setActiveTab("detail"); // Switch to detail view
  };

  const handleBackToTabs = () => {
    setSelectedMachine(null);
    setActiveTab("searchMachines"); // Go back to search machines
  };

  const renderMachineGrid = () => (
    <table className="grid">
      <thead>
        <tr>
          <th>Machine Name</th>
          <th>Status</th>
          <th>IP Address</th>
          <th>Services Running</th>
          <th>Last Health Check</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          onClick={() =>
            handleMachineSelect({
              name: "Machine 1",
              status: "Active",
              ipAddress: "192.168.1.1",
              servicesRunning: "Service A",
              lastHealthCheck: "2024-09-24",
            })
          }
        >
          <td>Machine 1</td>
          <td>Active</td>
          <td>192.168.1.1</td>
          <td>Service A</td>
          <td>2024-09-24</td>
          <td>
            <button>Start Service</button>
            <button>Stop Service</button>
            <button>Restart Machine</button>
          </td>
        </tr>
        {/* Additional machine rows can be added here */}
      </tbody>
    </table>
  );

  const renderMachineGroupGrid = () => (
    <table className="grid">
      <thead>
        <tr>
          <th>Group Name</th>
          <th>Description</th>
          <th>Number of Machines</th>
        </tr>
      </thead>
      <tbody>
        <tr
          onClick={() =>
            handleMachineSelect({
              name: "Group A",
              status: "Active",
              ipAddress: "192.168.1.1",
              servicesRunning: "Service A",
              lastHealthCheck: "2024-09-24",
            })
          }
        >
          <td>Group A</td>
          <td>Main production group</td>
          <td>5</td>
        </tr>
        {/* Additional group rows can be added here */}
      </tbody>
    </table>
  );

  return (
    <div className="app">
      <div className="header">Machine Management Dashboard</div>
      <div className="main-content">
        <div className="sidebar">
          {(activeTab === "searchMachines" ||
            activeTab === "viewMachineGroups") && (
            <ul>
              <li onClick={() => setActiveTab("searchMachines")}>
                Search Machines
              </li>
              <li onClick={() => setActiveTab("viewMachineGroups")}>
                View Machine Groups
              </li>
            </ul>
          )}
        </div>
        <div className="content-area">
          {activeTab === "searchMachines" && (
            <>
              <h1>Search Machines</h1>
              {renderMachineGrid()}
            </>
          )}
          {activeTab === "viewMachineGroups" && (
            <>
              <h1>Machine Groups</h1>
              {renderMachineGroupGrid()}
            </>
          )}
          {activeTab === "detail" && selectedMachine && (
            <>
              <button onClick={handleBackToTabs}>
                Back to Machines/Groups
              </button>
              <Detail machine={selectedMachine} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
