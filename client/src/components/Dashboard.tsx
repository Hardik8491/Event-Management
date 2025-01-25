// // "use client";

// // import { useEffect, useState } from "react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { useAuth } from "@/hooks/useAuth";
// // import { Bar } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend
// // );

// // interface EventStats {
// //   _id: string;
// //   count: number;
// //   totalAmount: number;
// //   totalDuration: number;
// // }

// // export default function Dashboard() {
// //   const [stats, setStats] = useState<EventStats[]>([]);
// //   const { token } = useAuth();
// //   console.log(token);

// //   useEffect(() => {
// //     fetchStats();
// //   }, []);

// //   const fetchStats = async () => {
// //     try {
// //       const response = await fetch(
// //         `${process.env.NEXT_PUBLIC_API_URL}/api/events/stats`,
// //         {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`, // Token from environment variables
// //           },
// //           credentials: "include", // Include credentials
// //         }
// //       );
// //       if (response.ok) {
// //         const data = await response.json();
// //         setStats(data);
// //       } else {
// //         throw new Error("Failed to fetch stats");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching stats:", error);
// //     }
// //   };

// //   const chartData = {
// //     labels: stats.map((stat) => stat._id),
// //     datasets: [
// //       {
// //         label: "Event Count",
// //         data: stats.map((stat) => stat.count),
// //         backgroundColor: "rgba(255, 99, 132, 0.5)",
// //       },
// //       {
// //         label: "Total Amount",
// //         data: stats.map((stat) => stat.totalAmount),
// //         backgroundColor: "rgba(53, 162, 235, 0.5)",
// //       },
// //     ],
// //   };

// //   const chartOptions = {
// //     responsive: true,
// //     plugins: {
// //       legend: {
// //         position: "top" as const,
// //       },
// //       title: {
// //         display: true,
// //         text: "Event Statistics by Category",
// //       },
// //     },
// //   };

// //   return (
// //     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Total Events</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="text-2xl font-bold">
// //             {stats.reduce((sum, stat) => sum + stat.count, 0)}
// //           </div>
// //         </CardContent>
// //       </Card>
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Total Amount</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="text-2xl font-bold">
// //             ${stats.reduce((sum, stat) => sum + stat.totalAmount, 0).toFixed(2)}
// //           </div>
// //         </CardContent>
// //       </Card>
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Total Duration</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="text-2xl font-bold">
// //             {stats.reduce((sum, stat) => sum + stat.totalDuration, 0)} minutes
// //           </div>
// //         </CardContent>
// //       </Card>
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Average Amount per Event</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="text-2xl font-bold">
// //             $
// //             {(
// //               stats.reduce((sum, stat) => sum + stat.totalAmount, 0) /
// //               stats.reduce((sum, stat) => sum + stat.count, 0)
// //             ).toFixed(2)}
// //           </div>
// //         </CardContent>
// //       </Card>
// //       <Card className="col-span-full">
// //         <CardHeader>
// //           <CardTitle>Event Statistics</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <Bar options={chartOptions} data={chartData} />
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }



// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useAuth } from "@/hooks/useAuth"
// import { useToast } from "@/components/ui/use-toast"
// import { Bar } from "react-chartjs-2"
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// interface EventStats {
//   _id: string
//   count: number
//   totalAmount: number
//   totalDuration: number
// }

// export default function Dashboard() {
//   const [stats, setStats] = useState<EventStats[]>([])
//   const { isAuthenticated, logout } = useAuth()
//   const { toast } = useToast()

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchStats()
//     }
//   }, [isAuthenticated])

//   const fetchStats = async () => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/stats`, {
//         credentials: "include",
//       })
//       if (response.ok) {
//         const data = await response.json()
//         setStats(data)
//       } else if (response.status === 401 || response.status === 403) {
//         toast({
//           title: "Authentication Error",
//           description: "Your session has expired. Please log in again.",
//           variant: "destructive",
//         })
//         logout()
//       } else {
//         throw new Error("Failed to fetch stats")
//       }
//     } catch (error) {
//       console.error("Error fetching stats:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch statistics. Please try again later.",
//         variant: "destructive",
//       })
//     }
//   }

//   const chartData = {
//     labels: stats.map((stat) => stat._id),
//     datasets: [
//       {
//         label: "Event Count",
//         data: stats.map((stat) => stat.count),
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//       },
//       {
//         label: "Total Amount",
//         data: stats.map((stat) => stat.totalAmount),
//         backgroundColor: "rgba(53, 162, 235, 0.5)",
//       },
//     ],
//   }

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top" as const,
//       },
//       title: {
//         display: true,
//         text: "Event Statistics by Category",
//       },
//     },
//   }

//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       <Card>
//         <CardHeader>
//           <CardTitle>Total Events</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.reduce((sum, stat) => sum + stat.count, 0)}</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader>
//           <CardTitle>Total Amount</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">${stats.reduce((sum, stat) => sum + stat.totalAmount, 0).toFixed(2)}</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader>
//           <CardTitle>Total Duration</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{stats.reduce((sum, stat) => sum + stat.totalDuration, 0)} minutes</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader>
//           <CardTitle>Average Amount per Event</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">
//             $
//             {(
//               stats.reduce((sum, stat) => sum + stat.totalAmount, 0) / stats.reduce((sum, stat) => sum + stat.count, 0)
//             ).toFixed(2)}
//           </div>
//         </CardContent>
//       </Card>
//       <Card className="col-span-full">
//         <CardHeader>
//           <CardTitle>Event Statistics</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Bar options={chartOptions} data={chartData} />
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/components/ui/use-toast"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface EventStats {
  _id: string
  count: number
  totalAmount: number
  totalDuration: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<EventStats[]>([])
  const { isAuthenticated, logout } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats()
    }
  }, [isAuthenticated])

  const fetchStats = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/stats`, {
        credentials: "include",
      })
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else if (response.status === 401 || response.status === 403) {
        toast({
          title: "Authentication Error",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        })
        logout()
      } else {
        throw new Error("Failed to fetch stats")
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
      toast({
        title: "Error",
        description: "Failed to fetch statistics. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const chartData = {
    labels: stats.map((stat) => stat._id),
    datasets: [
      {
        label: "Event Count",
        data: stats.map((stat) => stat.count),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Total Amount",
        data: stats.map((stat) => stat.totalAmount),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Event Statistics by Category",
      },
    },
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.reduce((sum, stat) => sum + stat.count, 0)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.reduce((sum, stat) => sum + stat.totalAmount, 0).toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.reduce((sum, stat) => sum + stat.totalDuration, 0)} minutes</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Average Amount per Event</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            $
            {(
              stats.reduce((sum, stat) => sum + stat.totalAmount, 0) / stats.reduce((sum, stat) => sum + stat.count, 0)
            ).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Event Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar options={chartOptions} data={chartData} />
        </CardContent>
      </Card>
    </div>
  )
}

