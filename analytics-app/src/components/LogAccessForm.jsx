import { useState } from "react";
import axios from "axios";


const LogAccessForm = ({ setChartData }) => {
    const [accessTime, setAccessTime] = useState("");
    const [accessDate, setAccessDate] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [algoStatus, setAlgoStatus] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("http://localhost:5000/api/energy/access", {
                params: {
                    access_time: accessTime,
                    access_date: accessDate,
                    employee_name: employeeName,
                    algo_status: algoStatus,
                },
            });
            const rawData = response.data.data;

            const formattedData = rawData.map((data) => ({
                date: new Date(data.createdAt).toLocaleDateString(),
                energy: data.total_kwh
            }));
            setChartData(formattedData);
            console.log("Access Log saved:", response.data.log);
        } catch (error) {
            console.error("Error logging access:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Access Time:
                <input
                    type="time"
                    value={accessTime}
                    onChange={(e) => setAccessTime(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Access Date:
                <input
                    type="date"
                    value={accessDate}
                    onChange={(e) => setAccessDate(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Employee Name:
                <input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    required
                />
            </label>
            <br />
            <label>
                Algo Status:
                <select
                    value={algoStatus}
                    onChange={(e) => setAlgoStatus(e.target.value)}
                    required
                >
                    <option value="">Select</option>
                    <option value={1}>Energy Saving Mode ON</option>
                    <option value={0}>Energy Saving Mode OFF</option>
                </select>
            </label>
            <br />
            <button type="submit">Log Access & Fetch Data</button>
        </form>
    );

}

export default LogAccessForm