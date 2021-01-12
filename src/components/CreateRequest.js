import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import ItemsToChoose from './ItemsToChoose'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const CreateRequest = ({ auth, chosenItems }) => {
  const [submitted, setSubmitted] = useState(false)
  const [items, setItems] = useState([])
  const [timeNeeded, setTimeNeeded] = useState('')

  const handleSubmit = () => {
    const newItems = items.map((item) => {
      const itemObj = {
        description: item.value + ' ' + item.details + ' ' + timeNeeded
      }
      return itemObj
    })

    axios
      .post(
        'https://foster-closet.herokuapp.com/api/registry/',
        { items: newItems },
        { headers: { Authorization: `Token ${auth}` } }
      )
      .then((response) => {
        setSubmitted(true)
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
  if (submitted) {
    return <Redirect to='/my-dashboard' />
  }

  return (
    <div className='CreateRequest pa6'>
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant='body2' component='p'>
              <ItemsToChoose
                chosenItems={items}
                setChosenItems={setItems}
                setTimeNeeded={setTimeNeeded}
                timeNeeded={timeNeeded}
              />
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Button
        size='small'
        variant='contained'
        color='primary'
        onClick={handleSubmit}
      >
        Submit Request
      </Button>
    </div>
  )
}

export default CreateRequest
