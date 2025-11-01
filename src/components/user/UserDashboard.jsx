import PlanStatus from "./PlanStatus";
import PlanFinalizado from "./PlanFinalizado";
import Withdrawals from "./Withdrawals";

export default function UserDashboard() {
  return (
    <div className="p-4">
      <PlanStatus />
      <PlanFinalizado />
      <Withdrawals />
    </div>
  );
}
