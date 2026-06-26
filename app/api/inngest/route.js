import { inngest } from "./client";

// 1. Process Recurring Transaction
export const processRecurringTransaction = inngest.createFunction(
  {
    id: "process-recurring-transaction",
    triggers: [{ event: "transaction/recurring.process" }],
  },
  async ({ event, step }) => {
    await step.run("process-transaction", async () => {
      console.log("Processing recurring transaction", event.data);
      // your logic here
    });
  }
);

// 2. Trigger Recurring Transactions
export const triggerRecurringTransactions = inngest.createFunction(
  {
    id: "trigger-recurring-transactions",
    triggers: [{ event: "transaction/recurring.trigger" }],
  },
  async ({ step }) => {
    await step.run("trigger-transactions", async () => {
      console.log("Triggering recurring transactions");
      // your logic here
    });
  }
);

// 3. Generate Monthly Reports
export const generateMonthlyReports = inngest.createFunction(
  {
    id: "generate-monthly-reports",
    triggers: [{ event: "report/monthly.generate" }],
  },
  async ({ step }) => {
    await step.run("generate-report", async () => {
      console.log("Generating monthly reports");
      // your logic here
    });
  }
);

// 4. Check Budget Alerts
export const checkBudgetAlerts = inngest.createFunction(
  {
    id: "check-budget-alerts",
    triggers: [{ event: "budget/check.alerts" }],
  },
  async ({ event, step }) => {
    await step.run("check-alerts", async () => {
      console.log("Checking budget alerts", event.data);
      // your logic here
    });
  }
);