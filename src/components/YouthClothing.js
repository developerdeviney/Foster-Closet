import React, { useState } from 'react'

const YouthClothingDropdown = ({ multiSelect = false }) => {
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState([])
  const toggle = () => setOpen(!open)

  const items = [
    {
      id: 1,
      value: 'Extra Small Shirts'
    },
    {
      id: 4,
      value: 'Extra Small Pants'
    },
    {
      id: 5,
      value: 'Small Shirts'
    },
    {
      id: 8,
      value: 'Small Pants'
    },
    {
      id: 10,
      value: 'Medium Shirts'
    },
    {
      id: 13,
      value: 'Medium Pants'
    },
    {
      id: 14,
      value: 'Large Shirts'
    },
    {
      id: 17,
      value: 'Large Pants'
    },
    {
      id: 18,
      value: 'Extra Large Shirts'
    },
    {
      id: 21,
      value: 'Extra Large Pants'
    }
  ]

  const handleOnClick = (item) => {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item])
      } else if (multiSelect) {
        setSelection([...selection, item])
      }
    } else {
      let selectionAfterRemoval = selection
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.id !== item.id
      )
      setSelection([...selectionAfterRemoval])
    }
  }

  const isItemInSelection = (item) => {
    if (selection.some((current) => current.id === item.id)) {
      return true
    }
    return false
  }

  return (
    <div className='dd-wrapper'>
      <div
        tabIndex={0}
        className='dd-header'
        role='button'
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className='dd-header-title'>
          <p>Youth Clothing (6-12 Years Old)</p>
        </div>
        <div className='dd-header-action'>
          <p>{open ? 'Close' : 'Open'}</p>
        </div>
      </div>
      {open && (
        <ul className='dd-list'>
          {items.map((item) => (
            <li className='dd-list-item' key={item.id}>
              <button onClick={() => handleOnClick(item)}>
                <span>{item.value}</span>{' '}
                <span>{isItemInSelection(item) && 'Selected'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default YouthClothingDropdown
