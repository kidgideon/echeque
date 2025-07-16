import Navbar from "../components/navbar"
import TransactionsTable from "../components/TransTable"

const Transactions = () => {

    return(<div className="admin-dashboard">
        <Navbar/>
        <div className="area">
    <TransactionsTable status="all" />
        </div>

    </div>)
}

export default Transactions;

