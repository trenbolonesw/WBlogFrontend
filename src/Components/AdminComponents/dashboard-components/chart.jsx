import { useEffect, useState } from "react";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function MyChart(){
  
const [blogs,getblogs] = useState([])
const [chartData, setChartData] = useState([]);

const API_URL_BLOGS = import.meta.env.VITE_BLOGS_URL

  useEffect(() => {
    const allCategories = ['Exploration', 'History', 'Photography'];
  
    async function getBlogs(){
      const res = await fetch(`${API_URL_BLOGS}blogs`)
   
    const result = await res.json()

    getblogs(result.blogs)
      // Count blogs per category
        const categoryCounts = result.blogs.reduce((acc, blog) => {
          acc[blog.category] = (acc[blog.category] || 0) + 1;
          return acc;
        }, {});
allCategories.forEach((category) => {
  if (!(category in categoryCounts)) {
    categoryCounts[category] = 0;
  }
});
        // Convert to Recharts-friendly format
        const formattedData = allCategories.map((category) => ({
  category,
  count: categoryCounts[category],
}));

        setChartData(formattedData);
    }
    getBlogs()
  } ,[API_URL_BLOGS])
    
 return(
    <>
    <ResponsiveContainer width='80%' height={220} className="bar-chart">
  <BarChart
 
  data={chartData}
>
    <XAxis fontSize={"10px"} dataKey="category" />
        <YAxis allowDecimals={false}/>
  <Tooltip trigger="click" content={() => null} cursor={false} shared={false} />
    <Legend/>
  <Bar dataKey="count" stackId="a"  fill="#5b6b9eff" activeBar={{ stroke: 'white', strokeWidth: 7 }} />
</BarChart>
</ResponsiveContainer>
    </>
 )
}