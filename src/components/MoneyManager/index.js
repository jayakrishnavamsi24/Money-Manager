import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    title: '',
    amount: '',
    option: transactionTypeOptions[0].optionId,
    income: 0,
    expense: 0,
  }

  onSubmit = event => {
    event.preventDefault()
    const {title, amount, option, income, expense} = this.state
    let optionText

    let newIncome = income
    let newExpense = expense

    if (option === transactionTypeOptions[0].optionId) {
      optionText = transactionTypeOptions[0].displayText
    } else {
      optionText = transactionTypeOptions[1].displayText
    }

    if (title === '') {
      alert('Enter Title')
      return
    }
    if (amount === '') {
      alert('Enter Amount')
      return
    }

    if (optionText === 'Expenses') {
      if (amount > income - expense) {
        alert('Insufficient Balance')
        return
      }
      newExpense = expense + parseInt(amount)
    } else {
      newIncome = income + parseInt(amount)
    }

    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      option: optionText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      title: '',
      amount: '',
      option: transactionTypeOptions[0].optionId,
      income: newIncome,
      expense: newExpense,
    }))
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onAmountChange = event => {
    this.setState({amount: event.target.value})
  }

  onOptionChange = event => {
    this.setState({option: event.target.value})
  }

  deleteClick = id => {
    const {transactionList, income, expense} = this.state

    const filteredTransactionList = transactionList.filter(
      eachTransaction => eachTransaction.id === id,
    )

    let newIncome = income
    let newExpense = expense

    if (filteredTransactionList[0].option === 'Expenses') {
      newExpense = expense - filteredTransactionList[0].amount
    } else {
      newIncome = income - filteredTransactionList[0].amount
      if (newIncome - newExpense < 0) {
        alert(
          "Can't delete this income as it makes Invaild balance if deleted.",
        )
        return
      }
    }

    const filteredListafterremoval = transactionList.filter(
      eachTransaction => eachTransaction.id !== id,
    )

    this.setState({
      transactionList: filteredListafterremoval,
      income: newIncome,
      expense: newExpense,
    })
  }

  render() {
    const {transactionList, title, amount, option, income, expense} = this.state
    const balance = income - expense

    return (
      <div className="bg-container">
        <div className="card">
          <div className="top-container">
            <h1> Hi, Richard </h1>
            <p>
              {' '}
              Welcome back to your <span>Money Manager</span>{' '}
            </p>
          </div>
          <MoneyDetails balance={balance} income={income} expense={expense} />
          <div className="bottom-section">
            <form className="bottom-left-section" onSubmit={this.onSubmit}>
              <h1 className="bottom-left-heading"> Add Transaction </h1>
              <label htmlFor="title"> TITLE </label>
              <br />
              <input
                value={title}
                onChange={this.onTitleChange}
                placeholder="TITLE"
                id="title"
                type="text"
              />
              <br />
              <label htmlFor="amount"> AMOUNT </label>
              <br />
              <input
                value={amount}
                onChange={this.onAmountChange}
                placeholder="AMOUNT"
                id="amount"
                type="number"
              />
              <br />
              <label htmlFor="type"> TYPE </label>
              <br />
              <select value={option} id="type" onChange={this.onOptionChange}>
                <option value={transactionTypeOptions[0].optionId} selected>
                  {' '}
                  {transactionTypeOptions[0].displayText}{' '}
                </option>
                <option value={transactionTypeOptions[1].optionId}>
                  {' '}
                  {transactionTypeOptions[1].displayText}{' '}
                </option>
              </select>
              <button className="add-btn" type="submit">
                {' '}
                Add{' '}
              </button>
            </form>
            <div className="bottom-right-section">
              <h1 className="bottom-left-heading"> History </h1>
              <ul className="transactions-list">
                <li className="table-header">
                  <p className="table-title"> Title </p>
                  <p className="table-amount"> Amount </p>
                  <p className="table-type"> Type </p>
                </li>
                {transactionList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                    deleteClick={this.deleteClick}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
