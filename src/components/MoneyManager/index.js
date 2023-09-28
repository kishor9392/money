import {Component} from 'react'

import {v4} from 'uuid'

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
    transactionsList: [],
    titleInput: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onAmount = event => {
    this.setState({amount: event.target.value})
  }

  onType = event => {
    this.setState({optionId: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()

    const {titleInput, amount, optionId} = this.state

    const Type = transactionTypeOptions.find(each => each.optionId === optionId)

    const {displayText} = Type

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amount),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onDelete = id => {
    this.setState(prevState => ({
      transactionsList: prevState.transactionsList.filter(
        each => each.id !== id,
      ),
    }))
  }

  getIncome = () => {
    const {transactionsList} = this.state

    let incomeAmount = 0

    transactionsList.forEach(each => {
      if (each.type === 'Income') {
        incomeAmount += each.amount
      }
    })

    return incomeAmount
  }

  getExpenses = () => {
    const {transactionsList} = this.state

    let expensesAmount = 0

    transactionsList.forEach(each => {
      if (each.type === 'Expenses') {
        expensesAmount += each.amount
      }
    })

    return expensesAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    let expensesAmount = 0
    let balanceAmount = 0

    transactionsList.forEach(each => {
      if (each.type === 'Expenses') {
        expensesAmount += each.amount
      } else {
        incomeAmount += each.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    const {transactionsList, titleInput, amount, optionId} = this.state
    return (
      <div className="bg">
        <div className="bg1">
          <div className="bg2">
            <h1 className="h1">Hi, Kishore</h1>
            <p className="p">
              Welcome back to your<span className="span"> Money Manager</span>
            </p>
          </div>

          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />

          <div className="bg5">
            <form className="form" onSubmit={this.onAdd}>
              <h1 className="h2">Add Transaction</h1>

              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="input"
                onChange={this.onTitle}
                value={titleInput}
              />

              <label htmlFor="amount" className="label">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                className="input"
                onChange={this.onAmount}
                value={amount}
              />

              <label htmlFor="type" className="label">
                TYPE
              </label>

              <select
                id="type"
                className="input"
                onChange={this.onType}
                value={optionId}
              >
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>

              <button type="submit" className="btn">
                Add
              </button>
            </form>

            <div className="bg6">
              <h1 className="h2">History</h1>

              <div className="bg7">
                <ul className="bg8">
                  <li className="li">
                    <p className="p4">Title</p>
                    <p className="p4">Amount</p>
                    <p className="p4">Type</p>
                  </li>

                  <li className="li2">
                    {transactionsList.map(each => (
                      <TransactionItem
                        key={each.id}
                        transactionDetails={each}
                        onDelete={this.onDelete}
                      />
                    ))}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
