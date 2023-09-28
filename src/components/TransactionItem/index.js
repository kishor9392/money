import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDelete} = props
  const {id, title, amount, type} = transactionDetails

  const onTap = () => {
    onDelete(id)
  }

  return (
    <li className="bg9">
      <p className="p5">{title}</p>
      <p className="p5">Rs {amount}</p>
      <p className="p5">{type}</p>
      <div className="bg10">
        <button
          type="button"
          className="btn3"
          onClick={onTap}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt=" delete"
            className="img5"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
