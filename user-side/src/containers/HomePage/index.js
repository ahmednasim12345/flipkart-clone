import React from 'react'
import Layout from '../../components/Layout';
import { makeStyles } from '@material-ui/core/styles';

/**
* @author
* @function HomePage
**/
const useStyles = makeStyles({
  bgImage: {
    backgroundImage: `url(Image/pic1.jpg)`,
    backgroundRepeat: 'no-repeat',
    width: '100%', 
    height: '150vh',
    objectFit:'center',
    objectPosition:'50% 50%',
    

  }
})
const HomePage = (props) => {
  const classes = useStyles()
  return (
    <Layout>
      <div className={classes.bgImage}>
        Welcome To Our New Flipkart clone online Shopping
      </div>
    </Layout>
  )

}
export default HomePage;