import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";

const LogsGrowthChart = () => {
  const [data, setData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try{
        let url=``
        if(user.role !== "ADMIN") {
          url = `/logs/growth?teamId=${user.teamId}`;
        } else {
          url = `/logs/growth`; 
        }
        const res = await api.get("/logs/growth");
        setData(res.data);

      }catch (err) {
        console.error("❌ Error fetching logs growth data:", err);
      }
    }
    // ✅ Mock data for now
    // const mock = [
    //   { date: "2025-07-10", count: 2 },
    //   { date: "2025-07-11", count: 5 },
    //   { date: "2025-07-12", count: 3 },
    //   { date: "2025-07-13", count: 7 },
    //   { date: "2025-07-14", count: 4 },
    //   { date: "2025-07-15", count: 6 },
    // ];

    // setData(mock);
    fetchData();

  }, []);

  return (
    <motion.div
      className="bg-gradient-to-br from-[#1a1a2e] to-[#141322] border border-cyan-400/10 rounded-2xl p-6 shadow-[0_0_20px_#00bcd4aa]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_4px_#00bcd4]">
        📈 Logs Growth This Week
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#2a2a40" strokeDasharray="5 5" />
          <XAxis dataKey="date" stroke="#88e1f2" tick={{ fontSize: 12 }} />
          <YAxis stroke="#88e1f2" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e1e2f",
              border: "1px solid #00bcd4",
              color: "white",
            }}
            labelStyle={{ color: "#00bcd4" }}
            itemStyle={{ color: "white" }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#00bcd4"
            strokeWidth={3}
            activeDot={{ r: 6, fill: "#00bcd4" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default LogsGrowthChart;
