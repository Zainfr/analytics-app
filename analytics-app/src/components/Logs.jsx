import { useEffect, useState } from "react";
import axios from "axios";

const Logs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/energy/logs");
                setLogs(response.data);
            } catch (error) {
                console.error("Error Fetching logs:", error);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div>
            <h2>Access Logs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Access Time</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td>{log.employee_name}</td>
                            <td>{log.access_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Logs;
