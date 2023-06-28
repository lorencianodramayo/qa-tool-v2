import React, {useState, useEffect, useRef} from 'react'
import {Col, Row} from 'antd'
interface RowProps {
  items: any
  containerWidth: number
}
const RowComponent: React.FC<RowProps> = ({items, containerWidth}) => {
  const [visibleItems, setVisibleItems] = useState(10)
  const rowRef = useRef(null)
  useEffect(() => {
    const handleResize = () => {
      const container = rowRef.current
      const containerWidth = container.offsetWidth
      const maxVisibleItems = Math.floor(containerWidth / items.size.split('x')[0])
      setVisibleItems(maxVisibleItems)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [items.size.split('x')[0]])
  const renderedItems = items.variants.slice(0, visibleItems)
  console.log('asdf', visibleItems)
  //   useEffect(() => {
  //     const container = rowRef.current
  //     const containerWidth = container.offsetWidth
  //     const maxVisibleItems = Math.floor(containerWidth / items.size.split('x')[0])
  //     while (visibleItems > maxVisibleItems) {
  //       setVisibleItems((prevVisibleItems) => prevVisibleItems - 1)
  //     }
  //   }, [])
  //   console.log('asdf', visibleItems)
  //   const renderedItems = items.variants.slice(0, visibleItems)
  return (
    <Row ref={rowRef} style={{width: containerWidth}}>
      {/* {renderedItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))} */}
    </Row>
  )
}

export default RowComponent
