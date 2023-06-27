import './index.css'

const MoneyDetails = props => {
  const {balance, income, expense} = props

  return (
    <div className="summary-section">
      <div className="summary-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div className="summary-card-txt-cont">
          <p className="your-bal"> Your Balance </p>
          <p className="amount"> Rs {balance}</p>
        </div>
      </div>
      <div className="second-sum-card summary-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div className="summary-card-txt-cont">
          <p className="your-bal"> Your Income </p>
          <p className="amount"> Rs {income}</p>
        </div>
      </div>
      <div className="third-sum-card summary-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div className="summary-card-txt-cont">
          <p className="your-bal"> Your Expenses </p>
          <p className="amount"> Rs {expense}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
