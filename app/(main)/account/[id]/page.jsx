import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

export default async function AccountPage({ params: awaitedParams }) {
  // Await params for Next.js 13+ dynamic routes
  const params = await awaitedParams;

  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  // Count income and expense transactions (NOT total amount)
  const incomeCount = transactions.filter((t) => t.type === "INCOME").length;
  const expenseCount = transactions.filter((t) => t.type === "EXPENSE").length;

  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ₹{parseFloat(account.balance).toFixed(2)}
          </div>

          {/* Badges for Counts Only */}
          <div className="flex items-center justify-end gap-2 mt-2 text-sm">
            {/* Transactions Count */}
            <span className="inline-block bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {account._count.transactions}
            </span>

            {/* Income Count */}
            <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {incomeCount}
            </span>

            {/* Expense Count */}
            <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {expenseCount}
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transactions Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
}
