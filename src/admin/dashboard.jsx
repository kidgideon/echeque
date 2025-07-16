import Navbar from "../components/navbar";
import "../styles/admin-dashboard.css";
import Analysis from "../components/analysis";
import TransactionsTable from "../components/TransTable";

const Dashboard = () => {
    return(
        <div className="admin-dashboard">
<Navbar/>
<div className="area">
<Analysis/>
<TransactionsTable status="pending"/>
</div>
        </div>
    )
}

export default Dashboard;