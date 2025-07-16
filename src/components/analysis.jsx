import "../styles/analysis.css"

const Analysis = () => {
    return(
        <div className="analysis-component">
            <div className="top-area-anal">
                <p>Work Statistics</p>
            </div>
            <div className="boxes-analysis">
<div className="box-transactions">
   <i class="fa-solid fa-money-check-dollar"></i>
   <h1>1400</h1>
     <p>cheques created</p>
</div>

<div className="box-transactions">
    <i class="fa-solid fa-wallet"></i>  
   <h1>$1400</h1>
      <p>Total amount spent</p>
</div>


<div className="box-transactions">
  <i class="fa-solid fa-sack-dollar"></i>
   <h1>4</h1>
      <p>pending transactions</p>
</div>
            </div>
        </div>

    )
}

export default Analysis;