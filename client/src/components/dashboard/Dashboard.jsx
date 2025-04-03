
import { motion } from 'framer-motion';
import { Users, DollarSign, Activity, BarChart } from 'lucide-react';

import { StatCard } from './StatCard';
import { ActivityChart } from './ActivityChart';
import { UsersChart } from './UsersChart';
import { RecentTransactions } from './RecentTransactions';
import { useAppSelector } from '@/redux/hooks';

export function Dashboard() {
  const { stats } = useAppSelector((state) => state.dashboard);
  
  return (
    <div className="p-6 space-y-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold"
      >
        Dashboard Overview
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Visits" 
          value={stats.totalVisits} 
          icon={Activity} 
          change={12.5} 
          trend="up"
          delay={0.1}
        />
        <StatCard 
          title="Total Revenue" 
          value={stats.totalRevenue} 
          icon={DollarSign} 
          change={8.2} 
          trend="up"
          delay={0.2}
        />
        <StatCard 
          title="New Users" 
          value={stats.newUsers} 
          icon={Users} 
          change={-3.1} 
          trend="down"
          delay={0.3}
        />
        <StatCard 
          title="Conversion Rate" 
          value={`${stats.conversionRate}%`} 
          icon={BarChart}
          change={1.2}
          trend="up"
          delay={0.4}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart />
        <UsersChart />
      </div>
      
      <RecentTransactions />
    </div>
  );
}
