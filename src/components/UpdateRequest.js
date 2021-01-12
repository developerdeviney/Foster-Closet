import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect, useParams } from 'react-router-dom'
import ItemsToChoose from './ItemsToChoose'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
const UpdateRequest = ({ auth }) => {
  const { id } = useParams()
  const [requestList, setRequestList] = useState([])
  const [items, setItems] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [timeNeeded, setTimeNeeded] = useState(null)

  useEffect(() => {
    axios
      .get(`https://foster-closet.herokuapp.com/api/registry/${id}`, {
        headers: { Authorization: `Token ${auth}` }
      })
      .then((response) => {
        setRequestList(response.data.items)
      })
  }, [auth, id])

  const handleSubmit = () => {
    const newItems = items.map((item) => {
      const itemObj = {
        description: item.value + ' ' + item.details + ' ' + timeNeeded
      }
      return itemObj
    })
    axios
      .put(
        `https://foster-closet.herokuapp.com/api/registry/${id}`,
        { items: newItems },
        { headers: { Authorization: `Token ${auth}` } }
      )
      .then((response) => {
        setSubmitted(true)
      })
  }

  const deleteItemsInRegistry = (itemToDelete) => {
    axios
      .delete(
        `https://foster-closet.herokuapp.com/api/item/${itemToDelete.id}`,
        {
          headers: { Authorization: `Token ${auth}` }
        }
      )
      .then((response) => {
        setRequestList(
          requestList.filter(
            (currentRegistry) => currentRegistry.id !== itemToDelete.id
          )
        )
      })
  }
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginBottom: 20
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  })

  const classes = useStyles()
  if (!auth) {
    return <Redirect to='/login' />
  }

  if (submitted) {
    return <Redirect to='/my-dashboard' />
  }

  return (
    <div>
      <div>
        <h2>Update your requested list below</h2>
        {requestList.map((item) => (
          <div key={item.id}>
            <ul>
              {item.description}
              <Button
                color='secondary'
                onClick={() => deleteItemsInRegistry(item)}
              >
                Delete
              </Button>
            </ul>
          </div>
        ))}
      </div>
      <div>
        <ItemsToChoose
          chosenItems={items}
          setChosenItems={setItems}
          setTimeNeeded={setTimeNeeded}
          timeNeeded={timeNeeded}
        />
      </div>
      <Button
        size='small'
        variant='contained'
        color='primary'
        onClick={handleSubmit}
      >
        Add item
      </Button>
      <div>
        <h2>Remove items from my list</h2>
        {requestList.map((item) => (
          <Card className={classes.root} key={item.id}>
            <CardContent>
              <Typography variant='body2' component='p'>
                <div key={item.id}>
                  <ul>
                    {item.description}
                    <Button
                      color='secondary'
                      onClick={() => deleteItemsInRegistry(item)}
                    >
                      Delete
                    </Button>
                  </ul>

                </div>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}

export default UpdateRequest
