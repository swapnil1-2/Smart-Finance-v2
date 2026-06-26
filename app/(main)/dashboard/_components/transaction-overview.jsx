"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"];

const formatRupees = (num) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(num);

export function DashboardOverview({ accounts = [], transactions = [] }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const txDate = new Date(t.date);
    return t.type === "EXPENSE" &&
      txDate.getMonth() === currentDate.getMonth() &&
      txDate.getFullYear() === currentDate.getFullYear();
  });

  const expensesByCategory = currentMonthExpenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const pieChartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Recent Transactions */}
      <Card className="hover:shadow-xl transform transition-transform duration-300 hover:scale-105 border-gray-100 rounded-xl">
        <CardHeader className="flex items-center justify-between pb-4">
          <CardTitle className="text-base font-semibold text-gray-800">
            Recent Transactions
          </CardTitle>
          <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
            <SelectTrigger className="w-[140px] text-sm border-gray-300 bg-white">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((acc) => (
                <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">No recent transactions</p>
          ) : (
            recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center py-1 hover:bg-gray-50 px-2 rounded transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {tx.description
                      ? tx.description
                      : `${tx.type === "EXPENSE" ? "Expense" : "Income"}${tx.category ? ` - ${tx.category}` : ""}`}
                  </p>
                  <p className="text-xs text-gray-400">{format(new Date(tx.date), "PP")}</p>
                </div>
                <div
                  className={cn(
                    "flex items-center text-sm font-semibold",
                    tx.type === "EXPENSE" ? "text-red-500" : "text-green-500"
                  )}
                >
                  {tx.type === "EXPENSE" ? <ArrowDownRight className="mr-1 h-4 w-4" /> :
                    <ArrowUpRight className="mr-1 h-4 w-4" />}
                  {formatRupees(tx.amount)}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Expense Breakdown */}
      <Card className="hover:shadow-xl transform transition-transform duration-300 hover:scale-105 border-gray-100 rounded-xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">Monthly Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-4">
          {pieChartData.length === 0 ? (
            <p className="text-center text-gray-400 py-20">No expenses this month</p>
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={55}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${formatRupees(value)}`}
                    paddingAngle={2}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatRupees(value)}
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      fontSize: "0.875rem",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
