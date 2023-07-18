import React, {useState, useCallback, useRef} from 'react'
import {Button, List, Popover, Radio, RadioChangeEvent, Spin} from 'antd'
import {MoreOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import Loader from '../Loader/Loader'
import {useOnMountv2} from '../../../hooks'
interface InfiniteScrollProps {
  height: number
  languages: any[]
  _getLanguage: (option: string, language: string) => void
  onChangeLanguage: (language: string) => void
  closePopover: boolean
}
const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  height,
  languages,
  _getLanguage,
  onChangeLanguage,
  closePopover,
}) => {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMoreData, setHasMoreData] = useState<boolean>(true)
  const [page, setPage] = useState(1)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [value, setValue] = useState<string>('')
  const [isPopover, setIsPopover] = useState<boolean[]>([])
  useOnMountv2(() => {
    let isPopover: boolean[] = []
    languages.slice(0, page * 13).map((_) => {
      isPopover.push(false)
    })
    setIsPopover(isPopover)
    setData(languages.slice(0, page * 13))
  }, [languages, page])
  useOnMountv2(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        let isPopover: boolean[] = []
        languages.slice(0, page * 13).map((_) => {
          isPopover.push(false)
        })
        setIsPopover(isPopover)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  const loadMoreData = useCallback(() => {
    if (!hasMoreData || isLoading) return
    setIsLoading(!isLoading)
    setTimeout(() => {
      const newData = [...data, ...languages.slice(page * 13, (page + 1) * 13)]
      setData(newData)
      setIsLoading(false)
      setHasMoreData(newData.length < languages.length)
      setPage((prevPage) => prevPage + 1)
    }, 1500)
  }, [data, languages, hasMoreData, isLoading, page])
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    const {scrollTop, clientHeight, scrollHeight} = containerRef.current
    if (scrollHeight - scrollTop === clientHeight) {
      loadMoreData()
    }
  }, [loadMoreData])
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
    onChangeLanguage(e.target.value)
  }
  const text = <span>Options</span>
  const content = (_id: string, i: number) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        icon={<EditOutlined />}
        style={{marginRight: 5}}
        type="primary"
        onClick={() => {
          let isPopoverData = [...isPopover]
          isPopoverData[i] = false
          setIsPopover(isPopoverData)
          _getLanguage('edit', _id)
        }}
      />
      <Button
        icon={<DeleteOutlined />}
        type="primary"
        danger
        onClick={() => {
          let isPopoverData = [...isPopover]
          isPopoverData[i] = false
          setIsPopover(isPopoverData)
          _getLanguage('delete', _id)
        }}
      />
    </div>
  )
  return (
    <div
      id="scrollContainer"
      ref={containerRef}
      style={{
        height: height - 206,
        overflowY: 'scroll',
      }}
      onScroll={handleScroll}
    >
      {isLoading && <Loader />}
      <List
        dataSource={data}
        renderItem={(item, index) => (
          <>
            <List.Item key={item.language}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <div>
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={item.language} />
                  </Radio.Group>
                  {item.language}
                </div>
                <Popover
                  open={isPopover[index]}
                  placement="left"
                  title={text}
                  content={() => content(item._id, index)}
                  trigger="click"
                  overlayStyle={{
                    width: 93,
                  }}
                >
                  <Button
                    icon={<MoreOutlined />}
                    onClick={() => {
                      const updatedIsPopover = isPopover.map((_, i) => (i === index ? true : false))
                      setIsPopover(updatedIsPopover)
                    }}
                  />
                </Popover>
              </div>
            </List.Item>
          </>
        )}
      />
    </div>
  )
}
export default InfiniteScroll
// import React, {useState, useEffect} from 'react'
// const InfiniteScroll: React.FC = (getLanguages: any) => {
//   const [data, setData] = useState<any>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [a, setA] = useState<number>(5)
//   useEffect(() => {
//     setData(getLanguages.getLanguages.slice(0, 5))
//   }, [])
//   const loadMoreData = () => {
//     if (a <= getLanguages.getLanguages.length) {
//       setIsLoading(true)
//       setTimeout(() => {
//         const newData = [...data, ...getLanguages.getLanguages.slice(a, a + 5)]
//         setData(newData)
//         setA(a + 5)
//         setIsLoading(false)
//       }, 1500)
//     } else setIsLoading(false)
//   }
//   const handleScroll = () => {
//     const container = document.getElementById('scroll-container')
//     if (container) {
//       const {scrollTop, clientHeight, scrollHeight} = container
//       if (scrollHeight - scrollTop === clientHeight) {
//         loadMoreData()
//       }
//     }
//   }
//   return (
//     <div
//       id="scroll-container"
//       style={{
//         height: '50px',
//         overflowY: 'scroll',
//       }}
//       onScroll={handleScroll}
//     >
//       <ul>
//         {data.map((item, index) => (
//           <li key={index} style={{color: '#000'}}>
//             {item.language}
//           </li>
//         ))}
//         {isLoading && <li style={{color: '#000'}}>Loading...</li>}
//       </ul>
//     </div>
//   )
// }

// export default InfiniteScroll
