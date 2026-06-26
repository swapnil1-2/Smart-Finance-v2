import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// Dummy data for preview
const PREVIEW_DATA = {
  monthlyReport: {
    userName: "John Doe",
    type: "monthly-report",
    data: {
      month: "December",
      stats: {
        totalIncome: 5000,
        totalExpenses: 3500,
        byCategory: {
          housing: 1500,
          groceries: 600,
          transportation: 400,
          entertainment: 300,
          utilities: 700,
        },
      },
      insights: [
        "Your housing expenses are 43% of your total spending - consider reviewing your housing costs.",
        "Great job keeping entertainment expenses under control this month!",
        "Setting up automatic savings could help you save 20% more of your income.",
      ],
    },
  },
  budgetAlert: {
    userName: "John Doe",
    type: "budget-alert",
    data: {
      percentageUsed: 85,
      budgetAmount: 4000,
      totalExpenses: 3400,
    },
  },
};

export default function EmailTemplate({
  userName = PREVIEW_DATA.monthlyReport.userName,
  type = PREVIEW_DATA.monthlyReport.type,
  data = PREVIEW_DATA.monthlyReport.data,
}) {
  const totalIncome = data?.stats?.totalIncome || 0;
  const totalExpenses = data?.stats?.totalExpenses || 0;
  const net = totalIncome - totalExpenses;

  const percentageUsed = Number(data?.percentageUsed || 0);
  const budgetAmount = Number(data?.budgetAmount || 0);
  const spent = Number(data?.totalExpenses || 0);
  const remaining = budgetAmount - spent;

  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>

        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Monthly Financial Report</Heading>

            <Text style={styles.text}>Hello {userName},</Text>

            <Text style={styles.text}>
              Here’s your financial summary for {data?.month || "this month"}:
            </Text>

            {/* Main Stats */}
            <Section style={styles.statsContainer}>
              <table width="100%">
                <tr>
                  <td style={styles.statBox}>
                    <Text style={styles.statLabel}>Total Income</Text>
                    <Text style={styles.statValue}>₹{totalIncome}</Text>
                  </td>
                  <td style={styles.statBox}>
                    <Text style={styles.statLabel}>Total Expenses</Text>
                    <Text style={styles.statValue}>₹{totalExpenses}</Text>
                  </td>
                  <td style={styles.statBox}>
                    <Text style={styles.statLabel}>Net</Text>
                    <Text style={styles.statValue}>₹{net}</Text>
                  </td>
                </tr>
              </table>
            </Section>

            {/* Category Breakdown */}
            {data?.stats?.byCategory && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Expenses by Category</Heading>

                <table width="100%">
                  {Object.entries(data.stats.byCategory).map(
                    ([category, amount]) => (
                      <tr key={category}>
                        <td style={styles.categoryLeft}>{category}</td>
                        <td style={styles.categoryRight}>₹{amount}</td>
                      </tr>
                    )
                  )}
                </table>
              </Section>
            )}

            {/* AI Insights */}
            {data?.insights && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Smart Insights</Heading>

                {data.insights.map((insight, index) => (
                  <Text key={index} style={styles.insight}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using Smart Finance. Keep tracking your finances for
              better financial health!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>

        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert</Heading>

            <Text style={styles.text}>Hello {userName},</Text>

            <Text style={styles.text}>
              You’ve used {percentageUsed.toFixed(1)}% of your monthly budget.
            </Text>

            <Section style={styles.statsContainer}>
              <table width="100%">
                <tr>
                  <td style={styles.statBox}>
                    <Text style={styles.statLabel}>Budget Amount</Text>
                    <Text style={styles.statValue}>₹{budgetAmount}</Text>
                  </td>

                  <td style={styles.statBox}>
                    <Text style={styles.statLabel}>Spent So Far</Text>
                    <Text style={styles.statValue}>₹{spent}</Text>
                  </td>

                  <td style={styles.statBox}>
                    <Text style={styles.statLabel}>Remaining</Text>
                    <Text style={styles.statValue}>₹{remaining}</Text>
                  </td>
                </tr>
              </table>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }

  return null;
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "-apple-system, sans-serif",
    padding: "20px",
  },

  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "8px",
    maxWidth: "600px",
    border: "1px solid #e5e7eb",
  },

  title: {
    color: "#111827",
    fontSize: "30px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "25px",
  },

  heading: {
    color: "#111827",
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "15px",
  },

  text: {
    color: "#4b5563",
    fontSize: "16px",
    marginBottom: "14px",
  },

  section: {
    marginTop: "25px",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
  },

  statsContainer: {
    margin: "25px 0",
  },

  statBox: {
    backgroundColor: "#f9fafb",
    padding: "16px",
    borderRadius: "6px",
    textAlign: "center",
    border: "1px solid #e5e7eb",
  },

  statLabel: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "4px",
  },

  statValue: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#111827",
  },

  categoryLeft: {
    padding: "10px 0",
    fontSize: "15px",
    color: "#374151",
  },

  categoryRight: {
    padding: "10px 0",
    fontSize: "15px",
    textAlign: "right",
    color: "#111827",
    fontWeight: "500",
  },

  insight: {
    fontSize: "15px",
    marginBottom: "10px",
    color: "#374151",
  },

  footer: {
    color: "#6b7280",
    fontSize: "13px",
    textAlign: "center",
    marginTop: "30px",
    paddingTop: "15px",
    borderTop: "1px solid #e5e7eb",
  },
};