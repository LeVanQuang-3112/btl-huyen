import { startOfDay } from "date-fns";
import { IncomeData, OutcomeData } from "../../component/calendar";

export const calculateCalendarData = (
  list1: OutcomeData[],
  list2: IncomeData[]
) => {
  const data: {
    [date: string]: {
      outcome: OutcomeData[];
      income: IncomeData[];
      time: number;
      totalOutcome: number;
      totalIncome: number;
    };
  } = {};
  list1.forEach((v) => {
    const date = startOfDay(new Date(v.date));
    if (!data[date.getTime()]) {
      data[date.getTime()] = {
        outcome: [],
        income: [],
        time: date.getTime(),
        totalOutcome: 0,
        totalIncome: 0,
      };
    }
    data[date.getTime()].outcome = [...data[date.getTime()].outcome, v];
    data[date.getTime()].totalOutcome += v.money;
  });

  list2.forEach((v) => {
    const date = startOfDay(new Date(v.date));
    if (!data[date.getTime()]) {
      data[date.getTime()] = {
        outcome: [],
        income: [],
        time: date.getTime(),
        totalOutcome: 0,
        totalIncome: 0,
      };
    }
    data[date.getTime()].income = [...data[date.getTime()].income, v];
    data[date.getTime()].totalIncome += v.money;
  });

  return Object.values(data).sort(
    (
      a: { outcome: OutcomeData[]; income: IncomeData[]; time: number },
      b: { outcome: OutcomeData[]; income: IncomeData[]; time: number }
    ) => {
      return a.time - b.time;
    }
  );
};
