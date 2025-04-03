
import { useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppSelector } from '@/redux/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';

const generateActivityData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    name: day,
    value: Math.floor(Math.random() * 1000) + 500
  }));
};

export function ActivityChart() {
  const { isDarkMode } = useAppSelector(state => state.theme);
  const data = useRef(generateActivityData());

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-[400px]"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>User activity over the past week</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data.current}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
              <XAxis 
                dataKey="name" 
                stroke={isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
                tick={{ fill: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}
              />
              <YAxis 
                stroke={isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
                tick={{ fill: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDarkMode ? "hsl(var(--card))" : "white", 
                  borderColor: "hsl(var(--border))",
                  color: isDarkMode ? "white" : "black"
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
