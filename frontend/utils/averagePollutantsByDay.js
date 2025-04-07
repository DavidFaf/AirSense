export function averagePollutantsByDay(data) {
    const grouped = {};
  
    data.forEach((entry) => {
      const date = entry.date;
      const pollutants = entry.pollutants;
  
      if (!grouped[date]) {
        grouped[date] = {
          count: 0,
          totals: {
            PM2_5: 0,
            PM10: 0,
            NO2: 0,
            O3: 0,
          },
        };
      }
  
      grouped[date].count += 1;
      Object.keys(grouped[date].totals).forEach((key) => { 
        grouped[date].totals[key] += pollutants[key] || 0;
      });
    });
  
    return Object.entries(grouped).map(([date, { count, totals }]) => ({
      date,
      pollutants: {
        PM2_5: +(totals.PM2_5 / count).toFixed(2),
        PM10: +(totals.PM10 / count).toFixed(2),
        NO2: +(totals.NO2 / count).toFixed(2),
        O3: +(totals.O3 / count).toFixed(2),
      },
    }));
  }
  