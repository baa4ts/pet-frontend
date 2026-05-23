type QueryStat = {
  query: string;
  calls: number;
  mean_exec_time?: number;
  total_exec_time?: number;
  rows?: number;
};
