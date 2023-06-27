import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteClick} = props
  const {id, title, amount, option} = transactionDetails

  const onDeleteClick = () => {
    deleteClick(id)
  }

  return (
    <li className="add-table-header">
      <hr />
      <div className="internal-cont">
        <p className="li-table-title"> {title} </p>
        <p className="li-table-amount"> {`Rs ${amount}`} </p>
        <div className="li-table-type">
          <p className="li-option"> {option} </p>
          <button
            className="li-delete-btn"
            type="button"
            onClick={onDeleteClick}
          >
            <img
              className="li-delete-icon"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TransactionItem
